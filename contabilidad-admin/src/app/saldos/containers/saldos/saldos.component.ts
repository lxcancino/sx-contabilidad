import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SaldoPorCuentaContable } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { AuxiliarContableDialogComponent } from 'app/saldos/components';

@Component({
  selector: 'sx-saldos',
  template: `
    <mat-card >
      <div layout layout-align="start center"  class="pad">
        <span class="push-left-sm">
          <span class="mat-title">BALANZA DE COMPROBACION</span>
        </span>
        <span flex></span>
        <span class="info" *ngIf="totales">
          <span>Inicial: {{totales.saldoInicial | currency}}</span>
          <span class="pad-left">Debe: {{totales.debe | currency}}</span>
          <span class="pad-left">Haber: {{totales.haber | currency}}</span>
          <span class="pad-left">Final: {{totales.saldoFinal | currency}}</span>
        </span>
        <span flex></span>
        <button mat-button mat-icon-button (click)="grid.exportData()" matTooltip="Exportar a CSV">
          <mat-icon color="primary">file_download</mat-icon>
        </button>

        <span>
          <button mat-icon-button [matMenuTriggerFor]="toolbarMenu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #toolbarMenu="matMenu">
            <button mat-menu-item class="actions" (click)="reload()"><mat-icon>refresh</mat-icon> Recargar</button>
            <button mat-menu-item class="actuibs" (click)="printAuxiliar()">
             <mat-icon>print</mat-icon> Auxiliar contables
            </button>
            <a mat-menu-item  color="accent" class="actions" (click)="onActualizar()">
              <mat-icon>add</mat-icon> Actualizar saldos
            </a>
            <a mat-menu-item  color="accent" class="actions" (click)="onCierre()">
              <mat-icon>fast_forward</mat-icon> Cierre mensual
            </a>
            <a mat-menu-item  color="accent" class="actions" (click)="onPolizaDeCierre()" *ngIf="filter.mes === 13">
              <mat-icon>leak_remove</mat-icon> Poliza CIERRE ANUAL
            </a>
          </mat-menu>
        </span>
      </div>
      <mat-divider></mat-divider>
      <ng-template
    tdLoading
    [tdLoadingUntil]="!(loading$ | async)"
    tdLoadingStrategy="overlay"
    >
    </ng-template>
    <sx-saldos-table [saldos]="saldos$ | async" #grid
      (select)="onSelect($event)"
      (totalesChanged)="onFilter($event)"
      (drillData)="onDrill($event)">
    </sx-saldos-table>
      <mat-card-footer>

      </mat-card-footer>
    </mat-card>

  `,
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 75px);
      }
    `
  ]
})
export class SaldosComponent implements OnInit, OnDestroy {
  search = '';

  saldos$: Observable<SaldoPorCuentaContable[]>;
  config$: Observable<EjercicioMes>;
  filter: EjercicioMes;
  destroy$ = new Subject<boolean>();
  loading$: Observable<boolean>;
  totales: any;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getSaldosLoading));
    this.saldos$ = this.store.pipe(select(fromStore.getSaldos));
    this.config$ = this.store.pipe(select(fromStore.getSaldosPeriodo));

    this.config$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => (this.filter = filter));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  onSelect(event: SaldoPorCuentaContable) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`saldos`, event.id]
      })
    );
  }

  reload() {
    this.store.dispatch(new fromStore.LoadSaldos());
  }

  onFilter(event) {
    this.totales = event;
  }

  onActualizar() {
    this.dialogService
      .openConfirm({
        title: `Actualizar saldos de cuentas`,
        message: `Actualiza y corre saldos para todas las cuentas contables`,
        acceptButton: 'Actualizar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.ActualizarSaldos());
        }
      });
  }

  onCierre() {
    this.dialogService
      .openConfirm({
        title: `Cierre mensual`,
        message: `Traslada los saldos al mes siguiente`,
        acceptButton: 'Cerrar mes',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.CierreMensual());
        }
      });
  }
  onPolizaDeCierre() {
    this.dialogService
      .openConfirm({
        title: `CIERRE ANUAL`,
        message: `Generar poliza de cierre anual`,
        acceptButton: 'ACEPTAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.CierreAnual());
        }
      });
  }

  printAuxiliar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: {
          periodo: this.filter
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            `contabilidad/saldos/printAuxiliar`,
            res
          );
        }
      });
  }

  onDrill(saldo: SaldoPorCuentaContable) {
    console.log('Drill down: ', saldo);
    this.store.dispatch(new fromRoot.Go({ path: ['saldos/mayor', saldo.id] }));
  }
}
