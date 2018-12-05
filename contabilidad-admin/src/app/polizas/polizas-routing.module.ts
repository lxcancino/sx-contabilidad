import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.PolizasPageComponent,
    children: [
      {
        path: 'ingreso',
        canActivate: [fromGuards.PolizasGuard],
        component: fromContainers.PolizasComponent
      },
      { path: 'ingreso/:id', component: fromContainers.PolizaComponent },
      {
        path: 'egreso',
        canActivate: [fromGuards.PolizasGuard],
        component: fromContainers.PolizasComponent
      },
      { path: 'egreso/:id', component: fromContainers.PolizaComponent },
      {
        path: 'diario',
        canActivate: [fromGuards.PolizasGuard],
        component: fromContainers.PolizasComponent
      },
      {
        path: 'diario/:polizaId',
        canActivate: [fromGuards.PolizaExistsGuard],
        component: fromContainers.PolizaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolizasRoutingModule {}
