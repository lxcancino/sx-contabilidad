import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromAction from '../actions/errors.actions';

import { tap, map } from 'rxjs/operators';

import { MatDialog, MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorsEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType<fromAction.HttpError>(fromAction.ErrorActionTypes.HttpError),
    map(action => action.payload.response),
    tap(response => console.log('HttpError: ', response)),
    tap(response =>
      this.snackBar.open(
        `Error ${response.status} ${response.message}`,
        'Cerrar',
        {
          duration: 8000
        }
      )
    )
  );
}
