import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Poliza } from '../../models';

import { TdDialogService } from '@covalent/core';
import * as moment from 'moment';
import { ReportService } from 'app/reportes/services/report.service';

@Component({
  selector: 'sx-poliza',
  template: `
  <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)"  tdLoadingStrategy="overlay" >
    <div *ngIf="poliza$ | async as poliza">
      <sx-poliza-form
        [poliza]="poliza"
        (cancel)="onCancel(poliza)"
        (update)="onUpdate($event)"
        (recalcular)="onRecalcular($event)"
        (delete)="onDelete($event)"
        (cerrar)="onCerrar($event)"
        (print)="onPrint($event)">
      </sx-poliza-form>
    </div>
  </ng-template>
  `
})
export class PolizaComponent implements OnInit {
  poliza$: Observable<Poliza>;
  facturasPendientes$: Observable<Poliza[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialogService: TdDialogService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.poliza$ = this.store.pipe(select(fromStore.getSelectedPoliza));
    this.loading$ = this.store.select(fromStore.getPolizasLoading);
  }

  onCancel(poliza: Poliza) {
    this.store.dispatch(
      new fromRoot.Go({
        path: [`polizas/${poliza.tipo.toLowerCase()}`],
        query: { tipo: poliza.tipo, subtipo: poliza.subtipo }
      })
    );
  }

  onRecalcular(event: Poliza) {
    this.store.dispatch(new fromStore.RecalcularPoliza({ polizaId: event.id }));
  }

  onUpdate(event: { id: number; changes: Partial<Poliza> }) {
    this.store.dispatch(new fromStore.UpdatePoliza({ poliza: event }));
  }

  onDelete(event: Poliza) {
    this.dialogService
      .openConfirm({
        title: `Eliminar poliza ${event.tipo}`,
        message: `${event.subtipo} Folio: ${event.folio} Fecha: ${moment(
          event.fecha
        ).format('DD/MM/YYYY')}`,
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.DeletePoliza({ poliza: event }));
        }
      });
  }

  onPrint(event: Poliza) {
    this.reportService.runReport(`contabilidad/polizas/print/${event.id}`, {});
  }

  onCerrar(event: Poliza) {
    if (!event.cierre) {
      this.dialogService
        .openConfirm({
          title: `Cerrar Poliza ${event.folio}`,
          message: `ADVERTENCIA: Ya no sera posible revertir el cambio!`,
          acceptButton: 'Cerrar',
          cancelButton: 'Cancelar'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            const update = {
              id: event.id,
              changes: { cierre: new Date().toISOString() }
            };
            this.store.dispatch(new fromStore.UpdatePoliza({ poliza: update }));
          }
        });
    }
  }
}
