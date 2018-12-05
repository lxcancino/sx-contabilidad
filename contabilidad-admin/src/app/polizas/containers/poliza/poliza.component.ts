import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Poliza } from '../../models';

import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'sx-poliza',
  template: `
  <ng-template tdLoading [tdLoadingUntil]="!(loading$ | async)"  tdLoadingStrategy="overlay" >
    <div *ngIf="poliza$ | async as poliza">
      <sx-poliza-form
        [poliza]="poliza"
        (cancel)="onCancel(poliza)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
        (cerrar)="onCerrar($event)">
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
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.poliza$ = this.store.pipe(select(fromStore.getSelectedPoliza));
    this.loading$ = this.store.select(fromStore.getPolizasLoading);
  }

  onCancel(event: Poliza) {
    this.store.dispatch(
      new fromRoot.Go({ path: [`polizas/${event.tipo.toLowerCase()}`] })
    );
  }

  onUpdate(event: { id: number; changes: Partial<Poliza> }) {
    this.store.dispatch(new fromStore.UpdatePoliza({ poliza: event }));
  }

  onDelete(event: Poliza) {
    this.dialogService
      .openConfirm({
        title: 'Eliminar poliza',
        message: `Folio: ${event.folio}`,
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
