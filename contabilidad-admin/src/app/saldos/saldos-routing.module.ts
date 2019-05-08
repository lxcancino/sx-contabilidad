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
        path: 'mayor/:saldoId',
        component: fromContainers.MovimientosPorCuentaComponent,
        canActivate: [fromGuards.SaldoExistsGuard]
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
