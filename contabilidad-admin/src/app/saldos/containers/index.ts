import { SaldosPageComponent } from './saldos-page/saldos-page.component';
import { SaldosComponent } from './saldos/saldos.component';

import { AuxiliarComponent } from './auxiliar/auxiliar.component';
import { MovimientosPorCuentaComponent } from './movimientos-por-cuenta/movimientos-por-cuenta.component';

export const containers: any[] = [
  SaldosPageComponent,
  SaldosComponent,
  MovimientosPorCuentaComponent,
  AuxiliarComponent
];

export * from './saldos-page/saldos-page.component';
export * from './saldos/saldos.component';
export * from './movimientos-por-cuenta/movimientos-por-cuenta.component';
export * from './auxiliar/auxiliar.component';
