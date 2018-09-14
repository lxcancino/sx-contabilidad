import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCostoPromedio from './costo-promedio.reducer';

export interface State {
  costosPromedio: fromCostoPromedio.State;
}

export const reducers: ActionReducerMap<State> = {
  costosPromedio: fromCostoPromedio.reducer
};

export const getState = createFeatureSelector<State>('costos');
