import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http:HttpClient) { 
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='api/usuarios'
  }

  getListUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  register(user:Usuario):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,user)
  }

  update(id:number,user:Usuario):Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`,user)
  }

  login(user:Usuario):Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`,user)
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  getUserID(id:any){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
}
