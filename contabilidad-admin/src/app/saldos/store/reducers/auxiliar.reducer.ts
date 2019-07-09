import * as fromActions from '../actions/auxiliar.actions';
import { AuxiliarActionTypes } from '../actions/auxiliar.actions';
import { Auxiliar } from 'app/saldos/models/auxiliar';

export interface State {
  registros: Auxiliar[];
  loading: boolean;
}

export const initialState = {
  loading: false,
  registros: []
};

export function reducer(
  state = initialState,
  action: fromActions.AuxiliarActions
): State {
  switch (action.type) {
    case AuxiliarActionTypes.LoadAuxiliarDeBancos: {
      return {
        ...state,
        loading: true
      };
    }
    case AuxiliarActionTypes.LoadAuxiliarDeBancosFail: {
      return {
        ...state,
        loading: false
      };
    }
    case AuxiliarActionTypes.LoadAuxiliarDeBancosSuccess: {
      return {
        ...state,
        registros: action.payload.movimientos,
        loading: false
      };
    }
    default:
      return {
        ...state
      };
  }
}

export const getAuxiliarLoading = (state: State) => state.loading;
export const getRegistros = (state: State) => state.registros;
