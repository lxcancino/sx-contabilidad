import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { ActivoFijo } from '../models/activo-fijo';

@Injectable({ providedIn: 'root' })
export class ActivoFijoService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(): Observable<ActivoFijo[]> {
    return this.http
      .get<ActivoFijo[]>(this.apiUrl)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<ActivoFijo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<ActivoFijo>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('activoFijo');
    }
    return this._apiUrl;
  }
}
