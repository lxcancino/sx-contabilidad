import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CorteDeTarjetaAplicacion } from '../models';
import { Periodo } from 'app/_core/models/periodo';

export enum AplicacionDeCorteActionTypes {
  LoadAplicacionesDeCorte = '[AplicacionesDeCorte Guard] Load AplicacionesDeCorte',
  LoadAplicacionesDeCorteFail = '[AplicacionesDeCorte API] Load AplicacionesDeCorte Fail',
  LoadAplicacionesDeCorteSuccess = '[AplicacionesDeCorte API] Load AplicacionesDeCorte Success',

  UpdateAplicacionDeCorte = '[AplicacionesDeCorte component] Update ficha',
  UpdateAplicacionDeCorteFail = '[AplicacionesDeCorte API] Update ficha fail',
  UpdateAplicacionDeCorteSuccess = '[AplicacionesDeCorte API] Update ficha success'
}

// Load actions
export class LoadAplicacionesDeCorte implements Action {
  readonly type = AplicacionDeCorteActionTypes.LoadAplicacionesDeCorte;
  constructor(public payload: { periodo: Periodo }) {}
}
export class LoadAplicacionesDeCorteFail implements Action {
  readonly type = AplicacionDeCorteActionTypes.LoadAplicacionesDeCorteFail;
  constructor(public payload: { response: any }) {}
}
export class LoadAplicacionesDeCorteSuccess implements Action {
  readonly type = AplicacionDeCorteActionTypes.LoadAplicacionesDeCorteSuccess;

  constructor(public payload: { aplicaciones: CorteDeTarjetaAplicacion[] }) {}
}

// Update aplicacion
export class UpdateAplicacionDeCorte implements Action {
  readonly type = AplicacionDeCorteActionTypes.UpdateAplicacionDeCorte;
  constructor(public payload: { update: Update<CorteDeTarjetaAplicacion> }) {}
}
export class UpdateAplicacionDeCorteFial implements Action {
  readonly type = AplicacionDeCorteActionTypes.UpdateAplicacionDeCorteFail;
  constructor(public payload: { response: any }) {}
}
export class UpdateAplicacionDeCorteSuccess implements Action {
  readonly type = AplicacionDeCorteActionTypes.UpdateAplicacionDeCorteSuccess;

  constructor(public payload: { aplicacion: CorteDeTarjetaAplicacion }) {}
}

export type AplicacionDeCorteActions =
  | LoadAplicacionesDeCorte
  | LoadAplicacionesDeCorteFail
  | LoadAplicacionesDeCorteSuccess
  | UpdateAplicacionDeCorte
  | UpdateAplicacionDeCorteFial
  | UpdateAplicacionDeCorteSuccess;
