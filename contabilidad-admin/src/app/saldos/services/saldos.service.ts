import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { SaldoPorCuentaContable } from '../models';
import { Update } from '@ngrx/entity';
import { EjercicioMes } from '../../models/ejercicio-mes';

@Injectable()
export class SaldosService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: EjercicioMes): Observable<SaldoPorCuentaContable[]> {
    const params = new HttpParams()
      .set('ejercicio', filter.ejercicio.toString())
      .set('mes', filter.mes.toString())
      .set('sort', 'clave')
      .set('order', 'asc');
    return this.http
      .get<SaldoPorCuentaContable[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<SaldoPorCuentaContable> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<SaldoPorCuentaContable>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  actualizar(periodo: EjercicioMes): Observable<SaldoPorCuentaContable[]> {
    const url = `${this.apiUrl}/actualizar/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .put<SaldoPorCuentaContable[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/saldos');
    }
    return this._apiUrl;
  }
}
