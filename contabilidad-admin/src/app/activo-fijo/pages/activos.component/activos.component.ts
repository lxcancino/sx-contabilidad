import { Component, OnInit, HostListener } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { ActivoFijo } from 'app/activo-fijo/models/activo-fijo';
import { MatDialog } from '@angular/material';
import { CreateActivoModalComponent } from 'app/activo-fijo/components';

@Component({
  selector: 'sx-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.scss']
})
export class ActivosComponent implements OnInit {
  activos$: Observable<ActivoFijo[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectActivosLoading));
    this.activos$ = this.store.pipe(select(fromStore.selectActivos));
  }

  onCreate() {
    this.dialog
      .open(CreateActivoModalComponent, {
        data: {},
        width: '650px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Alta de activo: ', res);
        }
      });
  }

  onSelect(event: ActivoFijo) {
    this.store.dispatch(new fromRoot.Go({ path: ['activos', event.id] }));
  }

  reload() {
    this.store.dispatch(new fromStore.LoadActivos());
  }

  @HostListener('document:keydown.meta.i', ['$event'])
  onHotKeyInsert(event) {
    this.onCreate();
  }

  @HostListener('document:keydown.insert', ['$event'])
  onHotKeyInsert2(event) {
    this.onCreate();
  }
}
