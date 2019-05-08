import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/movimiento.actions';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Periodo } from 'app/_core/models/periodo';
import { SaldoPorCuentaContable } from 'app/saldos/models';

@Component({
  selector: 'sx-movimientos-por-cuenta',
  template: `
    <mat-card>
      <!--
      <div layout layout-align="start center"  class="pad-left-sm pad-right-sm">
        <span>Detalles de cuenta</span>
      </div>
      -->
      <mat-toolbar color="accent">
        <span>Detalle de cuenta:</span>
      </mat-toolbar>
      <mat-card-content>
        {{saldo$ | async | json}}
      </mat-card-content>
    </mat-card>
  `
})
export class MovimientosPorCuentaComponent implements OnInit, OnDestroy {
  saldo$: Observable<SaldoPorCuentaContable>;
  destroy$ = new Subject();

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.saldo$ = this.store.pipe(select(fromStore.getSelectedSaldo));
    this.saldo$
      .pipe(
        takeUntil(this.destroy$),
        map(saldo => {
          const periodo = Periodo.toPeriodo(saldo.ejercicio, saldo.mes);
          return { periodo, cuenta: saldo.cuenta };
        })
      )
      .subscribe(action =>
        this.store.dispatch(new fromActions.LoadMovimientosPorCuenta(action))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
