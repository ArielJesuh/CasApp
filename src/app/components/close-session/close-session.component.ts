import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-close-session',
  templateUrl: './close-session.component.html',
  styleUrls: ['./close-session.component.css']
})
export class CloseSessionComponent {
  constructor(public dialogRef: MatDialogRef<CloseSessionComponent>,private toastr:ToastrService){

  }

  logOut():void{
    localStorage.clear();
    sessionStorage.clear();
    this.toastr.success('Sesión cerrada correctamente','LogOut')

  }
}
