import { Action } from '@ngrx/store';
import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { Update } from '@ngrx/entity';

export enum ActivoActionTypes {
  LoadActivos = '[Activos Component] Load Activos ',
  LoadActivosSuccess = '[Activos API] Load Activos  Success',
  LoadActivosFail = '[Activos API] Load Activos  Fail',

  // Create
  CreateActivo = '[Create Activo Component] Create Activo',
  CreateActivoFail = '[Activo Effects] Create Activo fail',
  CreateActivoSuccess = '[Activo Effects] Create Activo success',

  // Update
  UpdateActivo = '[EditActivo component] Update activo',
  UpdateActivoFail = '[EditActivo component] Update activo fail',
  UpdateActivoSuccess = '[EditActivo component] Update activo success',

  UpsertActivo = '[Activo exists guard] Upsert Activo fijo',

  // Generacion de pendientes
  GenerarPendientes = '[ActivoFijos component ] Generar pendientes',
  GenerarPendientesFail = '[ActivoFijos component ] Generar pendientes fail',
  GenerarPendientesSuccess = '[ActivoFijos component ] Generar pendientes success'
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

// Create
export class CreateActivo implements Action {
  readonly type = ActivoActionTypes.CreateActivo;
  constructor(public payload: { activo: Partial<ActivoFijo> }) {}
}
export class CreateActivoFail implements Action {
  readonly type = ActivoActionTypes.CreateActivoFail;
  constructor(public payload: { response: any }) {}
}
export class CreateActivoSuccess implements Action {
  readonly type = ActivoActionTypes.CreateActivoSuccess;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Update activo
export class UpdateActivo implements Action {
  readonly type = ActivoActionTypes.UpdateActivo;
  constructor(public payload: { activo: Update<ActivoFijo> }) {}
}
export class UpdateActivoFail implements Action {
  readonly type = ActivoActionTypes.UpdateActivoFail;
  constructor(public payload: { response: any }) {}
}
export class UpdateActivoSuccess implements Action {
  readonly type = ActivoActionTypes.UpdateActivoSuccess;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Upasert entity
export class UpsertActivo implements Action {
  readonly type = ActivoActionTypes.UpsertActivo;
  constructor(public payload: { activo: ActivoFijo }) {}
}

// Generar pendientes
export class GenerarPendientes implements Action {
  readonly type = ActivoActionTypes.GenerarPendientes;
}
export class GenerarPendientesFail implements Action {
  readonly type = ActivoActionTypes.GenerarPendientesFail;
  constructor(public payload: { response: any }) {}
}
export class GenerarPendientesSuccess implements Action {
  readonly type = ActivoActionTypes.GenerarPendientesSuccess;
  constructor(public payload: { activos: ActivoFijo[] }) {}
}

export type ActivosActions =
  | LoadActivos
  | LoadActivoFail
  | LoadActivoSuccess
  | CreateActivo
  | CreateActivoFail
  | CreateActivoSuccess
  | UpdateActivo
  | UpdateActivoFail
  | UpdateActivoSuccess
  | UpsertActivo
  | GenerarPendientes
  | GenerarPendientesFail
  | GenerarPendientesSuccess;
