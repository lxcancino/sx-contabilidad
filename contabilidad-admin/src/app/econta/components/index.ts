import { CatalogosTableComponent } from './catalogos-table/catalogos-table.component';
import { BalanzasTableComponent } from './balanzas-table/balanzas-table.component';
import { PolizasPeriodoTableComponent } from './polizas-periodo-table/polizas-periodo-table.component';
import { PolizasPorPeriodoCreateDialogComponent } from './polizas-del-periodo-create-dialog/polizas-del-periodo-create-dialog.component';

export const components: any[] = [
  CatalogosTableComponent,
  BalanzasTableComponent,
  PolizasPeriodoTableComponent,
  PolizasPorPeriodoCreateDialogComponent
];

export const entryComponents: any[] = [PolizasPorPeriodoCreateDialogComponent];

export * from './catalogos-table/catalogos-table.component';
export * from './balanzas-table/balanzas-table.component';
export * from './polizas-periodo-table/polizas-periodo-table.component';
export * from './polizas-del-periodo-create-dialog/polizas-del-periodo-create-dialog.component';
