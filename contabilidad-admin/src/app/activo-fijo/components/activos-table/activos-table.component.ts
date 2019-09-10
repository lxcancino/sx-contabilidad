import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import * as _ from 'lodash';

import {
  RowSelectedEvent,
  ModelUpdatedEvent,
  ColDef,
  CellDoubleClickedEvent,
  GridOptions,
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';

import { SxTableService } from 'app/_shared/components/lx-table/sx-table.service';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { spAgGridText } from 'app/_shared/components/lx-table/table-support';

@Component({
  selector: 'sx-activos-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height: 100%">
      <ag-grid-angular
        #agGrid
        class="ag-theme-balham"
        style="width: 100%; height: 100%;"
        [rowData]="activos"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [floatingFilter]="true"
        [localeText]="localeText"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)"
        (gridReady)="actualizarTotales()"
      >
      </ag-grid-angular>
    </div>
  `,
  styles: [``]
})
export class ActivosTableComponent implements OnInit, OnChanges {
  @Input()
  activos: ActivoFijo[] = [];

  @Output()
  selectionChange = new EventEmitter<any[]>();

  @Output()
  select = new EventEmitter<any[]>();

  gridOptions: GridOptions;

  gridApi: GridApi;

  localeText: any;

  defaultColDef: ColDef;

  constructor(public tableService: SxTableService) {
    this.buildGridOptions();
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {}

  buildGridOptions() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.rowMultiSelectWithClick = true;
    this.gridOptions.onRowSelected = (event: RowSelectedEvent) => {
      this.selectionChange.emit(this.gridApi.getSelectedRows());
    };
    this.gridOptions.onRowDoubleClicked = params => {
      this.select.emit(params.data);
    };
    this.defaultColDef = {
      editable: false,
      filter: 'agTextColumnFilter',
      width: 150,
      sort: 'true'
    };
    this.localeText = spAgGridText;
    this.gridOptions.getRowStyle = params => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
      return {};
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  exportData() {
    const params = {
      fileName: `AF_${new Date().getTime()}.csv`
    };
    this.gridApi.exportDataAsCsv(params);
  }

  buildRowStyle(params: any) {
    if (params.node.rowPinned) {
      return { 'font-weight': 'bold' };
    }
    return {};
  }

  onModelUpdate(event: ModelUpdatedEvent) {
    if (this.gridApi) {
      this.actualizarTotales();
      // this.gridApi.sizeColumnsToFit();
    }
  }

  getAllRows() {
    const data = [];
    if (this.gridApi) {
      this.gridApi.forEachNode((rowNode, index) => {
        const det = rowNode.data;
        data.push(det);
      });
    }
    return data;
  }

  actualizarTotales() {
    let registros = 0;
    let montoOriginal = 0;
    let depreciacionAcumulada = 0;
    let remanente = 0;
    this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
      const row: ActivoFijo = rowNode.data;
      montoOriginal += row.montoOriginal;
      depreciacionAcumulada += row.depreciacionAcumulada;
      remanente += row.remanente;
      registros++;
    });
    const res = [
      {
        descripcion: `Registros: ${registros}`,
        montoOriginal,
        depreciacionAcumulada,
        remanente
      }
    ];
    this.gridApi.setPinnedBottomRowData(res);
  }

  clearSelection() {
    this.gridApi.deselectAll();
  }

  buildColsDef(): ColDef[] {
    return [
      {
        headerName: 'Id',
        field: 'id',
        pinned: 'left'
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        pinned: 'left',
        width: 250,
        pinnedRowCellRenderer: r => r.value
      },
      {
        headerName: 'Cuenta contable',
        field: 'cuentaContable',
        pinned: 'left',
        width: 200,
        valueFormatter: params => (params.value ? params.value.descripcion : '')
      },
      {
        headerName: 'Monto Orig',
        field: 'montoOriginal',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Depreciado',
        field: 'depreciacionAcumulada',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Remanente',
        field: 'remanente',
        valueFormatter: params => this.tableService.formatCurrency(params.value)
      },
      {
        headerName: 'Estado',
        field: 'estado'
      },
      {
        headerName: 'Fac Ser',
        field: 'facturaSerie'
      },
      {
        headerName: 'Fac Folio',
        field: 'facturaFolio'
      },
      {
        headerName: 'Modelo',
        field: 'modelo'
      },
      {
        headerName: 'Serie',
        field: 'serie'
      }
    ];
  }
}
