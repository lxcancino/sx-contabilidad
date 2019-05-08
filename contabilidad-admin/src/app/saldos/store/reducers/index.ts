import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromSaldos from './saldos.reducer';
import * as fromMovimientos from './movimientos.reducer';

export interface State {
  saldos: fromSaldos.State;
  movimientos: fromMovimientos.State;
}

export const reducers: ActionReducerMap<State> = {
  saldos: fromSaldos.reducer,
  movimientos: fromMovimientos.reducer
};

export const getState = createFeatureSelector<State>('saldos');
