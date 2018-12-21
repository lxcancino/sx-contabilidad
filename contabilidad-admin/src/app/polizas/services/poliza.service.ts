import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { Poliza, PolizasFilter } from '../models';
import { Update } from '@ngrx/entity';

@Injectable()
export class PolizaService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: PolizasFilter): Observable<Poliza[]> {
    const params = new HttpParams()
      .set('ejercicio', filter.ejercicio.toString())
      .set('mes', filter.mes.toString())
      .set('tipo', filter.tipo.toString())
      .set('subtipo', filter.subtipo.toString())
      .set('sort', 'folio')
      .set('order', 'asc');
    /*
    if (filter.tipo) {
      params = params.set('tipo', filter.tipo.toString());
    }
    if (filter.subtipo) {
      params = params.set('subtipo', filter.subtipo.toString());
    }
    */
    return this.http
      .get<Poliza[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<Poliza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Poliza>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  save(poliza: Partial<Poliza>): Observable<Poliza> {
    return this.http
      .post<Poliza>(this.apiUrl, poliza)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generarPolizasEgreso(command: PolizasFilter): Observable<Poliza[]> {
    const url = `${this.apiUrl}/generarPolizasEgreso`;
    return this.http
      .post<Poliza[]>(url, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(poliza: Poliza) {
    const url = `${this.apiUrl}/${poliza.id}`;
    return this.http
      .delete<Poliza>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update(update: Update<Poliza>): Observable<Poliza> {
    const url = `${this.apiUrl}/${update.id}`;
    return this.http
      .put<Poliza>(url, update.changes)
      .pipe(catchError((error: any) => throwError(error)));
  }

  recalcular(polizaId: number): Observable<Poliza> {
    const url = `${this.apiUrl}/recalcular/${polizaId}`;
    return this.http
      .put<Poliza>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/polizas');
    }
    return this._apiUrl;
  }
}