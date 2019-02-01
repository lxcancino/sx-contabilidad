import { Injectable } from '@angular/core';

import * as fromRoot from 'app/store';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/catalogos.actions';
import { CatalogosActionTypes } from '../actions/catalogos.actions';

import * as fromServices from '../../services';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class CatalogosEffects {
  constructor(
    private actions$: Actions,
    private service: fromServices.CatalogoService,
    public snackBar: MatSnackBar
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(CatalogosActionTypes.LoadCatalogos),
    switchMap(filter =>
      this.service.list().pipe(
        map(catalogos => new fromActions.LoadCatalogosSuccess({ catalogos })),
        catchError(error =>
          of(new fromActions.LoadCatalogosFail({ response: error }))
        )
      )
    )
  );

  @Effect()
  generar$ = this.actions$.pipe(
    ofType<fromActions.GenerarCatalogo>(CatalogosActionTypes.GenerarCatalogo),
    map(action => action.payload),
    switchMap(periodo =>
      this.service.generar(periodo.ejercicio, periodo.mes).pipe(
        map(catalogo => new fromActions.GenerarCatalogoSuccess({ catalogo })),
        catchError(response =>
          of(new fromActions.GenerarCatalogoFail({ response }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  mostrarXml$ = this.actions$.pipe(
    ofType<fromActions.MostrarCatalogoXml>(
      CatalogosActionTypes.MostrarCatalogoXml
    ),
    map(action => action.payload.catalogo),
    tap(catalogo => this.service.mostrarXml(catalogo))
  );

  @Effect({ dispatch: false })
  descargarXml$ = this.actions$.pipe(
    ofType<fromActions.DescargarCatalogoXml>(
      CatalogosActionTypes.DescargarCatalogoXml
    ),
    map(action => action.payload.catalogo),
    tap(catalogo => this.service.descargarXml(catalogo))
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<fromActions.LoadCatalogosFail>(
      CatalogosActionTypes.LoadCatalogosFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
