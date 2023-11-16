import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comuna } from '../interfaces/comuna';
import { MatDialog } from '@angular/material/dialog';
import { ModalMeInteresaComponent } from '../components/modal-me-interesa/modal-me-interesa.component';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class ModalMeInteresaService {
  private myAppUrl: string;
  private myApiUrl:string;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='api/comunas'
  }

  openModal(usuario: Usuario, nombre: string): Observable<any> {
    const dialogRef = this.dialog.open(ModalMeInteresaComponent, {
      width: '700px',
      height: '500px',
      data: { usuario: usuario, nombre: nombre }
    });
    return dialogRef.afterClosed();
  }

}
