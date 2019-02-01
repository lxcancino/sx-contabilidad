import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  BalanzasActionTypes,
  BalanzasActions
} from '../actions/balanzas.actions';

import { Balanza } from '../../models';

export interface State extends EntityState<Balanza> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Balanza> = createEntityAdapter<Balanza>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state = initialState, action: BalanzasActions): State {
  switch (action.type) {
    case BalanzasActionTypes.GenerarBalanza:
    case BalanzasActionTypes.LoadBalanzas: {
      return {
        ...state,
        loading: true
      };
    }
    case BalanzasActionTypes.GenerarBalanzaFail:
    case BalanzasActionTypes.LoadBalanzasFail: {
      return {
        ...state,
        loading: false
      };
    }

    case BalanzasActionTypes.LoadBalanzasSuccess: {
      return adapter.addAll(action.payload.balanzas, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case BalanzasActionTypes.UpsertBalanza: {
      return adapter.upsertOne(action.payload.balanza, {
        ...state
      });
    }

    case BalanzasActionTypes.GenerarBalanzaSuccess: {
      return adapter.upsertOne(action.payload.balanza, {
        ...state,
        loading: false
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

export const getBalanzasLoaded = (state: State) => state.loaded;
export const getBalanzasLoading = (state: State) => state.loading;
