import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { Periodo } from 'app/_core/models/periodo';
import { Auxiliar } from '../models/auxiliar';

@Injectable({ providedIn: 'root' })
export class AuxiliaresService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  auxiliar(
    cuentaInicial: number,
    cuentaFinal: number,
    periodo: Periodo
  ): Observable<Auxiliar[]> {
    const url = this.config.buildApiUrl('contabilidad/auxiliar');
    const params = new HttpParams()
      .set('fechaInicial', periodo.fechaInicial.toISOString())
      .set('fechaFinal', periodo.fechaFinal.toISOString())
      .set('cuentaInicial', cuentaInicial.toString())
      .set('cuentaFinal', cuentaFinal.toString());
    return this.http
      .get<Auxiliar[]>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  bancos(cuentaId: number, periodo: Periodo): Observable<Auxiliar[]> {
    const url = this.config.buildApiUrl('contabilidad/auxiliarBancos');
    const params = new HttpParams()
      .set('fechaInicial', periodo.fechaInicial.toISOString())
      .set('fechaFinal', periodo.fechaFinal.toISOString())
      .set('cuenta', cuentaId.toString());
    return this.http
      .get<Auxiliar[]>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/auxiliar');
    }
    return this._apiUrl;
  }
}
