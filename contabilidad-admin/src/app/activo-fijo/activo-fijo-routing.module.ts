import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivosGuard } from './guards/activos.guard';
import { ActivosComponent } from './pages';

const routes: Routes = [{ path: '', component: ActivosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivoFijoRoutingModule {}
