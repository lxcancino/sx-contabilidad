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

import { SaldoPorCuentaContable } from '../../models';
import {
  GridOptions,
  FilterChangedEvent,
  GridReadyEvent,
  GridApi
} from 'ag-grid-community';

@Component({
  selector: 'sx-saldos-table',
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
        [localeText]="localeText"
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
    `
  ]
})
export class SaldosTableComponent implements OnInit, OnChanges {
  @Input()
  saldos: SaldoPorCuentaContable[] = [];

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
  totalesChanged = new EventEmitter<{
    saldoInicial: number;
    debe: number;
    haber: number;
    saldoFinal: number;
  }>();

  printFriendly = false;

  localeText;

  constructor(private cd: ChangeDetectorRef) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.buildColsDef();
    this.defaultColDef = {
      // width: 100,
      editable: false,
      filter: 'agTextColumnFilter'
    };

    this.gridOptions.onFilterChanged = this.onFilter;
    this.buildLocalText();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.saldos && changes.saldos.currentValue) {
      // this.gridOptions.rowData = changes.saldos.currentValue;
      if (this.gridApi) {
        this.gridApi.setRowData(changes.saldos.currentValue);
      }
    }
  }

  onModelUpdate(event) {
    this.actualizarTotales();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.saldos);
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onFilter(event: FilterChangedEvent) {}

  actualizarTotales() {
    if (this.gridApi) {
      let saldoInicial = 0.0;
      let debe = 0.0;
      let haber = 0.0;
      let saldoFinal = 0.0;
      this.gridApi.forEachNodeAfterFilterAndSort((rowNode, index) => {
        saldoInicial += rowNode.data.saldoInicial;
        debe += rowNode.data.debe;
        haber += rowNode.data.haber;
        saldoFinal += rowNode.data.saldoFinal;
      });
      const totales = { saldoInicial, debe, haber, saldoFinal };
      this.totalesChanged.emit(totales);
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

  exportData() {
    const params = {
      // skipHeader: getBooleanValue("#skipHeader"),
      // columnGroups: getBooleanValue("#columnGroups"),
      // skipFooters: getBooleanValue("#skipFooters"),
      // skipGroups: getBooleanValue("#skipGroups"),
      // skipPinnedTop: getBooleanValue("#skipPinnedTop"),
      // skipPinnedBottom: getBooleanValue("#skipPinnedBottom"),
      // allColumns: getBooleanValue("#allColumns"),
      // onlySelected: getBooleanValue("#onlySelected"),
      // suppressQuotes: getBooleanValue("#suppressQuotes"),
      fileName: 'saldos.csv'
      // columnSeparator: document.querySelector("#columnSeparator").value
    };
    this.gridApi.exportDataAsCsv(params);
  }

  private buildColsDef() {
    return [
      {
        headerName: 'Clave',
        field: 'clave',
        width: 170
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        width: 400
      },
      {
        headerName: 'Nivel',
        field: 'nivel',
        width: 90
      },
      {
        headerName: 'Saldo Inicial',
        field: 'saldoInicial',
        filter: 'agNumberColumnFilter',
        width: 150
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
        headerName: 'Saldo final',
        field: 'saldoFinal',
        filter: 'agNumberColumnFilter',
        width: 150
      }
    ];
  }
  buildLocalText() {
    this.localeText = {
      page: 'página',
      more: 'mas',
      to: 'a',
      of: 'de',
      next: 'siguiente',
      last: 'ultimo',
      first: 'primero',
      previous: 'anterior',
      loadingOoo: 'cargando...',
      applyFilter: 'Aplicar...',
      equals: 'igual',
      notEqual: 'diferente a',
      lessThan: 'menor que',
      greaterThan: 'mayor que',
      lessThanOrEqual: 'menor o igual',
      greaterThanOrEqual: 'mayor o igual',
      inRange: 'rango',
      contains: 'contiene',
      notContains: 'no contiene',
      startsWith: 'inicia con',
      endsWith: 'termina con',
      filters: 'filtros'
    };
  }
}
