import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-close-session',
  templateUrl: './close-session.component.html',
  styleUrls: ['./close-session.component.css']
})
export class CloseSessionComponent {
  constructor(public dialogRef: MatDialogRef<CloseSessionComponent>){

  }

  logOut():void{
    localStorage.clear();
  }
}
