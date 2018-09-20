import { ReportButtonComponent } from './report-button/report-button.component';
import { RepPeriodoSucursalComponent } from './rep-periodo-sucursal/rep-periodo-sucursal.component';
import { KardexReportComponent } from './kardex-report/kardex-report.component';

export const components: any[] = [
  ReportButtonComponent,
  RepPeriodoSucursalComponent,
  KardexReportComponent
];

export const entryComponents: any[] = [
  RepPeriodoSucursalComponent,
  KardexReportComponent
];

export * from './report-button/report-button.component';
export * from './rep-periodo-sucursal/rep-periodo-sucursal.component';
export * from './kardex-report/kardex-report.component';
