import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map, withLatestFrom } from 'rxjs/operators';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { AuxiliaresService } from 'app/saldos/services';
import { CuentaContable } from 'app/cuentas/models';
import { ITdDataTableColumn } from '@covalent/core';
import { SaldoPorCuentaContable } from 'app/saldos/models';

@Component({
  selector: 'sx-auxiliar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.scss']
})
export class AuxiliarComponent implements OnInit, OnDestroy {
  periodo$: Observable<EjercicioMes>;
  control = new FormControl();
  saldo: SaldoPorCuentaContable;
  data: any[] = [];
  selected = null;
  selectedRows = [];

  destroy$ = new Subject<boolean>();

  displayColumns: ITdDataTableColumn[] = [
    { name: 'fecha', label: 'Fecha', width: { min: 200, max: 250 } },
    { name: 'debe', label: 'Debe' },
    {
      name: 'haber',
      label: 'Haber'
    }
  ];

  detailColumns: ITdDataTableColumn[] = [
    { name: 'fecha', label: 'Fecha', width: { min: 100, max: 110 } },
    { name: 'tipo', label: 'Tipo' },
    { name: 'subtipo', label: 'Subtipo' },
    { name: 'debe', label: 'Debe' },
    { name: 'haber', label: 'Haber' }
  ];

  constructor(
    private store: Store<fromStore.State>,
    private service: AuxiliaresService,
    private cdr: ChangeDetectorRef
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
    this.service.drillPeriodo(event.cuenta.id, event.periodo).subscribe(
      res => {
        this.data = res.data;
        this.saldo = res.saldo;
        this.cdr.detectChanges();
      },
      err => console.log('Error:', err)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  drillDown(event) {
    this.selected = event.row;
  }

  onDetailSelected(event) {
    console.log('Selected: ', event);
  }
  onAllDetailSelected(event) {
    console.log('Selected all', event);
  }

  loadDetalle() {
    console.log('Cargando detalles', this.selectedRows);
  }
}
