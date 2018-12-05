import { PolizasTableComponent } from './polizas-table/polizas-table.component';
import { PolizaFormComponent } from './poliza-form/poliza-form.component';
import { AgregarPolizadetBtnComponent } from './poliza-det-form/agregar-poliza-det-btn.component';
import { PolizaCreateComponent } from './poliza-create/poliza-create.component';
import { PolizaPartidasTableComponent } from './poliza-partidas-table/poliza-partidas-table.component';

export const components: any[] = [
  PolizasTableComponent,
  PolizaFormComponent,
  AgregarPolizadetBtnComponent,
  PolizaCreateComponent,
  PolizaPartidasTableComponent
];

export const entryComponents: any[] = [PolizaCreateComponent];

export * from './polizas-table/polizas-table.component';
export * from './poliza-form/poliza-form.component';
export * from './poliza-det-form/agregar-poliza-det-btn.component';
export * from './poliza-create/poliza-create.component';
export * from './poliza-partidas-table/poliza-partidas-table.component';
