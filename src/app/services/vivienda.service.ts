import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Vivienda } from '../interfaces/vivienda';
import { Inmobiliario } from '../interfaces/inmobiliario';

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
    return this.http.get<Vivienda>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  
  getViviendaInmo(id:any){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/inmo/${id}`)
  }

  getViviendasFav(id:number):Observable<Vivienda[]>{
    return this.http.get<Vivienda[]>(`${this.myAppUrl}${this.myApiUrl}/favs/${id}`)
  }

  getInmobiliario(id:number){
    return this.http.get<Inmobiliario>(`${this.myAppUrl}${this.myApiUrl}/inmo/${id}`)
  }

  getListViviendas(): Observable<Vivienda[]> {
    return this.http.get<Vivienda[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  
  deleteVivienda(id:number):Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }


  register(vivienda:Vivienda):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,vivienda)
  }

  update(id:number,vivienda:Vivienda):Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`,vivienda)
  }

}
