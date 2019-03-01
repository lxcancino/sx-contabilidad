import { SaldosGuard } from './saldos.guard';
import { SaldoResolver } from './saldo.resolver';

export const guards: any[] = [SaldosGuard, SaldoResolver];

export * from './saldos.guard';
export * from './saldo.resolver';
