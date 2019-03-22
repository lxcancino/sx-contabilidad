import { NgModule } from '@angular/core';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { SharedModule } from 'app/_shared/shared.module';
import { FichasModule } from './fichas/fichas.module';

@NgModule({
  imports: [SharedModule, MantenimientosRoutingModule, FichasModule],
  declarations: []
})
export class MantenimientosModule {}
