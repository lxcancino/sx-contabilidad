import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { EjercicioMes } from '../../../models/ejercicio-mes';

@Component({
  selector: 'sx-saldos-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './saldos-page.component.html',
  styles: [
    `
      .document {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class SaldosPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'mayor',
      title: 'Mayor',
      description: 'Saldos y/o Balanza de mayor',
      icon: 'filter_1'
    },
    {
      route: 'segundo',
      title: '2do Nivel',
      description: 'Saldos / Balanza a 2o nivel',
      icon: 'filter_2'
    }
  ];

  loading$: Observable<boolean>;
  periodo$: Observable<EjercicioMes>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getSaldosLoading));
    this.periodo$ = this.store.pipe(select(fromStore.getSaldosPeriodo));
  }

  onCambiarPeriodo(event: EjercicioMes) {
    this.store.dispatch(new fromStore.SetSaldosPeriodo({ periodo: event }));
  }
}