import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';
import { CostoPromedio } from '../models';

@Injectable()
export class CostoPromedioService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('costos');
  }

  list(periodo: {
    ejercicio: number;
    mes: number;
  }): Observable<CostoPromedio[]> {
    const url = `${this.apiUrl}/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .get<CostoPromedio[]>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generarCalculo(periodo: {
    ejercicio: number;
    mes: number;
  }): Observable<CostoPromedio[]> {
    const url = `${this.apiUrl}/calcular/${periodo.ejercicio}/${periodo.mes}`;
    return this.http
      .post<CostoPromedio[]>(url, {})
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<CostoPromedio> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<CostoPromedio>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
