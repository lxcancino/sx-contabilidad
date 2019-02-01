import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { PolizasPeriodo } from '../../models';
import { MatDialog } from '@angular/material';
import { EjercicioMesDialogComponent } from 'app/_shared/components';
import { buildCurrentPeriodo, EjercicioMes } from 'app/models/ejercicio-mes';

@Component({
  selector: 'sx-polizas-periodo',
  template: `
    <mat-card >
      <sx-search-title title="Polizas por periodo (SAT)"></sx-search-title>
      <mat-divider></mat-divider>
      <ng-template
        tdLoading
        [tdLoadingUntil]="!(loading$ | async)"
        tdLoadingStrategy="overlay"
      >
        <sx-polizas-periodo-table [polizasPeriodo]="polizasPeriodo$ | async"
          (select)="onSelect($event)"
          (download)="onDownload($event)">
        </sx-polizas-periodo-table>
      </ng-template>
      <a mat-fab matTooltip="Nuevo" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
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
export class PolizasPeriodoComponent implements OnInit {
  search = '';
  polizasPeriodo$: Observable<PolizasPeriodo[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getPolizasPeriodoLoading));
    this.polizasPeriodo$ = this.store.pipe(select(fromStore.getPolizasPeriodo));
  }

  onSelect(event: PolizasPeriodo) {
    this.store.dispatch(
      new fromStore.MostrarPolizasPeriodoXml({ polizasPeriodo: event })
    );
  }

  onDownload(event: PolizasPeriodo) {
    this.store.dispatch(
      new fromStore.DescargarPolizasPeriodoXml({ polizasPeriodo: event })
    );
  }

  onCreate() {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: {
          title: 'Periodo para la polizas',
          periodo: buildCurrentPeriodo()
        }
      })
      .afterClosed()
      .subscribe((res: EjercicioMes) => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarPolizasPeriodo({
              ejercicio: res.ejercicio,
              mes: res.mes
            })
          );
        }
      });
  }
}
