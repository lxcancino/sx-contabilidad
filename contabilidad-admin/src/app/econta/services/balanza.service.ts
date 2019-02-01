import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from 'app/utils/config.service';

import { Balanza } from '../models';

@Injectable()
export class BalanzaService {
  private _apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  list(max = 100, sort = 'dateCreated', order = 'desc'): Observable<Balanza[]> {
    const params = new HttpParams()
      .set('max', max.toString())
      .set('sort', sort)
      .set('order', order);
    return this.http
      .get<Balanza[]>(this.apiUrl, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  get(id: string): Observable<Balanza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Balanza>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  generar(ejercicio: number, mes: number): Observable<Balanza> {
    return this.http
      .post<Balanza>(this.apiUrl, { ejercicio, mes })
      .pipe(catchError((error: any) => throwError(error)));
  }

  delete(poliza: Balanza) {
    const url = `${this.apiUrl}/${poliza.id}`;
    return this.http
      .delete<Balanza>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  mostrarXml(catalogo: Partial<Balanza>) {
    const url = `${this.apiUrl}/mostrarXml/${catalogo.id}`;
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    this.http
      .get(url, {
        headers: headers,
        responseType: 'blob'
      })
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'text/xml'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }

  descargarXml(catalogo: Partial<Balanza>) {
    const url = `${this.apiUrl}/descargarXml/${catalogo.id}`;
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http
      .get(url, {
        headers: headers,
        responseType: 'blob'
        // observe: 'response'
      })
      .subscribe(response => {
        console.log('Response: ', response);

        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute('download', catalogo.fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      });
  }

  get apiUrl() {
    if (!this._apiUrl) {
      this._apiUrl = this.config.buildApiUrl('sat/balanza');
    }
    return this._apiUrl;
  }
}
