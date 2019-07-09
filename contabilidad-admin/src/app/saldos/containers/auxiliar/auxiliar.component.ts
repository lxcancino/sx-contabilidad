import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, Subscription } from 'rxjs';

import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';

import { AuxiliarContableDialogComponent } from 'app/saldos/components';
import { Auxiliar } from 'app/saldos/models/auxiliar';
import { Periodo } from 'app/_core/models/periodo';
import { CuentaContable } from 'app/cuentas/models';

@Component({
  selector: 'sx-auxiliar',
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.scss']
})
export class AuxiliarComponent implements OnInit, OnDestroy {
  search = '';

  movimientos$: Observable<Auxiliar[]>;
  periodo: Periodo;

  loading$: Observable<boolean>;
  totales: any;

  cuentaRange$: Observable<{
    cuentaInicial: CuentaContable;
    cuentaFinal: CuentaContable;
  }>;

  rango: { cuentaInicial: CuentaContable; cuentaFinal: CuentaContable } = null;

  subscription: Subscription;

  private storageKey = 'sx.contabilidad.auxiliar.periodo';

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getAuxiliarLoading));
    this.movimientos$ = this.store.pipe(select(fromStore.getAllAuxiliar));
    this.periodo = Periodo.fromStorage(this.storageKey, Periodo.fromNow(45));
    this.subscription = this.store
      .pipe(select(fromStore.getCuentasRange))
      .subscribe(r => (this.rango = r));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store.dispatch(new fromStore.CleanAuxiliar());
  }

  reload() {}

  generar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: { periodo: this.periodo, rango: this.rango },
        width: '750px'
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const periodo: Periodo = res.periodo;
          Periodo.saveOnStorage(this.storageKey, periodo);
          this.store.dispatch(
            new fromStore.LoadAuxiliar({
              cuentaInicial: res.cuentaInicial,
              cuentaFinal: res.cuentaFinal || res.cuentaInicial,
              periodo
            })
          );
        }
      });
  }

  onFilter(event) {
    this.totales = event;
  }

  printAuxiliar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: {
          periodo: this.periodo
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            `contabilidad/auxiliar/printAuxiliar`,
            res
          );
        }
      });
  }
}
