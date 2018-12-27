import { Action } from '@ngrx/store';

import { SaldoPorCuentaContable } from '../../models';
import { EjercicioMes } from '../../../models/ejercicio-mes';

export enum SaldosActionTypes {
  SetSaldosPeriodo = '[Saldos page] Set Periodo de saldos',

  LoadSaldos = '[Saldos Guard] Load Saldos',
  LoadSaldosSuccess = '[Saldos API] Load Saldos Success',
  LoadSaldosFail = '[Saldos API] Load Saldos Fail',

  // Actualizar
  ActualizarSaldos = '[Saldos Component] Actualizar Saldos',
  ActualizarSaldosFail = '[Saldos API] Actualizar Saldos Fail',
  ActualizarSaldosSuccess = '[Saldos API] Actualizar Saldos Success'
}

export class SetSaldosPeriodo implements Action {
  readonly type = SaldosActionTypes.SetSaldosPeriodo;
  constructor(public payload: { periodo: EjercicioMes }) {}
}

// Load
export class LoadSaldos implements Action {
  readonly type = SaldosActionTypes.LoadSaldos;
}
export class LoadSaldosFail implements Action {
  readonly type = SaldosActionTypes.LoadSaldosFail;

  constructor(public payload: { response: any }) {}
}
export class LoadSaldosSuccess implements Action {
  readonly type = SaldosActionTypes.LoadSaldosSuccess;
  constructor(public payload: { saldos: SaldoPorCuentaContable[] }) {}
}

// Actualizar
export class ActualizarSaldos implements Action {
  readonly type = SaldosActionTypes.ActualizarSaldos;
  constructor(public payload: { periodo: EjercicioMes }) {}
}
export class ActualizarSaldosFail implements Action {
  readonly type = SaldosActionTypes.ActualizarSaldosFail;
  constructor(public payload: { response: any }) {}
}
export class ActualizarSaldosSuccess implements Action {
  readonly type = SaldosActionTypes.ActualizarSaldosSuccess;
  constructor(public payload: { saldos: SaldoPorCuentaContable[] }) {}
}

export type SaldosActions =
  | SetSaldosPeriodo
  | LoadSaldos
  | LoadSaldosFail
  | LoadSaldosSuccess
  | ActualizarSaldos
  | ActualizarSaldosFail
  | ActualizarSaldosSuccess;
