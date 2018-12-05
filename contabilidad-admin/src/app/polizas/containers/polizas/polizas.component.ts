import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions';

import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { Poliza, PolizasFilter } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PolizaCreateComponent } from 'app/polizas/components';
import { EjercicioMes } from '../../../models/ejercicio-mes';

@Component({
  selector: 'sx-polizas',
  template: `
    <mat-card *ngIf="config$ | async as config">
      <sx-search-title title="Pólizas de {{config?.tipo?.toLowerCase()}} ({{config?.subtipo}})" (search)="search = $event">
        <button mat-menu-item class="actions" (click)="reload(config)"><mat-icon>refresh</mat-icon> Recargar</button>
        <a mat-menu-item  color="accent" class="actions" (click)="onCreate(config) ">
          <mat-icon>add</mat-icon> Nueva póliza
        </a>
      </sx-search-title>
      <mat-divider></mat-divider>
        <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)"  tdLoadingStrategy="overlay" >
          <sx-polizas-table [polizas]="polizas$ | async" (select)="onSelect($event)"></sx-polizas-table>
        </ng-template>
      <mat-card-footer>

      </mat-card-footer>
      <a mat-fab matTooltip="Alta de póliza" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
      (click)="onCreate(config) ">
    <mat-icon>add</mat-icon>
    </a>
    </mat-card>

  `,
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 10px);
      }
    `
  ]
})
export class PolizasComponent implements OnInit {
  search = '';

  polizas$: Observable<Poliza[]>;
  config$: Observable<PolizasFilter>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getPolizasLoading));
    this.polizas$ = this.store.pipe(select(fromStore.getPolizas));
    this.config$ = this.store.pipe(select(fromStore.getCurrentPeriodoGrupo));
  }

  onSelect(event: Poliza) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`polizas/${event.tipo.toLowerCase()}`, event.id]
      })
    );
  }

  onFilterChange(filter: PolizasFilter) {
    this.store.dispatch(new fromStore.SetPolizasFilter({ filter }));
  }

  reload(event: PolizasFilter) {
    this.store.dispatch(new fromStore.LoadPolizas({ filter: event }));
  }

  onCreate(event: PolizasFilter) {
    this.dialog
      .open(PolizaCreateComponent, {
        data: { config: event }
      })
      .afterClosed()
      .subscribe(command => {
        if (command) {
          this.store.dispatch(
            new fromActions.CreatePoliza({ poliza: command })
          );
        }
      });
  }

  onEdit(event: Poliza) {}

  onDelete(event: Poliza) {
    this.dialogService
      .openConfirm({
        message: `Cobro ${event.folio} por ${event.concepto}`,
        title: 'Eliminar poliza',
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromActions.DeletePoliza({ poliza: event }));
        }
      });
  }
}
