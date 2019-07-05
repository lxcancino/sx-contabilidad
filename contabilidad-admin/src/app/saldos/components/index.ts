import { SaldosTableComponent } from './saldos-table/saldos-table.component';
import { AuxiliarContableDialogComponent } from './auxiliar-contable-dialog/auxiliar-contable-dialog.component';
import { PolizadetTableComponent } from './polizadet-table/polizadet-table.component';
import { MovimientosTableComponent } from './movimientos-table/movimientos-table.component';
import { DiotTableComponent } from './diot-table/diot-table.component';

export const components: any[] = [
  SaldosTableComponent,
  AuxiliarContableDialogComponent,
  PolizadetTableComponent,
  MovimientosTableComponent,
  DiotTableComponent
];
export const entryComponents: any[] = [AuxiliarContableDialogComponent];

export * from './saldos-table/saldos-table.component';
export * from './auxiliar-contable-dialog/auxiliar-contable-dialog.component';
export * from './polizadet-table/polizadet-table.component';
export * from './movimientos-table/movimientos-table.component';
export * from './diot-table/diot-table.component';
