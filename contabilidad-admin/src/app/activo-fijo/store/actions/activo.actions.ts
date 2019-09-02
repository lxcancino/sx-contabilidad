import { Action } from '@ngrx/store';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';

export enum ActivoActionTypes {
  LoadActivos = '[Activos Component] Load Activos ',
  LoadActivosSuccess = '[Activos API] Load Activos  Success',
  LoadActivosFail = '[Activos API] Load Activos  Fail',

  UpsertActivo = '[Activo exists guard] Upsert Activo fijo'
}

// Load
export class LoadActivos implements Action {
  readonly type = ActivoActionTypes.LoadActivos;
}
export class LoadActivoFail implements Action {
  readonly type = ActivoActionTypes.LoadActivosFail;

  constructor(public payload: { response: any }) {}
}
export class LoadActivoSuccess implements Action {
  readonly type = ActivoActionTypes.LoadActivosSuccess;
  constructor(public payload: { activos: ActivoFijo[] }) {}
}

export class UpsertActivo implements Action {
  readonly type = ActivoActionTypes.UpsertActivo;
  constructor(public payload: { activo: ActivoFijo }) {}
}

export type ActivosActions =
  | LoadActivos
  | LoadActivoFail
  | LoadActivoSuccess
  | UpsertActivo;
