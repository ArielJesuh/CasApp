import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  regiones = new FormControl([]); 
  comunas = new FormControl([]); 
  regionesList: string[] = ['Región Metropolitana', 'V Región'];
  comunasList: string[] = ['Puente Alto', 'La Florida', 'Macul', 'las Condes'];
  habitaciones: number = 1;
  banos: number = 1;
  valorMinUF = 10;
  valorMaxUF = 1000;


  onToppingsSelectionChange(event: MatSelectChange) {
    this.comunas.setValue(event.value);
  }

  onRegionSelectionChange(event: MatSelectChange) {
    this.comunas.setValue(event.value);
  }
  
}