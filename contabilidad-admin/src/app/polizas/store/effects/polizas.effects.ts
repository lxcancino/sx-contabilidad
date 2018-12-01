import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/poliza.actions';
import { PolizaActionTypes } from '../actions/poliza.actions';

import * as fromServices from '../../services';
import * as fromRoot from 'app/store';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class PolizasEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.PolizaService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadPolizas>(PolizaActionTypes.LoadPolizas),
    switchMap(action => {
      return this.service.list(action.payload.filter).pipe(
        map(polizas => new fromActions.LoadPolizasSuccess({ polizas })),
        catchError(response =>
          of(new fromActions.LoadPolizasFail({ response }))
        )
      );
    })
  );

  @Effect()
  save$ = this.actions$.pipe(
    ofType<fromActions.CreatePoliza>(PolizaActionTypes.CreatePoliza),
    map(action => action.payload.poliza),
    switchMap(poliza => {
      return this.service.save(poliza).pipe(
        map(res => new fromActions.CreatePolizaSuccess({ poliza: res })),
        catchError(response =>
          of(new fromActions.CreatePolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<fromActions.UpdatePoliza>(PolizaActionTypes.UpdatePoliza),
    map(action => action.payload.poliza),
    switchMap(poliza => {
      return this.service.update(poliza).pipe(
        map(res => new fromActions.UpdatePolizaSuccess({ poliza: res })),
        catchError(response =>
          of(new fromActions.UpdatePolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<fromActions.DeletePoliza>(PolizaActionTypes.DeletePoliza),
    map(action => action.payload.poliza),
    switchMap(poliza => {
      return this.service.delete(poliza).pipe(
        map(() => new fromActions.DeletePolizaSuccess({ poliza })),
        catchError(response =>
          of(new fromActions.DeletePolizaFail({ response }))
        )
      );
    })
  );

  @Effect()
  createSuccess$ = this.actions$.pipe(
    ofType<fromActions.CreatePolizaSuccess>(
      PolizaActionTypes.CreatePolizaSuccess
    ),
    map(action => action.payload.poliza),
    map(res => new fromRoot.Go({ path: ['/polizas', res.id] }))
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.pipe(
    ofType<fromActions.UpdatePolizaSuccess>(
      PolizaActionTypes.UpdatePolizaSuccess
    ),
    map(action => action.payload.poliza),
    tap(res => console.log('Update success from: ', res)),
    tap(poliza =>
      this.snackBar.open(`Poliza ${poliza.id} actualizada`, 'Cerrar', {
        duration: 8000
      })
    )
    // map(poliza => new fromRoot.Go({ path: ['/polizas', poliza.id] }))
  );

  @Effect()
  deleteSuccess$ = this.actions$.pipe(
    ofType<fromActions.DeletePolizaSuccess>(
      PolizaActionTypes.DeletePolizaSuccess
    ),
    map(action => action.payload.poliza),
    tap(poliza =>
      this.snackBar.open(`Poliza ${poliza.folio} eliminada`, 'Cerrar', {
        duration: 8000
      })
    ),
    map(res => new fromRoot.Go({ path: ['/polizas'] }))
  );

  @Effect()
  setFilter$ = this.actions$.pipe(
    ofType<fromActions.SetPolizasFilter>(PolizaActionTypes.SetPolizasFilter),
    map(
      action => new fromActions.LoadPolizas({ filter: action.payload.filter })
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadPolizasFail
      | fromActions.CreatePolizaFail
      | fromActions.UpdatePolizaFail
    >(
      PolizaActionTypes.LoadPolizasFail,
      PolizaActionTypes.CreatePolizaFail,
      PolizaActionTypes.UpdatePolizaFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
