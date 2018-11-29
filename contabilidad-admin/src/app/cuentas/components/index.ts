import { CuentasTableComponent } from './cuentas-table/cuentas-table.component';
import { CuentaFormComponent } from './cuenta-form/cuenta-form.component';
import { NaturalezaFieldComponent } from './cuenta-form/naturaleza-field.component';
import { TipoCuentaFieldComponent } from './cuenta-form/tipo-cuenta-field.component';
import { SubtipoCuentaFieldComponent } from './cuenta-form/subtipo-cuenta-field.component';
import { CuentaSatFieldComponent } from './cuenta-form/cuenta-sat-field.component';
import { CuentaCreateDialogComponent } from './cuenta-create-dialog/cuenta-create-dialog.component';

export const components: any[] = [
  CuentasTableComponent,
  CuentaFormComponent,
  NaturalezaFieldComponent,
  TipoCuentaFieldComponent,
  SubtipoCuentaFieldComponent,
  CuentaSatFieldComponent,
  CuentaCreateDialogComponent
];

export const entryComponents: any[] = [CuentaCreateDialogComponent];

export * from './cuentas-table/cuentas-table.component';
export * from './cuenta-form/cuenta-form.component';
export * from './cuenta-form/naturaleza-field.component';
export * from './cuenta-form/tipo-cuenta-field.component';
export * from './cuenta-form/subtipo-cuenta-field.component';
export * from './cuenta-form/cuenta-sat-field.component';
export * from './cuenta-create-dialog/cuenta-create-dialog.component';
