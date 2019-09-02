import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/activo.actions';
import { ActivoActionTypes } from '../actions/activo.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { ActivoFijoService } from 'app/activo-fijo/services/activo-fijo.service';

@Injectable()
export class ActivoEffects {
  constructor(private actions$: Actions, private service: ActivoFijoService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadActivos>(fromActions.ActivoActionTypes.LoadActivos),
    switchMap(per =>
      this.service.list().pipe(
        map(activos => new fromActions.LoadActivoSuccess({ activos })),
        catchError(response => of(new fromActions.LoadActivoFail({ response })))
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadActivoFail>(ActivoActionTypes.LoadActivosFail),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
