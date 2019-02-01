import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { Balanza } from '../../models';
import { MatDialog } from '@angular/material';
import { EjercicioMesDialogComponent } from 'app/_shared/components';
import { buildCurrentPeriodo, EjercicioMes } from 'app/models/ejercicio-mes';

@Component({
  selector: 'sx-balanzas',
  template: `
    <mat-card >
      <sx-search-title title="Balanzas de comprobación SAT"></sx-search-title>
      <mat-divider></mat-divider>
      <ng-template
        tdLoading
        [tdLoadingUntil]="!(loading$ | async)"
        tdLoadingStrategy="overlay"
      >
        <sx-balanzas-table [balanzas]="balanzas$ | async"
          (select)="onSelect($event)"
          (download)="onDownload($event)"></sx-balanzas-table>
      </ng-template>
      <a mat-fab matTooltip="Nueva balanza" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
          (click)="onCreate()">
        <mat-icon>add</mat-icon>
      </a>
      <mat-card-footer>

      </mat-card-footer>
    </mat-card>

  `,
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 15px);
      }
    `
  ]
})
export class BalanzasComponent implements OnInit {
  search = '';
  balanzas$: Observable<Balanza[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getBalanzasLoading));
    this.balanzas$ = this.store.pipe(select(fromStore.getBalanzas));
  }

  onSelect(event: Balanza) {
    this.store.dispatch(new fromStore.MostrarBalanzaXml({ balanza: event }));
  }

  onDownload(event: Balanza) {
    this.store.dispatch(new fromStore.DescargarBalanzaXml({ balanza: event }));
  }

  onCreate() {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: {
          title: 'Periodo para la balanza',
          periodo: buildCurrentPeriodo()
        }
      })
      .afterClosed()
      .subscribe((res: EjercicioMes) => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarBalanza({
              ejercicio: res.ejercicio,
              mes: res.mes
            })
          );
        }
      });
  }
}
