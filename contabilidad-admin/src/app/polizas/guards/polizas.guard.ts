import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class PolizasGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getCurrentPeriodoGrupo),
      tap(config => {
        this.store.dispatch(new fromStore.LoadPolizas({ filter: config }));
      }),
      switchMap(data => of(true)),
      catchError(() => of(false))
    );
    /*
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
    *
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getCurrentPeriodoGrupo),
      tap( config => {
        this.store.dispatch(new fromStore.LoadPolizas({filter: config}));
      }),
      switchMap( data => of(true))
    );
    /*
    return this.store.select(fromStore.getPolizasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCheques());
        }
      }),
      filter(loaded => loaded), // Waiting for loaded
      take(1) // End the stream
    );
  }
  */
  }
}
