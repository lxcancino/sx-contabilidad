import { CostosTableComponent } from './costos-table/costos-table.component';
import { PeriodoCostosDialogComponent } from './periodo-costos-dialog/periodo-costos-dialog.component';
import { CalculoPorProductoDialogComponent } from './calculo-por-producto-dialog/calculo-por-producto-dialog.component';
import { InventarioCosteadoDialogComponent } from './inventario-costeado-dialog/inventario-costeado-dialog.component';
import { AnalisisCostoComponent } from './analisis-costo/analisis-costo.component';
import { CostoPorProductoTableComponent } from './costo-por-producto-table/costo-por-producto-table.component';
import { CostoPorProductoMovsTableComponent } from './costo-por-producto-movs-table/costo-por-producto-movs.component';
import { MovsPorProductoComponent } from './movs-por-producto/movs-por-producto.component';
import { MovsPorProductoTableComponent } from './movs-por-producto-table/movs-por-producto-table.component';
import { ReportComsSinAnalizarComponent } from './report-coms-sin-analizar/report-coms-sin-analizar.component';

export const components: any[] = [
  CostosTableComponent,
  PeriodoCostosDialogComponent,
  CalculoPorProductoDialogComponent,
  InventarioCosteadoDialogComponent,
  AnalisisCostoComponent,
  CostoPorProductoTableComponent,
  CostoPorProductoMovsTableComponent,
  MovsPorProductoComponent,
  MovsPorProductoTableComponent,
  ReportComsSinAnalizarComponent
];
export const entryComponents: any[] = [
  PeriodoCostosDialogComponent,
  CalculoPorProductoDialogComponent,
  InventarioCosteadoDialogComponent,
  ReportComsSinAnalizarComponent
];

export * from './costos-table/costos-table.component';
export * from './periodo-costos-dialog/periodo-costos-dialog.component';
export * from './calculo-por-producto-dialog/calculo-por-producto-dialog.component';
export * from './inventario-costeado-dialog/inventario-costeado-dialog.component';
export * from './analisis-costo/analisis-costo.component';
export * from './costo-por-producto-table/costo-por-producto-table.component';
export * from './costo-por-producto-movs-table/costo-por-producto-movs.component';
export * from './movs-por-producto/movs-por-producto.component';
export * from './movs-por-producto-table/movs-por-producto-table.component';
export * from './report-coms-sin-analizar/report-coms-sin-analizar.component';
