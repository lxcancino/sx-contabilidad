import { SaldosEffects } from './saldos.effects';
import { MovimientosEffects } from './movimientos.effects';
import { DiotEffects } from './diot.effects';
import { AuxiliarEffects } from './auxiliar.effects';

export const effects: any[] = [
  SaldosEffects,
  MovimientosEffects,
  DiotEffects,
  AuxiliarEffects
];

export * from './saldos.effects';
export * from './movimientos.effects';
export * from './diot.effects';
export * from './auxiliar.effects';
