import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import { PolizaDet } from '../../models';
import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi
} from 'ag-grid-community';

@Component({
  selector: 'sx-poliza-partidas-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style='height: 100%'>
      <ag-grid-angular #agGrid
        class="ag-theme-balham"
        [ngClass]="{myGrid: !printFriendly, print: printFriendly}"
        [gridOptions]="gridOptions"
        [defaultColDef]="defaultColDef"
        [enableFilter]="true"
        [enableSorting]="true"
        [floatingFilter]="true"
        [enableColResize]="true"
        [animateRows]="true"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
        (modelUpdated)="onModelUpdate($event)">
      </ag-grid-angular>
    </div>
  `,
  styles: [
    `
      .myGrid {
        width: 100%;
        height: 100%;
      }
      .print {
        width: '';
        height: '';
      }
    `
  ]
})
export class PolizaPartidasTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: PolizaDet[] = [];

  @Input()
  filter: string;

  @Input()
  selected: number;

  gridOptions: GridOptions;
  gridApi: GridApi;
  defaultColDef;

  @Output()
  select = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  @Output()
  totalesChanged = new EventEmitter<{ debe: number; haber: number }>();

  printFriendly = false;

  constructor(private cd: ChangeDetectorRef) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.defaultColDef = {
      width: 100,
      editable: false,
      filter: 'agTextColumnFilter'
    };

    this.gridOptions.onFilterChanged = this.onFilter;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.partidas && changes.partidas.currentValue) {
      // this.gridOptions.rowData = changes.partidas.currentValue;
      if (this.gridApi) {
        this.gridApi.setRowData(changes.partidas.currentValue);
      }
    }
  }

  onModelUpdate(event) {
    this.actualizarTotales();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.partidas);
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onFilter(event: FilterChangedEvent) {}

  actualizarTotales() {
    if (this.gridApi) {
      let debe = 0.0;
      let haber = 0.0;
      this.gridApi.forEachNodeAfterFilter((rowNode, index) => {
        debe += rowNode.data.debe;
        haber += rowNode.data.haber;
      });
      this.totalesChanged.emit({ debe, haber });
    }
  }

  printGrid() {
    this.gridApi.setDomLayout('print');
    this.printFriendly = true;
    this.cd.detectChanges();
    setTimeout(() => {
      print();
      this.gridApi.setDomLayout(null);
      this.printFriendly = false;
      this.cd.detectChanges();
    }, 8000);
  }

  private buildColsDef() {
    return [
      {
        headerName: 'Clave',
        field: 'clave',
        width: 170
      },
      {
        headerName: 'Concepto',
        field: 'concepto',
        width: 200
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        width: 250
      },
      {
        headerName: 'Debe',
        field: 'debe',
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'Haber',
        field: 'haber',
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'Asiento',
        field: 'asiento'
      },
      {
        headerName: 'Referencias',
        marryChildren: true,
        openByDefault: 'false',
        children: [
          {
            headerName: 'Sucursal',
            field: 'sucursal',
            columnGroupShow: 'open'
          },
          { headerName: 'Ref', field: 'referencia', columnGroupShow: 'closed' },
          {
            headerName: 'Ref2',
            field: 'referencia2'
          },
          { headerName: 'Origen', field: 'origen', columnGroupShow: 'closed' },
          { headerName: 'Entidad', field: 'entidad', columnGroupShow: 'closed' }
        ]
      },
      {
        headerName: 'Documento',
        openByDefault: 'false',
        children: [
          { headerName: 'Docto', field: 'documento', columnGroupShow: 'open' },
          {
            headerName: 'Docto T',
            field: 'documentoTipo',
            columnGroupShow: 'closed'
          },
          {
            headerName: 'Docto F',
            field: 'documentoFecha',
            filter: 'agDateColumnFilter',
            columnGroupShow: 'closed'
          }
        ]
      }
    ];
  }
}
