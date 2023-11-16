import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-modal-me-interesa',
  templateUrl: './modal-me-interesa.component.html',
  styleUrls: ['./modal-me-interesa.component.css']
})
export class ModalMeInteresaComponent {
  usuario: Usuario;
  nombre: string;
  contenidoCorreo: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalMeInteresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usuario = data.usuario;
    this.nombre = data.nombre;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  generarEnlaceGmail(): string {
    const destinoCorreo = encodeURIComponent(this.usuario.email);
    const asunto = encodeURIComponent('Consulta sobre propiedad');
    const cuerpo = encodeURIComponent(this.contenidoCorreo);

    return `https://mail.google.com/mail/?view=cm&to=${destinoCorreo}&su=${asunto}&body=${cuerpo}`;
  }
}
