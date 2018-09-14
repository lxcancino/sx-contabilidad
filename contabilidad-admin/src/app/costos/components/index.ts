import { CostosTableComponent } from './costos-table/costos-table.component';
import { PeriodoCostosDialogComponent } from './periodo-costos-dialog/periodo-costos-dialog.component';
import { CalculoPorProductoDialogComponent } from './calculo-por-producto-dialog/calculo-por-producto-dialog.component';
import { InventarioCosteadoDialogComponent } from './inventario-costeado-dialog/inventario-costeado-dialog.component';

export const components: any[] = [
  CostosTableComponent,
  PeriodoCostosDialogComponent,
  CalculoPorProductoDialogComponent,
  InventarioCosteadoDialogComponent
];
export const entryComponents: any[] = [
  PeriodoCostosDialogComponent,
  CalculoPorProductoDialogComponent,
  InventarioCosteadoDialogComponent
];

export * from './costos-table/costos-table.component';
export * from './periodo-costos-dialog/periodo-costos-dialog.component';
export * from './calculo-por-producto-dialog/calculo-por-producto-dialog.component';
export * from './inventario-costeado-dialog/inventario-costeado-dialog.component';
