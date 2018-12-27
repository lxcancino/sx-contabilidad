import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SaldosActionTypes, SaldosActions } from '../actions/saldos.actions';

import { SaldoPorCuentaContable } from '../../models';

import {
  EjercicioMes,
  buildCurrentPeriodo
} from '../../../models/ejercicio-mes';

export interface State extends EntityState<SaldoPorCuentaContable> {
  loading: boolean;
  loaded: boolean;
  periodo: EjercicioMes;
}

export const adapter: EntityAdapter<
  SaldoPorCuentaContable
> = createEntityAdapter<SaldoPorCuentaContable>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  periodo: buildCurrentPeriodo()
});

export function reducer(state = initialState, action: SaldosActions): State {
  switch (action.type) {
    case SaldosActionTypes.SetSaldosPeriodo: {
      return {
        ...state,
        periodo: action.payload.periodo
      };
    }

    case SaldosActionTypes.LoadSaldos: {
      return {
        ...state,
        loading: true
      };
    }
    case SaldosActionTypes.LoadSaldosFail: {
      return {
        ...state,
        loading: false
      };
    }

    case SaldosActionTypes.LoadSaldosSuccess: {
      return adapter.addAll(action.payload.saldos, {
        ...state,
        loading: false,
        loaded: true
      });
    }
  }
  return state;
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const getSaldosLoaded = (state: State) => state.loaded;
export const getSaldosLoading = (state: State) => state.loading;
export const getSaldosPeriodo = (state: State) => state.periodo;