///<reference path="../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core'
import { FiltroService } from '../services/filtro.service'
import { Filtro } from '../interfaces/filtro';
import { ViviendaService } from '../services/vivienda.service';
import { Vivienda } from '../interfaces/vivienda';
import { ComunaService } from '../services/comuna.service';
import { Comuna } from '../interfaces/comuna';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ComparacionService } from '../services/comparacion.service';
import { Region } from '../interfaces/region';
import { RegionService } from '../services/region.service';
import { FavoritaService } from '../services/favorita.service';
import { Favorita } from '../interfaces/favorita';

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

  
  habitaciones: number = 1;
  banos: number = 1;
  valorMinUF = 10;
  valorMaxUF = 1000;

  viviendasList: Vivienda[] = [];
  comunasList: Comuna[] = [];
  addressList: string[] = [];
  regionesList: Region [] = [];
  selectDeshabilitado: boolean = true;
  regionSeleccionada: number;  

  constructor(private renderer: Renderer2, private filtroService: FiltroService, private viviendaService: ViviendaService, private comunaService: ComunaService,  private toastr:ToastrService, private router: Router, private comparacionService: ComparacionService, private regionService: RegionService, private favService: FavoritaService) {
    this.markers = [];
    this.regionSeleccionada = 0 ;
    this.filtro = {
      cantidad_habitaciones: 0,
      cantidad_banos: 0,
      min_valor: 0,
      max_valor: 0,
      comuna_id_comuna: 0,
      usuario_id_usuario: 0
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
    this.getListViviendas();
    var userId = sessionStorage.getItem("id") ?? '0';
    this.filtro.usuario_id_usuario = parseInt(userId, 10);
    this.filtroService.getFiltroByUsuario(this.filtro.usuario_id_usuario).subscribe(
      (filtroData: any) => { 
        if (filtroData) {
          this.filtro = {
            id: filtroData.id,
            cantidad_habitaciones: filtroData.cantidad_habitaciones,
            cantidad_banos: filtroData.cantidad_banos,
            max_valor: filtroData.max_valor,
            min_valor: filtroData.min_valor,
            comuna_id_comuna: filtroData.comuna_id_comuna,
            usuario_id_usuario: filtroData.usuario_id_usuario
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
    
    this.getListViviendas();
    this.getListRegiones();
  }
  
  //FILTRO
  getListViviendas(){
    this.viviendaService.getListViviendas().subscribe((data: Vivienda[]) => {
      this.viviendasList = data;
    }
  )}
  
  getListRegiones(){
    this.regionService.getListRegiones().subscribe((data: Region[]) => {
      this.regionesList = data;
    }
  )}

  onToppingsSelectionChange(event: MatSelectChange) {
    this.comunas.setValue(event.value);
  }

  onRegionSelectionChange(event: MatSelectChange) {
    const idRegion = this.regionSeleccionada;

    // Llama a getListComunas con el ID de la región
    this.comunaService.getListComunas(idRegion).subscribe((data: Comuna[]) => {
      this.comunasList = data;
    });

    this.selectDeshabilitado = false;
  }
  
  

  guardarFiltro() {
    if(this.filtro.comuna_id_comuna == 0){
      this.filtro.comuna_id_comuna = undefined;
    }
    this.filtroService.createFiltro(this.filtro).subscribe(
      (respuesta) => {
        this.toastr.success('Filtro guardado','Registrado')
        this.filtroService.getFiltroByUsuario(this.filtro.usuario_id_usuario).subscribe(
          (filtroData: any) => { 
            if (filtroData) {
              this.filtro = {
                id: filtroData.id,
                cantidad_habitaciones: filtroData.cantidad_habitaciones,
                cantidad_banos: filtroData.cantidad_banos,
                max_valor: filtroData.max_valor,
                min_valor: filtroData.min_valor,
                comuna_id_comuna: filtroData.comuna_id_comuna,
                usuario_id_usuario: filtroData.usuario_id_usuario
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
      },
      (error) => {
        this.toastr.error('Error al guardar el filtro','Error')
      }
    );
  }

  borrarFiltro() {
    var filtroId = this.filtro.id ?? 0;
    this.filtro = {
      id: undefined,
      cantidad_habitaciones: 0,
      cantidad_banos: 0,
      max_valor: 0,
      min_valor: 0,
      comuna_id_comuna: undefined,
      usuario_id_usuario: this.filtro.usuario_id_usuario
    };
    this.filtroService.deleteFiltro(filtroId).subscribe(
      (respuesta) => {
        this.toastr.success('Filtro Eliminado','Registrado')
      },
      (error) => {
      }
    );
  }

  //MAPA
  ngAfterViewInit(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {
        await this.cargarMapa(position);
      }, null, opciones);
    } else {
      console.log("navegador no compatible")
    }
  };

  onSubmit() {
    console.log("Datos del formulario: ", this.formMapas.value)
  };
  
  cargarMapa(position: any): void {
    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones);
    this.mapa.setZoom(14);
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
    this.mapearViviendas();
  }

  addMarker(vivienda: Vivienda) {

    const customIcon = {
      url: 'assets/protalinmobiliario.png', 
      scaledSize: new google.maps.Size(100, 100)
    };
    const geocoder = new google.maps.Geocoder();
    var address = vivienda.direccion +','+ vivienda.comuna.nombre_comuna;
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const marker = new google.maps.Marker({
          map: this.mapa,
          position: results[0].geometry.location,
          title: address,
          icon: customIcon,
          label: {
            text: vivienda.valor_uf + 'UF',
            color: 'black',
            fontWeight: 'bold'
          },
        });

      // Crear una infowindow con contenido personalizado
      const infowindow = new google.maps.InfoWindow({
        content: `
        <div style="width: 200px; height: 320px; background-color: white;">
          <img class="card-img-top" src="${vivienda.url_imagen}" alt="" width="100%" height= "100px;">
          <div style="text-align: center;">
            <h3>${vivienda.direccion}</h3>
            <p>${vivienda.comuna.nombre_comuna}</p>
            <p>${vivienda.cantidad_habitaciones} Habitaciones</p>
            <p>${vivienda.cantidad_banos} Baños</p>
            <button style="margin-left: 5%;" class="btn btn-dark" id="verMasButton">Ver Más</button>
            <button style="margin-left: 5%; margin-top: 2%" class="btn btn-primary" id="compararViviendaButton">Comparar</button>
            <button style="margin-left: 10px;" class="btn btn-danger" id="addFavButton">Agregar a Favorita</button>
          </div>
        </div>
        `,
      });

      marker.addListener('mouseover', () => {
        infowindow.open(this.mapa, marker);
    
        // Agrega el evento de clic después de abrir el InfoWindow
        const button = document.getElementById('verMasButton');
        if (button) {
          button.addEventListener('click', () => this.verMas(vivienda.id ?? 0));
        }
        const button2 = document.getElementById('compararViviendaButton');
        if (button2) {
          button2.addEventListener('click', () => this.compararVivienda(vivienda ?? null));
        }
        const button3 = document.getElementById('addFavButton');
        if (button3) {
          button3.addEventListener('click', () => this.favoritaVivienda(vivienda.id ?? 0));
        }
        

      });

      
      marker.addListener('mouseout', () => {
        setTimeout(() => {
          infowindow.close();
        }, 6000); 
      });
      

        this.markers.push(marker);
      } else {
        console.error('Geocoding failed for address: ' + address);
      }
    });
  }

  mapearViviendas(){
    this.viviendasList.forEach(vivienda => this.addMarker(vivienda));
  }

  verMas(viviendaId: number): void {
    this.router.navigate(['/vivienda', viviendaId]);
  }
  
  compararVivienda(vivienda: Vivienda) {
    this.comparacionService.compararVivienda(vivienda);
  }

  favoritaVivienda(viviendaId: number) {
    var userId = sessionStorage.getItem("id") ?? '0';

    const nuevaFavorita: Favorita = {
      usuario_id_usuario: parseInt(userId, 10),
      vivienda_id_vivienda: viviendaId,
    };

    this.favService.register(nuevaFavorita).subscribe(
      (response) => {
        console.log('Vivienda agregada a favoritas:', response);
        // Puedes agregar lógica adicional después de agregar a favoritas si es necesario
      },
      (error) => {
        console.error('Error al agregar vivienda a favoritas:', error);
      }
    );
  }

}

