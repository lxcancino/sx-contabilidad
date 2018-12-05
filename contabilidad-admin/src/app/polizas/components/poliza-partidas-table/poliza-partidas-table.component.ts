import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { PolizaDet } from '../../models';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sx-poliza-partidas-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ag-grid-angular #agGrid
      style="width: 100%; height: 300px;"
      class="ag-theme-balham"
      [gridOptions]="gridOptions"
      [defaultColDef]="defaultColDef"
      [enableFilter]="true"
      [floatingFilter]="true"
      [enableColResize]="true"
      (gridReady)="onGridReady($event)">
    </ag-grid-angular>
  `,
  styles: [
    `
      table {
        width: 100%;
        max-height: 500px;
        overflow: auto;
      }
      .mat-cell {
        font-size: 11px;
      }
      .mat-row {
        height: 30px;
      }
      .mat-column-descripcion {
        max-width: 200px;
      }
      .mat-column-nivel {
        max-width: 90px;
      }
      .mat-column-tipo {
        max-width: 90px;
      }
    `
  ]
})
export class PolizaPartidasTableComponent implements OnInit, OnChanges {
  @Input()
  partidas: PolizaDet[] = [];
  @Input()
  filter: string;
  dataSource = new MatTableDataSource<PolizaDet>([]);

  @Input()
  selected: number;

  private gridOptions: GridOptions;
  private defaultColDef;

  @Input()
  displayColumns = [
    'cuenta',
    'concepto',
    'descripcion',
    'debe',
    'haber',
    'referencia',
    'referencia2',
    'asiento',
    // 'origen',
    // 'entidad',
    // 'documento',
    'documentoFecha'
    // 'sucursal'
  ];

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  select = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
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
        children: [
          {
            headerName: 'Sucursal',
            field: 'sucursal',
            columnGroupShow: 'open'
          },
          { headerName: 'Ref', field: 'referencia', columnGroupShow: 'closed' },
          {
            headerName: 'Ref2',
            field: 'referencia2',
            columnGroupShow: 'closed'
          },
          { headerName: 'Origen', field: 'origen', columnGroupShow: 'closed' },
          { headerName: 'Entidad', field: 'entidad', columnGroupShow: 'closed' }
        ]
      },
      {
        headerName: 'Documento',
        children: [
          { headerName: 'Docto', field: 'documento', columnGroupShow: 'open' },
          {
            headerName: 'Docto T',
            field: 'documentoTipo'
          },
          {
            headerName: 'Docto F',
            field: 'documentoFecha',
            filter: 'agDateColumnFilter'
          }
        ]
      }
    ];
    this.defaultColDef = {
      width: 150,
      editable: false,
      filter: 'agTextColumnFilter'
    };
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.partidas && changes.partidas.currentValue) {
      this.dataSource.data = changes.partidas.currentValue;
      this.gridOptions.rowData = changes.partidas.currentValue;
    }
    if (changes.filter) {
      const s = changes.filter.currentValue || '';
      this.dataSource.filter = s.toLowerCase();
    }
  }

  onGridReady(params) {
    console.log('Grid params: ', params);
    /*
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
      .subscribe(data => {
        this.rowData = data;
      });
      */
  }
}
