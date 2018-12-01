import { NgModule } from '@angular/core';

import { PolizasRoutingModule } from './polizas-routing.module';
import { SharedModule } from '../_shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { services } from './services';
import { guards } from './guards';
import { components, entryComponents } from './components';
import { containers } from './containers';
import { AuthModule } from '../auth/auth.module';
import { ReportesModule } from '../reportes/reportes.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    ReportesModule,
    PolizasRoutingModule,
    StoreModule.forFeature('polizas', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents],
  providers: [...services, ...guards],
  exports: [...containers, ...components]
})
export class PolizasModule {}
