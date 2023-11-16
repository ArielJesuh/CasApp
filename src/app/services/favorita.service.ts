import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comuna } from '../interfaces/comuna';
import { Favorita } from '../interfaces/favorita';

@Injectable({
  providedIn: 'root',
})
export class FavoritaService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http: HttpClient) {
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='api/favoritas'
  }

  register(fav:Favorita):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,fav)
  }

  deleteFav(idUser: number, idVivienda: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${idUser}/${idVivienda}`);
  }
  
}
