import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comuna } from '../interfaces/comuna';

@Injectable({
  providedIn: 'root',
})
export class ComunaService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http: HttpClient) {
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='api/comunas'
  }

  getComunaID(id:any){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  getListComunas(): Observable<Comuna[]> {
    return this.http.get<Comuna[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
