///<reference path="../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core'
import { FiltroService } from '../services/filtro.service'
import { Filtro } from '../interfaces/filtro';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../interfaces/vivienda';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  filtro: Filtro; 

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;

  regiones = new FormControl([]); 
  comunas = new FormControl([]); 
  regionesList: { id: number, nombre: string }[] = [
    { id: 7, nombre: 'Región Metropolitana' },
  ];
  
  comunasList: string[] = ['Puente Alto', 'La Florida', 'Macul', 'las Condes'];
  habitaciones: number = 1;
  banos: number = 1;
  valorMinUF = 10;
  valorMaxUF = 1000;

  viviendasList: Vivienda[] = [];

  onToppingsSelectionChange(event: MatSelectChange) {
    this.comunas.setValue(event.value);
  }

  onRegionSelectionChange(event: MatSelectChange) {
    this.comunas.setValue(event.value);
  }
  
  constructor(private renderer: Renderer2, private filtroService: FiltroService, private viviendaService: ViviendaService) {
    this.markers = [];
    
    this.filtro = {
      cantidad_habitaciones: 0,
      cantidad_banos: 0,
      min_valor: 0,
      max_valor: 0,
      comuna_id: 0,
      usuario_id: 0
    };

    this.formMapas = new FormGroup({

      busqueda: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl('')
    })
  }
  
  ngOnInit(): void {
    console.log(sessionStorage.getItem("id"))
    const userId = 1;
    this.filtroService.getFiltroByUsuario(userId).subscribe(
      (filtroData: any) => { 
        if (filtroData) {
          this.filtro = {
            cantidad_habitaciones: filtroData.cantidad_habitaciones,
            cantidad_banos: filtroData.cantidad_banos,
            max_valor: filtroData.max_valor,
            min_valor: filtroData.min_valor,
            comuna_id: filtroData.comuna_id,
            usuario_id: filtroData.usuario_id
          };
          console.log('Filtro del usuario:', this.filtro);
        } else {
          console.log('La respuesta del servidor es nula');
        }
      },
      (error) => {
        console.error('Error al obtener el filtro del usuario', error);
      }
    );

    this.getListViviendas()
  }
  
  getListViviendas(){
    this.viviendaService.getListViviendas().subscribe((data: Vivienda[]) => {
      this.viviendasList = data;
    }
  )}

  ngAfterViewInit(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        await this.cargarMapa(position);
        this.cargarAutocomplete();

      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }

  };

  onSubmit() {
    console.log("Datos del formulario: ", this.formMapas.value)
  };
  
  private cargarAutocomplete() {

    // const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), { })

    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry", "place_id"],
      types: ["address"],
    })


    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log("el place completo es:", place)

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });

      marker.setMap(this.mapa);
      this.llenarFormulario(place);
    })
  }

  llenarFormulario(place: any) {

    console.log(place)
    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name',

    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {

          return component[addressNameFormat[type]];
        }
      }
      return ' '
    };

    const componentForm = {
      direccion: 'location',
      ciudad: "administrative_area_level_3",
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1'
    };

    Object.entries(componentForm).forEach(entry => {
      const [key, value] = entry;

      this.formMapas.controls[key].setValue(getAddressComp(value))
    });

    this.formMapas.controls['direccion'].setValue(getAddressComp('route') + ' ' + getAddressComp('street_number'))
  };

  cargarMapa(position: any): void {
    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones);
  
    // Define el icono personalizado
    const customIcon = {
      url: 'assets/protalinmobiliario.png', 
      scaledSize: new google.maps.Size(100, 100)
    };
  
    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: 'Mi Ubicación',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: 'blue',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
      },
    });
  
    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  
    google.maps.event.addListener(this.mapa, 'click', (evento: google.maps.MapMouseEvent) => {
      const marker = new google.maps.Marker({
        position: evento.latLng,
        animation: google.maps.Animation.DROP,
        icon: customIcon 
      });
      marker.setDraggable(true);
      marker.setMap(this.mapa);
  
      google.maps.event.addListener(marker, 'click', (event) => {
        marker.setMap(null);
      });
    });
  }

}

