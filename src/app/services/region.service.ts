import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http: HttpClient) {
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='api/regiones'
  }

  getRegionID(id:any){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  getListRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
