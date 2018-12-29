import { Action } from '@ngrx/store';

import { Poliza, PolizasFilter } from '../../models';
import { Update } from '@ngrx/entity';

export enum PolizaActionTypes {
  SetPolizasFilter = '[Polizas component] Set Catalogo filter',
  LoadPolizas = '[Polizas Guard] Load Polizas',
  LoadPolizasSuccess = '[Poliza API] Load Polizas Success',
  LoadPolizasFail = '[Poliza API] Load Polizas Fail',

  CreatePoliza = '[Poliza Component] Poliza create',
  CreatePolizaSuccess = '[Poliza API] Poliza create  Success',
  CreatePolizaFail = '[Poliza API] Poliza create  Fail',

  // Egresos
  CreatePolizasEgreso = '[Poliza Component] Create polizas  egreso',
  CreatePolizasEgresoSuccess = '[Poliza API] Create Polizas egreso Success',
  CreatePolizasEgresoFail = '[Poliza API] Create Polizas  egreso Fail',

  DeletePoliza = '[Poliza Component] Delete Poliza',
  DeletePolizaFail = '[Poliza API] Delete Poliza Fail',
  DeletePolizaSuccess = '[Poliza API] Delete Poliza Success',

  UpdatePoliza = '[Poliza Component] Update Poliza',
  UpdatePolizaFail = '[Poliza API] Update Poliza Fail',
  UpdatePolizaSuccess = '[Poliza API] Update Poliza Success',

  // Recalcular
  RecalcularPoliza = '[Poliza Component] Recalcular Poliza',
  RecalcularPolizaFail = '[Poliza API] Recalcular Poliza Fail',
  RecalcularPolizaSuccess = '[Poliza API] Recalcular Poliza Success',

  // Cerrar
  CerrarPoliza = '[Poliza Component] Cerrar Poliza',
  CerrarPolizaFail = '[Poliza API] Cerrar Poliza Fail',
  CerrarPolizaSuccess = '[Poliza API] Cerrar Poliza Success',

  UpsertPoliza = '[Poliza exists guard] Upsert poliza'
}

// Set
export class SetPolizasFilter implements Action {
  readonly type = PolizaActionTypes.SetPolizasFilter;
  constructor(public payload: { filter: PolizasFilter }) {}
}

// Load
export class LoadPolizas implements Action {
  readonly type = PolizaActionTypes.LoadPolizas;
  constructor(public payload: { filter: PolizasFilter }) {}
}
export class LoadPolizasFail implements Action {
  readonly type = PolizaActionTypes.LoadPolizasFail;

  constructor(public payload: { response: any }) {}
}
export class LoadPolizasSuccess implements Action {
  readonly type = PolizaActionTypes.LoadPolizasSuccess;

  constructor(public payload: { polizas: Poliza[] }) {}
}

// Alta
export class CreatePoliza implements Action {
  readonly type = PolizaActionTypes.CreatePoliza;
  constructor(public payload: { poliza: Poliza }) {}
}
export class CreatePolizaFail implements Action {
  readonly type = PolizaActionTypes.CreatePolizaFail;
  constructor(public payload: { response: any }) {}
}
export class CreatePolizaSuccess implements Action {
  readonly type = PolizaActionTypes.CreatePolizaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

// Alta de egresos
export class CreatePolizasEgreso implements Action {
  readonly type = PolizaActionTypes.CreatePolizasEgreso;
  constructor(public payload: { filter: PolizasFilter }) {}
}
export class CreatePolizasEgresoFail implements Action {
  readonly type = PolizaActionTypes.CreatePolizasEgresoFail;
  constructor(public payload: { response: any }) {}
}
export class CreatePolizasEgresoSuccess implements Action {
  readonly type = PolizaActionTypes.CreatePolizasEgresoSuccess;
  constructor(public payload: { polizas: Poliza[] }) {}
}

// Delete
export class DeletePoliza implements Action {
  readonly type = PolizaActionTypes.DeletePoliza;

  constructor(public payload: { poliza: Poliza }) {}
}
export class DeletePolizaFail implements Action {
  readonly type = PolizaActionTypes.DeletePolizaFail;

  constructor(public payload: { response: any }) {}
}
export class DeletePolizaSuccess implements Action {
  readonly type = PolizaActionTypes.DeletePolizaSuccess;

  constructor(public payload: { poliza: Poliza }) {}
}

// Update
export class RecalcularPoliza implements Action {
  readonly type = PolizaActionTypes.RecalcularPoliza;
  constructor(public payload: { polizaId: number }) {}
}
export class RecalcularPolizaFail implements Action {
  readonly type = PolizaActionTypes.RecalcularPolizaFail;
  constructor(public payload: { response: any }) {}
}
export class RecalcularPolizaSuccess implements Action {
  readonly type = PolizaActionTypes.RecalcularPolizaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

// Cerrar
export class CerrarPoliza implements Action {
  readonly type = PolizaActionTypes.CerrarPoliza;
  constructor(public payload: { polizaId: number }) {}
}
export class CerrarPolizaFail implements Action {
  readonly type = PolizaActionTypes.CerrarPolizaFail;
  constructor(public payload: { response: any }) {}
}
export class CerrarPolizaSuccess implements Action {
  readonly type = PolizaActionTypes.CerrarPolizaSuccess;
  constructor(public payload: { poliza: Poliza }) {}
}

export class UpsertPoliza implements Action {
  readonly type = PolizaActionTypes.UpsertPoliza;
  constructor(public payload: { poliza: Poliza }) {}
}

// Recalcular
export class UpdatePoliza implements Action {
  readonly type = PolizaActionTypes.UpdatePoliza;

  constructor(public payload: { poliza: Update<Poliza> }) {}
}
export class UpdatePolizaFail implements Action {
  readonly type = PolizaActionTypes.UpdatePolizaFail;

  constructor(public payload: { response: any }) {}
}
export class UpdatePolizaSuccess implements Action {
  readonly type = PolizaActionTypes.UpdatePolizaSuccess;

  constructor(public payload: { poliza: Poliza }) {}
}

export type PolizaActions =
  | LoadPolizas
  | LoadPolizasFail
  | LoadPolizasSuccess
  | CreatePoliza
  | CreatePolizaFail
  | CreatePolizaSuccess
  | DeletePoliza
  | DeletePolizaFail
  | DeletePolizaSuccess
  | UpdatePoliza
  | UpdatePolizaFail
  | UpdatePolizaSuccess
  | UpsertPoliza
  | RecalcularPoliza
  | RecalcularPolizaFail
  | RecalcularPolizaSuccess
  | SetPolizasFilter
  | CreatePolizasEgreso
  | CreatePolizasEgresoFail
  | CreatePolizasEgresoSuccess
  | CerrarPoliza
  | CerrarPolizaFail
  | CerrarPolizaSuccess;
