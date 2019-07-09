import { Action } from '@ngrx/store';

import { Periodo } from 'app/_core/models/periodo';
import { Auxiliar } from 'app/saldos/models/auxiliar';

export const enum AuxiliarActionTypes {
  LoadAuxiliarDeBancos = '[Auxiliar de Bancos component] Load auxiliar de bancos ',
  LoadAuxiliarDeBancosFail = '[Auxiliarta API] Load auxiliar de bancos  fail',
  LoadAuxiliarDeBancosSuccess = '[Auxiliarta API] Load auxiliar de bancos success'
}

export class LoadAuxiliarDeBancos implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarDeBancos;
  constructor(
    public payload: {
      cuentaId: number;
      periodo: Periodo;
    }
  ) {}
}
export class LoadAuxiliarDeBancosFail implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarDeBancosFail;
  constructor(public payload: { response: any }) {}
}
export class LoadAuxiliarDeBancosSuccess implements Action {
  readonly type = AuxiliarActionTypes.LoadAuxiliarDeBancosSuccess;
  constructor(public payload: { movimientos: Auxiliar[] }) {}
}

export type AuxiliarActions =
  | LoadAuxiliarDeBancos
  | LoadAuxiliarDeBancosFail
  | LoadAuxiliarDeBancosSuccess;
