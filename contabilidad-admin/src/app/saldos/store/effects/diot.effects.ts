import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromActions from '../actions/diot.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { DiotService } from 'app/saldos/services/diot.service';

@Injectable()
export class DiotEffects {
  constructor(private actions$: Actions, private service: DiotService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadDiot>(fromActions.DiotActionTypes.LoadDiot),
    map(action => action.payload.periodo),
    switchMap(per =>
      this.service.list(per).pipe(
        map(
          rows =>
            new fromActions.LoadDiotSuccess({
              rows
            })
        ),
        catchError(response => of(new fromActions.LoadDiotFail({ response })))
      )
    )
  );
}
