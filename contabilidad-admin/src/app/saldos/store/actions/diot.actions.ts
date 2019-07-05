import { Action } from '@ngrx/store';

import { Diot } from '../../models';
import { EjercicioMes } from '../../../models/ejercicio-mes';

export enum DiotActionTypes {
  LoadDiot = '[Diot Component] Load DIOT',
  LoadDiotSuccess = '[Diot API] Load DIOT Success',
  LoadDiotFail = '[Diot API] Load DIOT Fail'
}

// Load
export class LoadDiot implements Action {
  readonly type = DiotActionTypes.LoadDiot;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class LoadDiotFail implements Action {
  readonly type = DiotActionTypes.LoadDiotFail;

  constructor(public payload: { response: any }) {}
}
export class LoadDiotSuccess implements Action {
  readonly type = DiotActionTypes.LoadDiotSuccess;
  constructor(public payload: { rows: Diot[] }) {}
}

export type DiotActions = LoadDiot | LoadDiotFail | LoadDiotSuccess;
