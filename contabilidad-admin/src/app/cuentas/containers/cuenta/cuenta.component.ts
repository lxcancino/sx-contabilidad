import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { CuentaContable } from '../../models';

import { TdDialogService } from '@covalent/core';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'sx-cuenta-contable',
  template: `
  <div *ngIf="cuenta$ | async as cuenta">
    <sx-cuenta-form [cuenta]="cuenta" (cancel)="onCancel(cuenta)" (save)="onSave($event)"
      (update)="onUpdate($event)"
      (delete)="onDelete($event)">
    </sx-cuenta-form>
  </div>

  `
})
export class CuentaComponent implements OnInit, OnDestroy {
  cuenta$: Observable<CuentaContable>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.cuenta$ = this.store.pipe(select(fromStore.getSelectedCuenta));
    this.loading$ = this.store.select(fromStore.getCuentasLoading);
  }

  ngOnDestroy() {}

  onCancel(event) {
    this.store.dispatch(new fromRoot.Go({ path: ['cuentas'] }));
  }
  onSave(event: CuentaContable) {
    this.store.dispatch(new fromStore.CreateCuenta({ cuenta: event }));
  }
  onUpdate(cuenta: Update<CuentaContable>) {
    this.store.dispatch(new fromStore.UpdateCuenta({ cuenta }));
  }

  onDelete(cuenta: CuentaContable) {
    this.dialogService
      .openConfirm({
        message: `Clave ${cuenta.clave}`,
        title: 'Eliminar cuenta contable',
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.DeleteCuenta({ cuenta }));
        }
      });
  }
}
