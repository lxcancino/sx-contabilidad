import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/cuentas.actions';
import { CuentaContable } from '../../models';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';

import { ReportService } from 'app/reportes/services/report.service';

@Component({
  selector: 'sx-cuentas',
  template: `
    <mat-card>
      <sx-search-title
        title="Catálogo de cuentas contables"
        (search)="search = $event"
      >
        <button mat-menu-item class="actions" (click)="reload()">
          <mat-icon>refresh</mat-icon> Recargar
        </button>
      </sx-search-title>
      <mat-divider></mat-divider>
      <!--
        <sx-cheques-table [cheques]="cobradores$ | async" [filter]="search"
          (liberar)="onLiberar($event)" (entregar)="onEntregar($event)" (cobrado)="onCobro($event)">
        </sx-cheques-table>
      -->
    </mat-card>
  `
})
export class CuentasComponent implements OnInit {
  cobradores$: Observable<CuentaContable[]>;
  loading$: Observable<boolean>;
  search = '';

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCuentasLoading));
    this.cobradores$ = this.store.pipe(select(fromStore.getCuentas));
  }

  onSelect() {}

  reload() {
    this.store.dispatch(new fromStore.LoadCuentas());
  }
}
