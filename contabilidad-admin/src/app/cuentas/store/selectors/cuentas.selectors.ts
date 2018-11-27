import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromCuentas from '../reducers/cuentas.reducer';
import { CuentaContable } from '../../models';

import * as _ from 'lodash';

export const getCuentasState = createSelector(
  fromFeature.getState,
  (state: fromFeature.State) => state.cuentas
);

export const getCuentasEntities = createSelector(
  getCuentasState,
  fromCuentas.selectEntities
);

export const getCuentas = createSelector(
  getCuentasState,
  fromCuentas.selectAll
);

export const getCuentasLoading = createSelector(
  getCuentasState,
  fromCuentas.getCuentasLoading
);

export const getSelectedCuenta = createSelector(
  getCuentasEntities,
  fromRoot.getRouterState,
  (entities, router): CuentaContable => {
    return router.state && entities[router.state.params.cuentaId];
  }
);

export const getCuentasLoaded = createSelector(
  getCuentasState,
  fromCuentas.getCuentasLoaded
);
