import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map, withLatestFrom } from 'rxjs/operators';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { AuxiliaresService } from 'app/saldos/services';
import { CuentaContable } from 'app/cuentas/models';

@Component({
  selector: 'sx-auxiliar',
  template: `
    <div layout>
      <mat-card flex="50">
        <div layout layout-align="start center"  class="pad">
          <sx-cuenta-contable-field [formControl]="control"
            [required]="false" flex>
          </sx-cuenta-contable-field>
        </div>
        <mat-divider></mat-divider>
      </mat-card>
    </div>
  `
})
export class AuxiliarComponent implements OnInit, OnDestroy {
  periodo$: Observable<EjercicioMes>;
  control = new FormControl();

  destroy$ = new Subject<boolean>();

  constructor(
    private store: Store<fromStore.State>,
    private service: AuxiliaresService
  ) {}

  ngOnInit() {
    this.periodo$ = this.store.pipe(select(fromStore.getSaldosPeriodo));
    const a$ = combineLatest(this.periodo$, this.control.valueChanges);
    a$.pipe(
      map(results => {
        return { periodo: results[0], cuenta: results[1] };
      }),
      takeUntil(this.destroy$)
    ).subscribe((event: { periodo: EjercicioMes; cuenta: CuentaContable }) =>
      this.load(event)
    );
  }

  load(event: { periodo: EjercicioMes; cuenta: CuentaContable }) {
    console.log('Event: ', event);
    this.service
      .drillPeriodo(event.cuenta.id, event.periodo)
      .subscribe(
        res => console.log('Res: ', res),
        err => console.log('Error:', err)
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
