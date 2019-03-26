import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MantenimientosPageComponent } from './components/mantenimientos-page/mantenimientos-page.component';

const routes: Routes = [
  {
    path: '',
    component: MantenimientosPageComponent,
    children: [
      { path: 'fichas', loadChildren: './fichas/fichas.module#FichasModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRoutingModule {}
