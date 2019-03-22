import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/ficha.reducer';
import { FichaEffects } from './store/fichas.effects';

import { FichasPageComponent } from './components/fichas-page/fichas-page.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('fichas', reducer),
    EffectsModule.forFeature([FichaEffects])
  ],
  declarations: [FichasPageComponent]
})
export class FichasModule {}
