import { SaldosEffects } from './saldos.effects';
import { MovimientosEffects } from './movimientos.effects';
import { DiotEffects } from './diot.effects';

export const effects: any[] = [SaldosEffects, MovimientosEffects, DiotEffects];

export * from './saldos.effects';
export * from './movimientos.effects';
export * from './diot.effects';
