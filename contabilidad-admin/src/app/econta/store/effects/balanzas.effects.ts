import { Injectable } from '@angular/core';

import * as fromRoot from 'app/store';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/balanzas.actions';
import { BalanzasActionTypes } from '../actions/balanzas.actions';

import * as fromServices from '../../services';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class BalanzasEffects {
  constructor(
    private actions$: Actions,
    // private service: fromServices.BalanzaService,
    public snackBar: MatSnackBar
  ) {}
  /*
  @Effect()
  load$ = this.actions$.pipe(
    ofType(BalanzasActionTypes.LoadBalanzas),
    switchMap(filter =>
      this.service.list().pipe(
        map(balanzas => new fromActions.LoadBalanzasSuccess({ balanzas })),
        catchError(error =>
          of(new fromActions.LoadBalanzasFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarBalanza>(BalanzasActionTypes.GenerarBalanza),
    map(action => action.payload),
    switchMap(periodo =>
      this.service.generar(periodo.ejercicio, periodo.mes).pipe(
        map(balanza => new fromActions.GenerarBalanzaSuccess({ balanza })),
        catchError(response =>
          of(new fromActions.GenerarBalanzaFail({ response }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  mostrarXml$ = this.actions$.pipe(
    ofType<fromActions.MostrarBalanzaXml>(
      BalanzasActionTypes.MostrarBalanzaXml
    ),
    map(action => action.payload.balanza),
    tap(balanza => this.service.mostrarXml(balanza))
  );

  @Effect({ dispatch: false })
  descargarXml$ = this.actions$.pipe(
    ofType<fromActions.DescargarBalanzaXml>(
      BalanzasActionTypes.DescargarBalanzaXml
    ),
    map(action => action.payload.balanza),
    tap(balanza => this.service.descargarXml(balanza))
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadBalanzasFail | fromActions.GenerarBalanzaFail>(
      BalanzasActionTypes.LoadBalanzasFail,
      BalanzasActionTypes.GenerarBalanzaFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
   */
}
