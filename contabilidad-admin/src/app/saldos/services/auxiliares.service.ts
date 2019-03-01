import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { SaldoPorCuentaContable } from '../models';
import { Update } from '@ngrx/entity';
import { EjercicioMes } from '../../models/ejercicio-mes';

@Injectable()
export class AuxiliaresService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  drillPeriodo(cuentaId: number, periodo: EjercicioMes): Observable<any> {
    const url = `${this.apiUrl}/drillPeriodo`;
    const params = new HttpParams()
      .set('ejercicio', periodo.ejercicio.toString())
      .set('mes', periodo.mes.toString())
      .set('cuenta', cuentaId.toString());
    return this.http
      .get<any[]>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  drillDia(cuentaId: number, fecha: string): Observable<any> {
    const url = `${this.apiUrl}/drillFecha`;
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('cuenta', cuentaId.toString());
    return this.http
      .get<any[]>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/saldos');
    }
    return this._apiUrl;
  }
}
