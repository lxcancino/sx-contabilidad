import { Component, OnInit } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import {
  CalculoPorProductoDialogComponent,
  InventarioCosteadoDialogComponent
} from '../../components';
import { ReportService } from '../../../reportes/services/report.service';

@Component({
  selector: 'sx-costos-page',
  templateUrl: './costos-page.component.html',
  styles: [
    `
      .document-panel {
        min-height: 400px;
      }
    `
  ]
})
export class CostosPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'promedios',
      title: 'Costos promedio',
      description: 'Resumen de costos promedio',
      icon: 'account_balance_wallet'
    },
    {
      route: 'inventario',
      title: 'Inventario ',
      description: 'Inventario costeado',
      icon: 'rate_review'
    }
  ];

  loading$: Observable<boolean>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCostosLoading));
  }

  comsSinAnalizar() {
    /*
    this.dialog
      .open(ReportComsSinAnalizarComponent, {
        data: {},
        width: '500px'
      })
      .afterClosed()
      .subscribe(params => {
        if (params) {
          this.reportService.runReport(
            'analisisDeFactura/comsSinAnalizar',
            params
          );
        }
      });
      */
  }

  calculoDeCostoPromedio() {
    this.dialog
      .open(CalculoPorProductoDialogComponent, {
        data: { title: 'Cálculo de costo promedio' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`costos/calculoDeCostoPromedio`, res);
        }
      });
  }

  inventarioCosteado() {
    this.dialog
      .open(InventarioCosteadoDialogComponent, {
        data: { title: 'Inventarios costeados' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`costos/inventarioCosteado`, res);
        }
      });
  }

  movimientosCosteados() {
    this.dialog
      .open(CalculoPorProductoDialogComponent, {
        data: { title: 'Movimientos costeados', productoRequerido: false }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`costos/movimientosCosteados`, res);
        }
      });
  }
}
