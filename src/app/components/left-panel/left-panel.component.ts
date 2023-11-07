import { Component } from '@angular/core';

@Component({
  selector: 'left-panel-component',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent {
  opened = true;
  tipo: any;

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
  }



