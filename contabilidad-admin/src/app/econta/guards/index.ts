import { CatalogosGuard } from './catalogos.guard';
import { CatalogoExistsGuard } from './catalogo-exists.guard';
import { BalanzasGuard } from './balanzas.guard';
import { PolizasPeriodoGuard } from './polizas-periodo.guard';

export const guards: any[] = [
  CatalogosGuard,
  CatalogoExistsGuard,
  BalanzasGuard,
  PolizasPeriodoGuard
];

export * from './catalogos.guard';
export * from './catalogo-exists.guard';
export * from './balanzas.guard';
export * from './polizas-periodo.guard';
