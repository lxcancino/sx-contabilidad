import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivosGuard } from './guards/activos.guard';
import {
  ActivosComponent,
  ActivoCreateComponent,
  ActivoEditComponent,
  PorMesComponent
} from './pages';
import { ActivoExistsGuard } from './guards/activo-exists.guard';

const routes: Routes = [
  { path: '', canActivate: [ActivosGuard], component: ActivosComponent },
  { path: 'create', component: ActivoCreateComponent },
  { path: 'mensual', component: PorMesComponent },
  {
    path: ':activoId',
    canActivate: [ActivoExistsGuard],
    component: ActivoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivoFijoRoutingModule {}
