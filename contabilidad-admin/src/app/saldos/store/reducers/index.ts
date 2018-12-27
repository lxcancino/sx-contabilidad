import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromSaldos from './saldos.reducer';

export interface State {
  saldos: fromSaldos.State;
}

export const reducers: ActionReducerMap<State> = {
  saldos: fromSaldos.reducer
};

export const getState = createFeatureSelector<State>('saldos');
