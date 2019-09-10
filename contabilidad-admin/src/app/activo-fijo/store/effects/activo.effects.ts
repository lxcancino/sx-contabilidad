import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from 'app/store';
import * as fromActions from '../actions/activo.actions';
import * as fromDepreciaciones from '../actions/depreciacion.actions';
import * as fromFiscal from '../actions/depreciacion-fiscal.actions';
import { ActivoActionTypes } from '../actions/activo.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { ActivoFijoService } from 'app/activo-fijo/services/activo-fijo.service';

@Injectable()
export class ActivoEffects {
  constructor(private actions$: Actions, private service: ActivoFijoService) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<fromActions.LoadActivos>(fromActions.ActivoActionTypes.LoadActivos),
    switchMap(per =>
      this.service.list().pipe(
        map(activos => new fromActions.LoadActivoSuccess({ activos })),
        catchError(response => of(new fromActions.LoadActivoFail({ response })))
      )
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType<fromActions.CreateActivo>(ActivoActionTypes.CreateActivo),
    map(action => action.payload.activo),
    switchMap(a =>
      this.service.save(a).pipe(
        map(activo => new fromActions.CreateActivoSuccess({ activo })),
        catchError(response =>
          of(new fromActions.CreateActivoFail({ response }))
        )
      )
    )
  );
  @Effect()
  createSuccess$ = this.actions$.pipe(
    ofType<fromActions.CreateActivoSuccess>(
      ActivoActionTypes.CreateActivoSuccess
    ),
    map(action => action.payload.activo),
    map(activo => new fromRoot.Go({ path: ['operaciones/activos', activo.id] }))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<fromActions.UpdateActivo>(ActivoActionTypes.UpdateActivo),
    map(action => action.payload.activo),
    switchMap(a =>
      this.service.update(a).pipe(
        map(activo => new fromActions.UpdateActivoSuccess({ activo })),
        catchError(response =>
          of(new fromActions.UpdateActivoFail({ response }))
        )
      )
    )
  );

  @Effect()
  loadDepreciaciones$ = this.actions$.pipe(
    ofType<fromDepreciaciones.LoadDepreciaciones>(
      fromDepreciaciones.DepreciacionActionTypes.LoadDepreciaciones
    ),
    map(action => action.payload.actovid),
    switchMap(activoId =>
      this.service.depreciaciones(activoId).pipe(
        map(
          depreciaciones =>
            new fromDepreciaciones.LoadDepreciacionesSuccess({ depreciaciones })
        ),
        catchError(response =>
          of(new fromDepreciaciones.LoadDepreciacionesFail({ response }))
        )
      )
    )
  );

  @Effect()
  createDepreciacion$ = this.actions$.pipe(
    ofType<fromDepreciaciones.CreateDepreciacion>(
      fromDepreciaciones.DepreciacionActionTypes.CreateDepreciacion
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service.createDepreciacion(payload.activoId, payload.corte).pipe(
        map(
          depreciacion =>
            new fromDepreciaciones.CreateDepreciacionSuccess({ depreciacion })
        ),
        catchError(response =>
          of(new fromDepreciaciones.CreateDepreciacionFail({ response }))
        )
      )
    )
  );

  @Effect()
  deleteDepreciacion$ = this.actions$.pipe(
    ofType<fromDepreciaciones.DeleteDepreciacion>(
      fromDepreciaciones.DepreciacionActionTypes.DeleteDepreciacion
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service
        .deleteDepreciacion(payload.activoId, payload.deperciacionId)
        .pipe(
          map(
            () =>
              new fromDepreciaciones.DeleteDepreciacionSuccess({
                deperciacionId: payload.deperciacionId
              })
          ),
          catchError(response =>
            of(new fromDepreciaciones.DeleteDepreciacionFail({ response }))
          )
        )
    )
  );

  /// Fiscal

  @Effect()
  loadDepreciacionesFiscales$ = this.actions$.pipe(
    ofType<fromFiscal.LoadDepreciacionesFiscales>(
      fromFiscal.DepreciacionFiscalActionTypes.LoadDepreciacionesFiscales
    ),
    map(action => action.payload.actovid),
    switchMap(activoId =>
      this.service.depreciacionesFiscales(activoId).pipe(
        map(
          depreciaciones =>
            new fromFiscal.LoadDepreciacionesFiscalesSuccess({ depreciaciones })
        ),
        catchError(response =>
          of(new fromFiscal.LoadDepreciacionesFiscalesFail({ response }))
        )
      )
    )
  );

  @Effect()
  createDepreciacionFiscal$ = this.actions$.pipe(
    ofType<fromFiscal.CreateDepreciacionFiscal>(
      fromFiscal.DepreciacionFiscalActionTypes.CreateDepreciacionFiscal
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service
        .createDepreciacionFiscal(payload.activoId, payload.depreciacion)
        .pipe(
          map(
            depreciacion =>
              new fromFiscal.CreateDepreciacionFiscalSuccess({ depreciacion })
          ),
          catchError(response =>
            of(new fromFiscal.CreateDepreciacionFiscalFail({ response }))
          )
        )
    )
  );

  @Effect()
  deleteDepreciacionFiscal$ = this.actions$.pipe(
    ofType<fromFiscal.DeleteDepreciacionFiscal>(
      fromFiscal.DepreciacionFiscalActionTypes.DeleteDepreciacionFiscal
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.service
        .deleteDepreciacionFiscal(payload.activoId, payload.deperciacionId)
        .pipe(
          map(
            () =>
              new fromFiscal.DeleteDepreciacionFiscalSuccess({
                deperciacionId: payload.deperciacionId
              })
          ),
          catchError(response =>
            of(new fromFiscal.DeleteDepreciacionFiscalFail({ response }))
          )
        )
    )
  );

  @Effect()
  generarPendientes$ = this.actions$.pipe(
    ofType<fromActions.GenerarPendientes>(ActivoActionTypes.GenerarPendientes),
    switchMap(payload =>
      this.service.generarPendientes().pipe(
        map(activos => new fromActions.GenerarPendientesSuccess({ activos })),
        catchError(response =>
          of(new fromActions.GenerarPendientesFail({ response }))
        )
      )
    )
  );

  @Effect()
  errorHandler$ = this.actions$.pipe(
    ofType<
      | fromActions.LoadActivoFail
      | fromActions.CreateActivoFail
      | fromActions.UpdateActivoFail
      | fromDepreciaciones.CreateDepreciacionFail
      | fromDepreciaciones.DeleteDepreciacionFail
      | fromFiscal.LoadDepreciacionesFiscalesFail
      | fromFiscal.CreateDepreciacionFiscalFail
      | fromFiscal.DeleteDepreciacionFiscalFail
      | fromActions.GenerarPendientesFail
    >(
      ActivoActionTypes.LoadActivosFail,
      ActivoActionTypes.CreateActivoFail,
      ActivoActionTypes.UpdateActivoFail,
      fromDepreciaciones.DepreciacionActionTypes.CreateDepreciacionFail,
      fromDepreciaciones.DepreciacionActionTypes.DeleteDepreciacionFail,
      fromFiscal.DepreciacionFiscalActionTypes.LoadDepreciacionesFiscalesFail,
      fromFiscal.DepreciacionFiscalActionTypes.CreateDepreciacionFiscalFail,
      fromFiscal.DepreciacionFiscalActionTypes.DeleteDepreciacionFiscalFail,
      ActivoActionTypes.GenerarPendientesFail
    ),
    map(action => action.payload.response),
    map(response => new fromRoot.GlobalHttpError({ response }))
  );
}
