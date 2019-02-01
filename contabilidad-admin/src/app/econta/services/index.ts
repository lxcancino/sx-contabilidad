import { CatalogoService } from './catalogo.service';
import { BalanzaService } from './balanza.service';
import { PolizasPeriodoService } from './polizas-periodo.service';

export const services: any[] = [
  CatalogoService,
  BalanzaService,
  PolizasPeriodoService
];

export * from './catalogo.service';
export * from './balanza.service';
export * from './polizas-periodo.service';
