import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.SaldosPageComponent,
    children: [
      {
        path: 'mayor',
        canActivate: [fromGuards.SaldosGuard],
        component: fromContainers.SaldosComponent
      },
      {
        path: 'mayor/:id',
        component: fromContainers.SaldoDrillDownComponent,
        resolve: { saldo: fromGuards.SaldoResolver }
      },
      {
        path: 'auxiliar',
        component: fromContainers.AuxiliarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaldosRoutingModule {}
