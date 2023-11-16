import { Component, OnInit, ViewChild } from '@angular/core';
import { ViviendaComponent } from '../vivienda/vivienda.component';
import { ViviendaService } from 'src/app/services/vivienda.service';
import { Vivienda } from 'src/app/interfaces/vivienda';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(ViviendaComponent) vivienda!:ViviendaComponent;
  viviendasList: Vivienda[] = [];
  viviendasListFix : Vivienda[] = [];
  token:any;
  largoLista :any;
  constructor(private viviendaService: ViviendaService){
    
  }
  
  ngOnInit(): void {
    this.getListViviendas()


  }


  getListViviendas(){
    this.viviendaService.getListViviendas().subscribe((data: Vivienda[]) => {
      this.viviendasList = data;
    }
  )
  this.viviendasListFix = this.viviendasList.slice(0,3)

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
