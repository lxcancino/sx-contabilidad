import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { FiscalCommonModule } from '../fiscal-common/fiscal-common.module';
import { InflacionRoutingModule } from './inflacion-routing.module';
import { InflacionPageComponent } from './pages/inflacion-page/inflacion-page.component';
import { ReportesModule } from 'app/reportes/reportes.module';
import { ConceptosTableComponent } from './components/conceptos-table/conceptos-table.component';
import { AjustesTableComponent } from './components/ajustes-table/ajustes-table.component';
import { AnalisisPageComponent } from './pages/analisis-page/analisis-page.component';

@NgModule({
  imports: [
    StoreModule.forFeature('inflacion', reducers),
    EffectsModule.forFeature(effects),
    FiscalCommonModule,
    InflacionRoutingModule,
    ReportesModule
  ],
  declarations: [
    InflacionPageComponent,
    ConceptosTableComponent,
    AjustesTableComponent,
    AnalisisPageComponent
  ]
})
export class InflacionModule {}
