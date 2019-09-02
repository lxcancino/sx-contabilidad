import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromActivos from './activos.reducer';

export interface State {
  activos: fromActivos.State;
}

export const reducers: ActionReducerMap<State> = {
  activos: fromActivos.reducer
};

export const getState = createFeatureSelector<State>('activo-fijo');
