import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Vivienda } from 'src/app/interfaces/vivienda';
import { ModalMeInteresaService } from 'src/app/services/modal.me-interesa.service';
import { ViviendaService } from 'src/app/services/vivienda.service';

declare const google: any; 

@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent  implements OnInit{
  vivienda: Vivienda;
  viviendaId = 0; 
  mapa: any;
  @ViewChild('divMap') divMap!: ElementRef;

  constructor(private route: ActivatedRoute, private viviendaService: ViviendaService,public dialog: MatDialog, private renderer: Renderer2, private modalService: ModalMeInteresaService) {
    this.route.params.subscribe(params => {
      this.viviendaId = params['id'];
    });

    this.vivienda = {
      id: 0,
      direccion: '',
      cantidad_habitaciones: 0,
      cantidad_banos: 0,
      metros_cuadrados: 0,
      valor_uf: 0,
      descripcion: '',
      url_imagen: '',
      comuna_id_comuna: 0,
      inmobiliario_id_inmobiliario: 0,
      comuna: {
        id: 0,
        nombre_comuna: '',
        region_id_region: 0
      }
    }
  }
  
  ngOnInit(): void {
    // Asegúrate de que viviendaId tenga un valor antes de llamar al servicio
    if (this.viviendaId) {
      this.viviendaService.getViviendaID(this.viviendaId).subscribe(
        (data: Vivienda) => {
          // La respuesta del servicio, 'data', contiene los datos de la vivienda
          this.vivienda = data;
          this.initStreetView(this.vivienda);
          this.cargarMapa(this.vivienda);
        },
        error => {
          console.error('Error al obtener la vivienda por ID:', error);
        }
      );
    } else {
      console.error('ID de vivienda no definido');
    }
  }

  initStreetView(vivienda: Vivienda) {
    const geocoder = new google.maps.Geocoder();
    const address = vivienda.direccion + ',' + vivienda.comuna.nombre_comuna;
    debugger;
    geocoder.geocode({ address }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results && results.length > 0) {
        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById('street-view') as HTMLElement,
          {
            position: results[0].geometry.location,
            pov: { heading: 165, pitch: 0 },
            zoom: 1
          }
        );
  
        // No es necesario asignar directamente a la propiedad panorama
        // Solo necesitas proporcionar el objeto StreetViewPanorama al contenedor
      } else {
        console.error('Error al geocodificar la dirección:', status);
      }
    });
  }

  cargarMapa(vivienda: Vivienda): void {
    const geocoder = new google.maps.Geocoder();
    const address = vivienda.direccion + ',' + vivienda.comuna.nombre_comuna;

    geocoder.geocode({ address }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results[0]) {
        const opciones = {
          center: results[0].geometry.location,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);
        const customIcon = {
          url: 'assets/protalinmobiliario.png', 
          scaledSize: new google.maps.Size(100, 100)
        };

        // Agrega un marcador en la ubicación geocodificada
        const markerPosition = new google.maps.Marker({
          position: results[0].geometry.location,
          title: 'Ubicación de la vivienda',
          icon: customIcon
        });

        markerPosition.setMap(this.mapa);
      } else {
        console.error('Error al geocodificar la dirección:', status);
      }
    });
  }  

  abrirModal(): void {
    const parametro = this.vivienda.id;
    
    this.modalService.openModal(parametro ?? 0).subscribe(result => {
      console.log('Modal cerrado', result);
    });
  }
}