import { Component, OnInit, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { TdDialogService } from '@covalent/core';

import * as _ from 'lodash';
import { Inpc } from 'app/inpc/models/inpc';
import { InpcModalComponent } from '../inpc-modal/inpc-modal.component';

@Component({
  selector: 'sx-inpcs',
  templateUrl: './inpcs.component.html',
  styleUrls: ['./inpcs.component.scss']
})
export class InpcsComponent implements OnInit {
  inpcs$: Observable<Inpc[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.selectInpcLoading));
    this.inpcs$ = this.store.pipe(select(fromStore.selectInpc));
    this.reload();
  }

  reload() {
    this.store.dispatch(new fromStore.LoadInpcs());
  }

  onCreate() {}

  onSelect(event: Inpc) {
    this.dialog
      .open(InpcModalComponent, {
        data: { inpc: event }
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          console.log('Edit: ', res);
        }
      });
  }

  onDelete(event: Inpc) {}

  @HostListener('document:keydown.meta.i', ['$event'])
  onHotKeyInsert(event) {
    this.onCreate();
  }

  @HostListener('document:keydown.insert', ['$event'])
  onHotKeyInsert2(event) {
    this.onCreate();
  }
}
