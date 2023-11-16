import { Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-me-interesa',
  templateUrl: './modal-me-interesa.component.html',
  styleUrls: ['./modal-me-interesa.component.css']
})
export class ModalMeInteresaComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ModalMeInteresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
