import { SaldosTableComponent } from './saldos-table/saldos-table.component';
import { AuxiliarContableDialogComponent } from './auxiliar-contable-dialog/auxiliar-contable-dialog.component';

export const components: any[] = [
  SaldosTableComponent,
  AuxiliarContableDialogComponent
];
export const entryComponents: any[] = [AuxiliarContableDialogComponent];

export * from './saldos-table/saldos-table.component';
export * from './auxiliar-contable-dialog/auxiliar-contable-dialog.component';
