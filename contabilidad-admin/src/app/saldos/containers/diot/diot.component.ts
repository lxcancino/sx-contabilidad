import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Diot } from '../../models';
import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import { EjercicioMes } from '../../../models/ejercicio-mes';
import { AuxiliarContableDialogComponent } from 'app/saldos/components';

@Component({
  selector: 'sx-diot',
  templateUrl: './diot.component.html',
  styleUrls: ['./diot.component.scss']
})
export class DiotComponent implements OnInit, OnDestroy {
  search = '';
  diot$: Observable<Diot[]>;
  ejercicio$: Observable<EjercicioMes>;
  filter: EjercicioMes;

  destroy$ = new Subject<boolean>();
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getSaldosLoading));
    this.diot$ = this.store.pipe(select(fromStore.getAllDiot));
    this.ejercicio$ = this.store.pipe(select(fromStore.getSaldosPeriodo));

    this.ejercicio$.subscribe(periodo => console.log('Per: ', periodo));

    this.ejercicio$
      .pipe(takeUntil(this.destroy$))
      .subscribe(periodo => (this.filter = periodo));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  onSelect(event: Diot) {}

  reload() {
    this.store.dispatch(new fromStore.LoadSaldos());
  }

  onFilter(event) {}

  onGenerar(periodo: EjercicioMes) {
    this.dialogService
      .openConfirm({
        title: `Generar DIOT`,
        message: `Periodo ${periodo.ejercicio} / ${periodo.mes}`,
        acceptButton: 'GENERAR',
        cancelButton: 'CANCELAR'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store.dispatch(new fromStore.ActualizarSaldos());
        }
      });
  }

  printReport() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: {
          periodo: this.filter
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(`contabilidad/diot/print`, res);
        }
      });
  }
}
