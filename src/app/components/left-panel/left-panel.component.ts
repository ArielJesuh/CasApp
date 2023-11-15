import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'left-panel-component',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit{
  opened = true;
  tipo: any;
  token:any;


ngOnInit(): void {
  this.isLoggedIn();
}
  isAdmin():boolean{
    this.tipo   = sessionStorage.getItem("tipo") ;
    if(this.tipo == 0){
      return true;
    } else {
      return false;
    }
  }

  isUser():boolean{
    this.tipo   = sessionStorage.getItem("tipo") ;
    if(this.tipo == 1){
      return true;
    } else {
      return false;
    }
  }

  isInmobiliaria():boolean{
    this.tipo   = sessionStorage.getItem("tipo") ;
    if(this.tipo == 2){
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn():boolean{
    this.token = localStorage.getItem("token");
    if(this.token != null){
      this.opened = true;
      return true;
    } else {
      this.opened = false;
      return false;
    }
  }
  }



