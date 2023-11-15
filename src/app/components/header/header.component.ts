import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CloseSessionComponent} from '../close-session/close-session.component'
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  token:any;
  constructor(private dialog: MatDialog){    
  }

  openDialog():void{
    const dialogRef = this.dialog.open(CloseSessionComponent, {
      width:'300px',
    });
  }

  openLogin():void{
    const dialogRef = this.dialog.open(LoginComponent,{
      width:'350px',
      height:'350px',
    });
  }

  openRegister():void{
    const dialogRef = this.dialog.open(RegisterComponent,{
      width:'450px',
      height:'750px',
    });    

  }

  isLoggedIn():boolean{
    this.token = localStorage.getItem("token");
    if(this.token != null){
      return true;
    } else {
      return false;
    }
  }

  isDisconnected():boolean{
    this.token = localStorage.getItem("token");
    if(this.token != null){
      return false;
    } else {
      return true;
    }
  }
 
 
 
}
