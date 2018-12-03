import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TdMediaService } from '@covalent/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { Grupo } from 'app/polizas/store/reducers/ui-context.reducre';
import { EjercicioMes } from '../../../models/ejercicio-mes';

@Component({
  selector: 'sx-polizas-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polizas-page.component.html',
  styles: [
    `
      .document {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class PolizasPageComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'ingresos',
      title: 'Ingresos',
      description: 'Pólizas de ingreso',
      icon: 'attach_money'
    },
    {
      route: 'egresos',
      title: 'Egresos',
      description: 'Pólizas de egresos',
      icon: 'settings_backup_restore'
    },
    {
      route: 'diario',
      title: 'Diario',
      description: 'Pólizas de diario',
      icon: 'filter_none'
    }
  ];

  loading$: Observable<boolean>;
  grupos$: Observable<Grupo[]>;
  periodo$: Observable<EjercicioMes>;

  constructor(
    public media: TdMediaService,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.grupos$ = this.store.pipe(select(fromStore.getGrupos));
    this.periodo$ = this.store.pipe(select(fromStore.getPeriodoDePolizas));
  }

  onCambiarPeriodo(event: EjercicioMes) {
    console.log('Cambiando periodo: ', event);
  }
}
