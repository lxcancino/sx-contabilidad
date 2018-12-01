import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.PolizasPageComponent,
    children: [
      { path: 'ingreso', component: fromContainers.PolizasDeIngresoComponent },
      { path: 'ingreso/:id', component: fromContainers.PolizaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolizasRoutingModule {}
