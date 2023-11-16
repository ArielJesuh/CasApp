import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inmobiliario } from 'src/app/interfaces/Inmobiliario';

@Component({
  selector: 'app-modal-me-interesa',
  templateUrl: './modal-me-interesa.component.html',
  styleUrls: ['./modal-me-interesa.component.css']
})
export class ModalMeInteresaComponent {
  inmobiliario: Inmobiliario;

  constructor(
    public dialogRef: MatDialogRef<ModalMeInteresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inmobiliario = data.inmobiliario;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
