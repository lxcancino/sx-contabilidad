import { Injectable } from '@angular/core';

import * as fromRoot from 'app/store';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/polizas-periodo.actions';
import { PolizasPeriodoActionTypes } from '../actions/polizas-periodo.actions';

import * as fromServices from '../../services';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class PolizasPeriodoEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.PolizasPeriodoService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(PolizasPeriodoActionTypes.LoadPolizasPeriodo),
    switchMap(() =>
      this.service.list().pipe(
        map(
          polizasPeriodo =>
            new fromActions.LoadPolizasPeriodoSuccess({ polizasPeriodo })
        ),
        catchError(error =>
          of(new fromActions.LoadPolizasPeriodoFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarPolizasPeriodo>(
      PolizasPeriodoActionTypes.GenerarPolizasPeriodo
    ),
    map(action => action.payload),
    switchMap(periodo =>
      this.service.generar(periodo.ejercicio, periodo.mes).pipe(
        map(
          polizasPeriodo =>
            new fromActions.GenerarPolizasPeriodoSuccess({ polizasPeriodo })
        ),
        catchError(response =>
          of(new fromActions.GenerarPolizasPeriodoFail({ response }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  mostrarXml$ = this.actions$.pipe(
    ofType<fromActions.MostrarPolizasPeriodoXml>(
      PolizasPeriodoActionTypes.MostrarPolizasPeriodoXml
    ),
    map(action => action.payload.polizasPeriodo),
    tap(polizasPeriodo => this.service.mostrarXml(polizasPeriodo))
  );

  @Effect({ dispatch: false })
  descargarXml$ = this.actions$.pipe(
    ofType<fromActions.DescargarPolizasPeriodoXml>(
      PolizasPeriodoActionTypes.DescargarPolizasPeriodoXml
    ),
    map(action => action.payload.polizasPeriodo),
    tap(polizasPeriodo => this.service.descargarXml(polizasPeriodo))
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      fromActions.LoadPolizasPeriodoFail | fromActions.GenerarPolizasPeriodoFail
    >(
      PolizasPeriodoActionTypes.LoadPolizasPeriodoFail,
      PolizasPeriodoActionTypes.GenerarPolizasPeriodoFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
