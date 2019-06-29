import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions/movimiento.actions';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Periodo } from 'app/_core/models/periodo';
import { SaldoPorCuentaContable } from 'app/saldos/models';

import { PolizaDet } from 'app/polizas/models';

@Component({
  selector: 'sx-saldo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  saldo$: Observable<SaldoPorCuentaContable>;
  children$: Observable<SaldoPorCuentaContable[]>;
  search$ = new BehaviorSubject<string>('');

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.saldo$ = this.store.pipe(select(fromStore.getSelectedSaldo));
    this.children$ = this.saldo$.pipe(map(saldo => saldo.children));
  }

  reload(saldo: SaldoPorCuentaContable) {
    const periodo = Periodo.toPeriodo(saldo.ejercicio, saldo.mes);
    this.store.dispatch(
      new fromActions.LoadMovimientosPorCuenta({
        cuenta: saldo.cuenta,
        periodo: periodo
      })
    );
  }

  getTitle(saldo: SaldoPorCuentaContable): string {
    return `Cunta: ${saldo.descripcion} (${saldo.clave})`;
  }

  onDrill(saldo: SaldoPorCuentaContable) {
    console.log('Drill down: ', saldo);
    this.store.dispatch(new fromRoot.Go({ path: ['saldos/mayor', saldo.id] }));
  }
}
