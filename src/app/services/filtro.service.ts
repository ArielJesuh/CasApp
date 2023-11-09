import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Filtro } from '../interfaces/filtro';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http: HttpClient) {
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='api/filtros'
  }

  getFiltroByUsuario(userId: number) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${userId}`);
  }

  deleteFiltro(id:number):Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  createFiltro(filtro:Filtro):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,filtro)
  }
}
