import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions';

import { Observable } from 'rxjs';

import { Poliza, PolizasFilter } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PolizaCreateComponent } from 'app/polizas/components';

@Component({
  selector: 'sx-polizas-ingreso',
  template: `
    <mat-card *ngIf="subtipo$ | async as subtipo">
      <sx-search-title title="Pólizas de ingreso ({{subtipo}})" (search)="search = $event">
        <button mat-menu-item class="actions" (click)="reload(subtipo)"><mat-icon>refresh</mat-icon> Recargar</button>
        <a mat-menu-item  color="accent"[routerLink]="['create']" class="actions">
          <mat-icon>add</mat-icon> Nueva póliza
        </a>
      </sx-search-title>
      <mat-divider></mat-divider>
      <sx-polizas-table></sx-polizas-table>
      <mat-card-footer>

      </mat-card-footer>
      <a mat-fab matTooltip="Alta de póliza" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
      (click)="onCreate(subtipo)">
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
export class PolizasDeIngresoComponent implements OnInit {
  polizas$: Observable<Poliza[]>;
  search = '';

  tipo$: Observable<string>;
  tipo: string;
  subtipo$: Observable<string>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.polizas$ = this.store.pipe(select(fromStore.getAllCobros));
    // this.filter$ = this.store.pipe(select(fromStore.getCobrosFilter));
    this.route.queryParamMap.pipe(map(params => params.get('tipo')));
    this.subtipo$ = this.route.queryParamMap.pipe(
      map(params => params.get('subtipo'))
    );
  }

  onSelect() {}

  onFilterChange(filter: PolizasFilter) {
    this.store.dispatch(new fromStore.SetPolizasFilter({ filter }));
  }

  reload(filter: PolizasFilter) {
    this.store.dispatch(new fromStore.LoadPolizas({ filter }));
  }

  onCreate(subtipo: string) {
    this.dialog
      .open(PolizaCreateComponent, {
        data: { config: { tipo: 'INGRESO', subtipo, ejercicio: 2018, mes: 1 } }
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
