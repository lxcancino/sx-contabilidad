import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Poliza, PolizasFilter } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { PolizaCreateComponent } from 'app/polizas/components';

@Component({
  selector: 'sx-polizas',
  template: `
    <mat-card *ngIf="config$ | async as config">
      <sx-search-title title="Pólizas de {{config?.tipo?.toLowerCase()}} ({{config?.subtipo}})"
        [inputValue]="searchTerm$ | async"
        [visible]="(searchTerm$ | async).length > 0"
        (search)="onFilter($event)">
        <button mat-menu-item class="actions" (click)="reload(config)"><mat-icon>refresh</mat-icon> Recargar</button>
        <a mat-menu-item  color="accent" class="actions" (click)="onCreate(config) ">
          <mat-icon>add</mat-icon> Nueva póliza
        </a>
        <button class="actions" mat-menu-item (click)="regenerarFolios(config)">
          <mat-icon>format_list_numbered</mat-icon> Regenerar folios
        </button>
      </sx-search-title>
      <mat-divider></mat-divider>
        <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)"  tdLoadingStrategy="overlay" >
          <sx-polizas-table [polizas]="polizas$ | async" (select)="onSelect($event)" [filter]="searchTerm$ | async"></sx-polizas-table>
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
export class PolizasComponent implements OnInit, OnDestroy {
  search = '';

  polizas$: Observable<Poliza[]>;
  config$: Observable<PolizasFilter>;
  filter: PolizasFilter;
  loading$: Observable<boolean>;
  destroy$ = new Subject<boolean>();
  searchTerm$: Observable<string>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getPolizasLoading));
    this.polizas$ = this.store.pipe(select(fromStore.getPolizas));
    this.config$ = this.store.pipe(select(fromStore.getCurrentPeriodoGrupo));
    this.searchTerm$ = this.store.pipe(select(fromStore.getPolizasSearchTerm));
    this.registerListeners();
    // this.reload()
  }

  registerListeners() {
    // Listen to CurrentPeriodoGroup changes to reload the container
    this.config$.pipe(takeUntil(this.destroy$)).subscribe(filter => {
      this.filter = filter;
      if (filter.subtipo) {
        this.reload(filter);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  onSelect(event: Poliza) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`polizas/${event.tipo.toLowerCase()}`, event.id]
      })
    );
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
        switch (command.subtipo) {
          case 'EGRESO': {
            this.store.dispatch(
              new fromActions.CreatePolizasEgreso({ filter: command })
            );
            break;
          }
          // case 'NOTAS_DE_CREDITO_DEV':
          // case 'NOTAS_DE_CREDITO_BON':
          case 'COBRANZA_CON':
          case 'COBRANZA_COD':
          case 'COBRANZA_CRE':
          case 'VENTAS_CON':
          case 'VENTAS_COD':
          case 'VENTAS_CRE': {
            this.store.dispatch(
              new fromActions.GenerarPolizas({ filter: command })
            );
            break;
          }
          default: {
            this.store.dispatch(
              new fromActions.CreatePoliza({ poliza: command })
            );
          }
        }
      });
  }

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

  onFilter(event: string) {
    this.store.dispatch(new fromActions.SetPolizasSearchTerm({ term: event }));
  }

  regenerarFolios(event: PolizasFilter) {
    this.dialogService
      .openConfirm({
        title: 'Regenera folios',
        message: `${event.subtipo} (${event.ejercicio} - ${event.mes})`,
        acceptButton: 'ACEPTAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.GenerarFolios({ filter: event }));
        }
      });
  }
}
