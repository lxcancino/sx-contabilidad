import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { AjusteAnual } from '../../model';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function toAnalisis(rows: AjusteAnual[]) {
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];
  const res = {};
  _.forEach(meses, item => {
    res[item] = _.sumBy(rows, data => {
      if (data.concepto.concepto === 'SUMA') {
        return data[item];
      }
    });
  });
  return res;
}

@Component({
  selector: 'sx-analisis-page',
  templateUrl: './analisis-page.component.html',
  styleUrls: ['./analisis-page.component.scss']
})
export class AnalisisPageComponent implements OnInit {
  activos$: Observable<AjusteAnual[]>;
  pasivos$: Observable<AjusteAnual[]>;

  activosList$: Observable<any>;
  pasivosList$: Observable<any>;

  meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.activos$ = this.store.pipe(select(fromStore.selectActivos));
    this.pasivos$ = this.store.pipe(select(fromStore.selectPasivos));

    this.activosList$ = this.activos$.pipe(map(toAnalisis));
    this.pasivosList$ = this.pasivos$.pipe(map(toAnalisis));

    // this.activosList$.subscribe(data => console.log('Activos: ', data));
  }
}
