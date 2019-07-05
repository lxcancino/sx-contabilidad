import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { EjercicioMes } from '../../models/ejercicio-mes';
import { Diot } from '../models';

@Injectable({ providedIn: 'root' })
export class DiotService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(filter: EjercicioMes): Observable<Diot[]> {
    const params = new HttpParams()
      .set('ejercicio', filter.ejercicio.toString())
      .set('mes', filter.mes.toString())
      .set('sort', 'clave')
      .set('order', 'asc');
    return this.http
      .get<Diot[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('contabilidad/diot');
    }
    return this._apiUrl;
  }
}
