import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    // canActivate: [fromGuards.SaldosGuard],
    component: fromContainers.SaldosPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'mayor'
      },
      {
        path: 'mayor',
        canActivate: [fromGuards.SaldosGuard],
        component: fromContainers.SaldosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaldosRoutingModule {}
