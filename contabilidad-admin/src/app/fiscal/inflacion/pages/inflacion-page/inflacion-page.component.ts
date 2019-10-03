import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { AjusteAnual } from '../../model';

@Component({
  selector: 'sx-inflacion-page',
  templateUrl: './inflacion-page.component.html',
  styleUrls: ['./inflacion-page.component.scss']
})
export class InflacionPageComponent implements OnInit {
  ejercicio: number;
  loading$: Observable<boolean>;
  ajustes$: Observable<AjusteAnual[]>;
  activos$: Observable<AjusteAnual[]>;
  pasivos$: Observable<AjusteAnual[]>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.loadEjercicio();
    this.loading$ = this.store.pipe(select(fromStore.selectAjustesLoading));
    this.ajustes$ = this.store.pipe(select(fromStore.selectAjustes));
    this.activos$ = this.store.pipe(select(fromStore.selectActivos));
    this.pasivos$ = this.store.pipe(select(fromStore.selectPasivos));
    this.load();
  }

  load() {
    this.store.dispatch(
      new fromStore.LoadAjustes({ ejercicio: this.ejercicio })
    );
  }

  private loadEjercicio() {
    const found =
      localStorage.getItem('sx.ajuste-anual-inflacion.ejercicio') || '2018';
    this.ejercicio = parseFloat(found);
  }
}
