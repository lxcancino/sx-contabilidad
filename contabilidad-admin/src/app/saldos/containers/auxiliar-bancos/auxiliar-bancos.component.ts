import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/auxiliar.actions';

import { Observable } from 'rxjs';

import { ReportService } from 'app/reportes/services/report.service';

import { MatDialog } from '@angular/material';

import { AuxiliarContableDialogComponent } from 'app/saldos/components';
import { Auxiliar } from 'app/saldos/models/auxiliar';
import { Periodo } from 'app/_core/models/periodo';

@Component({
  selector: 'sx-auxiliar-bancos',
  templateUrl: './auxiliar-bancos.component.html',
  styleUrls: ['./auxiliar-bancos.component.scss']
})
export class AuxiliarBancosComponent implements OnInit {
  search = '';

  movimientos$: Observable<Auxiliar[]>;
  periodo: Periodo;

  loading$: Observable<boolean>;
  totales: any;

  private storageKey = 'sx.contabilidad.auxiliar-bancos.periodo';

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getAuxiliarLoading));
    this.movimientos$ = this.store.pipe(select(fromStore.getAllAuxiliar));
    this.periodo = Periodo.fromStorage(this.storageKey, Periodo.fromNow(45));
  }

  reload() {}

  generar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: { periodo: this.periodo },
        width: '750px'
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const periodo: Periodo = res.periodo;
          Periodo.saveOnStorage(this.storageKey, periodo);
          this.store.dispatch(
            new fromStore.LoadAuxiliarDeBancos({
              cuentaId: res.cuentaInicial,
              periodo
            })
          );
        }
      });
  }

  onFilter(event) {
    this.totales = event;
  }

  printAuxiliar() {
    this.dialog
      .open(AuxiliarContableDialogComponent, {
        data: {
          periodo: this.periodo
        },
        width: '750px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.reportService.runReport(
            `contabilidad/saldos/printAuxiliarBancos`,
            res
          );
        }
      });
  }
}
