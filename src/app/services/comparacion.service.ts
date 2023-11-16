import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vivienda } from '../interfaces/vivienda';

@Injectable({
  providedIn: 'root',
})

export class ComparacionService {
  private viviendaSource = new BehaviorSubject<Vivienda | null>(null);
  private viviendaSource2 = new BehaviorSubject<Vivienda | null>(null);
  private viviendaSource3 = new BehaviorSubject<Vivienda | null>(null);
  viviendaActual = this.viviendaSource.asObservable();
  viviendaActual2 = this.viviendaSource2.asObservable();
  viviendaActual3 = this.viviendaSource3.asObservable();

  compararVivienda(vivienda: Vivienda) {
    this.viviendaSource.next(vivienda);
  }
  compararViviendas(vivienda1: Vivienda, vivienda2: Vivienda) {
    this.viviendaSource2.next(vivienda1);
    this.viviendaSource3.next(vivienda2);
  }
  
}
