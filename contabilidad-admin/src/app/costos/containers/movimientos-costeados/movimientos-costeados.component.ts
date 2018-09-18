import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/movimientos-costo.actions';

import { Observable, Subject } from 'rxjs';
import { Inventario } from 'app/models/inventario';
import { MatDialog } from '@angular/material';
import { PeriodoCostosDialogComponent } from '../../components';

@Component({
  selector: 'sx-movimientos-costeados',
  template: `
  <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)" tdLoadingStrategy="overlay">
    <mat-card *ngIf="periodo$ | async as periodo">
      <sx-search-title title="Análisis de costos " (search)="onSearch($event)">
      <div  class="info">
        <button mat-button (click)="cambiarPeriodo(periodo)">
          Ejercicio: {{periodo.mes}} - {{periodo.ejercicio}}
        </button>
      </div>
      </sx-search-title>
      <mat-divider></mat-divider>
      <mat-tab-group *ngIf="costos$ | async as costos">
        <mat-tab label="Análisis">
          <sx-costo-producto-table [movimientos]="costos"  [selectedId]="(selected$ | async)?.clave"
          (select)="onSelect($event, periodo)" [filter]="search$ | async"></sx-costo-producto-table>
        </mat-tab>
        <mat-tab label="Movimientos">
          <sx-costo-producto-movs-table [movimientos]="costos"  [selectedId]="(selected$ | async)?.clave"
          (select)="onSelect($event)" [filter]="search$ | async"></sx-costo-producto-movs-table>
        </mat-tab>
      </mat-tab-group>
    </mat-card>
  </ng-template>
    <div *ngIf="selected$ | async as selected">
      <sx-movs-por-producto [producto]="selected" (close)="closeDetailPanel()" [movimientos]="movimientos$ | async"></sx-movs-por-producto>
    </div>

  `
})
export class MovimientosCosteadosComponent implements OnInit {
  costos$: Observable<any[]>;
  selected$: Observable<any>;
  periodo$: Observable<{ ejercicio: number; mes: number }>;
  search$ = new Subject<string>();
  movimientos$: Observable<Inventario[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.periodo$ = this.store.pipe(
      select(fromStore.getMovimientosCostoPeriodo)
    );
    this.costos$ = this.store.pipe(select(fromStore.getAllMovimientosCosto));
    this.selected$ = this.store.pipe(select(fromStore.getSelectedProducto));
    this.movimientos$ = this.store.pipe(select(fromStore.getAllMovimientos));
    this.loading$ = this.store.pipe(
      select(fromStore.getMovimientosCostoLoading)
    );
  }

  onSelect(event: any, periodo: { ejercicio: number; mes: number }) {
    this.store.dispatch(
      new fromActions.SelectCurrentProducto({ selected: event.clave })
    );
  }

  onSearch(event: string) {
    this.search$.next(event);
  }

  cambiarPeriodo(event: { ejercicio: number; mes: number }) {
    this.dialog
      .open(PeriodoCostosDialogComponent, { data: { periodo: event } })
      .afterClosed()
      .subscribe(periodo => {
        if (periodo) {
          this.store.dispatch(
            new fromActions.SetPeriodoDeMovmientosCosto({ periodo })
          );
        }
      });
  }

  closeDetailPanel() {
    this.store.dispatch(
      new fromActions.SelectCurrentProducto({ selected: null })
    );
  }
}
