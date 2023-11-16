import { Component, OnInit, Input } from '@angular/core';
import { Vivienda } from 'src/app/interfaces/vivienda';
import { ViviendaService } from 'src/app/services/vivienda.service';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  @Input() viviendas: Vivienda[] = [];

  constructor(private viviendaService: ViviendaService) { }

  ngOnInit() {
    this.cargarViviendasFavoritas();
  }

  cargarViviendasFavoritas() {
    // Suponiendo que tienes el ID del usuario, reemplaza 'idUsuario' con el valor correcto
    var userId = sessionStorage.getItem("id") ?? '0';
    
    this.viviendaService.getViviendasFav(parseInt(userId, 10))
      .subscribe(
        (viviendas: Vivienda[]) => {
          this.viviendas = viviendas;
        },
        (error) => {
          console.error('Error al cargar las viviendas favoritas:', error);
        }
      );
  }
}
