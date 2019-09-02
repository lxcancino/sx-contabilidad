import { ActivosTableComponent } from './activos-table/activos-table.component';
import { CreateActivoModalComponent } from './create-activo/create-activo-modal.component';

export const components: any[] = [
  ActivosTableComponent,
  CreateActivoModalComponent
];
export const entryComponents: any[] = [CreateActivoModalComponent];

export * from './activos-table/activos-table.component';
export * from './create-activo/create-activo-modal.component';
