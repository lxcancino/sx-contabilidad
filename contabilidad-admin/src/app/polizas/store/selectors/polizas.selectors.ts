import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromPolizas from '../reducers/polizas.reducer';
import { Poliza } from '../../models';

import * as _ from 'lodash';

export const getPolizasState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.polizas
);

export const getPolizasEntities = createSelector(
  getPolizasState,
  fromPolizas.selectEntities
);

export const getPolizas = createSelector(
  getPolizasState,
  fromPolizas.selectAll
);

export const getPolizasLoading = createSelector(
  getPolizasState,
  fromPolizas.getPolizasLoading
);

export const getSelectedPoliza = createSelector(
  getPolizasEntities,
  fromRoot.getRouterState,
  (entities, router): Poliza => {
    return router.state && entities[router.state.params.polizaId];
  }
);
export const getSelectedPolizaId = createSelector(
  getSelectedPoliza,
  cuenta => (cuenta ? cuenta.id : undefined)
);

export const getPolizasFilter = createSelector(
  getPolizasState,
  fromPolizas.getPolizasFilter
);

export const getPolizasLoaded = createSelector(
  getPolizasState,
  fromPolizas.getPolizasLoaded
);
