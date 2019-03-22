import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromFichas from './ficha.reducer';

export interface State {
  fichas: fromFichas.State;
}

export const reducers: ActionReducerMap<State> = {
  fichas: fromFichas.reducer
};

export const getState = createFeatureSelector<State>('fichas');
