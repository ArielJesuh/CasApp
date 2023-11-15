import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Vivienda } from '../interfaces/vivienda';

@Injectable({
  providedIn: 'root',
})
export class ViviendaService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http: HttpClient) {
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='api/viviendas'
  }

  getViviendaID(id:any){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  getListViviendas(): Observable<Vivienda[]> {
    return this.http.get<Vivienda[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  
  deleteVivienda(id:number):Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

}
