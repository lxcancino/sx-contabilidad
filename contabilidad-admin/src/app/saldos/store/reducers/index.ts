import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromSaldos from './saldos.reducer';
import * as fromMovimientos from './movimientos.reducer';
import * as fromDiot from './diot.reducer';

export interface State {
  saldos: fromSaldos.State;
  movimientos: fromMovimientos.State;
  diot: fromDiot.State;
}

export const reducers: ActionReducerMap<State> = {
  saldos: fromSaldos.reducer,
  movimientos: fromMovimientos.reducer,
  diot: fromDiot.reducer
};

export const getState = createFeatureSelector<State>('saldos');
