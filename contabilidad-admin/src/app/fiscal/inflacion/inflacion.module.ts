import { NgModule } from '@angular/core';

import { FiscalCommonModule } from '../fiscal-common/fiscal-common.module';
import { InflacionRoutingModule } from './inflacion-routing.module';
import { InflacionPageComponent } from './inflacion-page/inflacion-page.component';

@NgModule({
  imports: [FiscalCommonModule, InflacionRoutingModule],
  declarations: [InflacionPageComponent]
})
export class InflacionModule {}
