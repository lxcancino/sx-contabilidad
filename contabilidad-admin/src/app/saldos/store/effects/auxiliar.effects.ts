import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromActions from '../actions/auxiliar.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuxiliaresService } from 'app/saldos/services';

@Injectable()
export class AuxiliarEffects {
  constructor(private actions$: Actions, private service: AuxiliaresService) {}

  @Effect()
  loadAuxiliarBancos$ = this.actions$.pipe(
    ofType<fromActions.LoadAuxiliarDeBancos>(
      fromActions.AuxiliarActionTypes.LoadAuxiliarDeBancos
    ),
    map(action => action.payload),
    switchMap(command =>
      this.service.bancos(command.cuentaId, command.periodo).pipe(
        map(
          rows =>
            new fromActions.LoadAuxiliarDeBancosSuccess({
              movimientos: rows
            })
        ),
        catchError(response =>
          of(new fromActions.LoadAuxiliarDeBancosFail({ response }))
        )
      )
    )
  );
}
