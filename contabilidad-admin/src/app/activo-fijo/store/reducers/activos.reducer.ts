import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ActivoFijo } from '../../models/activo-fijo';
import { ActivoActionTypes, ActivosActions } from '../actions/activo.actions';

export interface State extends EntityState<ActivoFijo> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<ActivoFijo> = createEntityAdapter<
  ActivoFijo
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state = initialState, action: ActivosActions): State {
  switch (action.type) {
    case ActivoActionTypes.GenerarPendientes:
    case ActivoActionTypes.UpdateActivo:
    case ActivoActionTypes.CreateActivo:
    case ActivoActionTypes.LoadActivos: {
      return {
        ...state,
        loading: true
      };
    }
    case ActivoActionTypes.GenerarPendientesFail:
    case ActivoActionTypes.UpdateActivoFail:
    case ActivoActionTypes.CreateActivoFail:
    case ActivoActionTypes.LoadActivosFail: {
      return {
        ...state,
        loading: false
      };
    }

    case ActivoActionTypes.LoadActivosSuccess: {
      return adapter.addAll(action.payload.activos, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case ActivoActionTypes.CreateActivoSuccess: {
      return adapter.addOne(action.payload.activo, {
        ...state,
        loading: false
      });
    }

    case ActivoActionTypes.UpsertActivo: {
      return adapter.upsertOne(action.payload.activo, {
        ...state
      });
    }

    case ActivoActionTypes.UpdateActivoSuccess: {
      return adapter.upsertOne(action.payload.activo, {
        ...state,
        loading: false
      });
    }

    case ActivoActionTypes.GenerarPendientesSuccess: {
      return adapter.addMany(action.payload.activos, {
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

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
