import { Component, OnInit } from '@angular/core';
import { Vivienda } from 'src/app/interfaces/vivienda';
import { ComparacionService } from 'src/app/services/comparacion.service';

@Component({
  selector: 'app-barra-comparar',
  templateUrl: './barra-comparar.component.html',
  styleUrls: ['./barra-comparar.component.css']
})
export class BarraCompararComponent implements OnInit {
  vivienda1: Vivienda | null;
  vivienda2: Vivienda | null;
  isSidebarVisible = true;
  originalButtonRight: number;

  constructor(private comparacionService: ComparacionService) {
    this.vivienda1 = null;
    this.vivienda2 = null;
    this.originalButtonRight = window.innerWidth - 1900; 
  }

  ngOnInit() {
    this.comparacionService.viviendaActual.subscribe((vivienda) => {
      if(this.vivienda1 != null && vivienda?.id != this.vivienda1?.id){
        this.vivienda2 = vivienda;
      }else if (this.vivienda1 == null && vivienda?.id != this.vivienda2?.id){
        this.vivienda1 = vivienda;
      }
      
    });
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    const buttonRight = this.isSidebarVisible ? 320 : this.originalButtonRight;
    document.documentElement.style.setProperty('--button-right', buttonRight + 'px');
  }
  quitarVivienda1() {
    this.vivienda1 = null;
  }
  quitarVivienda2() {
    this.vivienda2 = null;
  }
}
