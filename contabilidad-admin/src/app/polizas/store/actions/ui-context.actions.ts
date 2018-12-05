import { Action } from '@ngrx/store';
import { EjercicioMes } from 'app/models/ejercicio-mes';

export enum UIContextActionTypes {
  SetPeriodoDePoliza = '[Polizas page] Set Periodo de polizas'
}

export class SetPeriodoDePoliza implements Action {
  type = UIContextActionTypes.SetPeriodoDePoliza;
  constructor(public payload: { periodo: EjercicioMes }) {}
}

export type UIContextActions = SetPeriodoDePoliza;
