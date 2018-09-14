import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum ErrorActionTypes {
  HttpError = '[Global Error] HttpError'
}

export class HttpError implements Action {
  readonly type = ErrorActionTypes.HttpError;
  constructor(public payload: { response: HttpErrorResponse }) {}
}

export type ErrorActions = HttpError;
