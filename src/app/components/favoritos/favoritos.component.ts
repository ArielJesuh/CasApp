import { Component, OnInit, Input } from '@angular/core';
import { Vivienda } from 'src/app/interfaces/vivienda';
import { ComparacionService } from 'src/app/services/comparacion.service';
import { FavoritaService } from 'src/app/services/favorita.service';
import { ViviendaService } from 'src/app/services/vivienda.service';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  @Input() viviendas: Vivienda[] = [];

  constructor(private viviendaService: ViviendaService, private favoritaService: FavoritaService, private comparacionService: ComparacionService) { }

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

  eliminarDeFavoritos(idVivienda: number) {
    var userId = sessionStorage.getItem("id") ?? '0';
    this.favoritaService.deleteFav(parseInt(userId, 10), idVivienda).subscribe(
      response => {
        // Lógica después de eliminar de favoritos
        console.log('Eliminado de favoritos:', response);
        // Actualizar la lista de viviendas después de eliminar
        this.cargarViviendasFavoritas();
        // Recargar la página
        location.reload();
      },
      error => {
        console.error('Error al eliminar de favoritos:', error);
      }
    );
  }

  compararVivienda(vivienda: Vivienda) {
    this.comparacionService.compararVivienda(vivienda);
  }
}
