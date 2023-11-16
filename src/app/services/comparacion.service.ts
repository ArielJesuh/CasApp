import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vivienda } from '../interfaces/vivienda';

@Injectable({
  providedIn: 'root',
})

export class ComparacionService {
  private viviendaSource = new BehaviorSubject<Vivienda | null>(null);
  viviendaActual = this.viviendaSource.asObservable();

  compararVivienda(vivienda: Vivienda) {
    this.viviendaSource.next(vivienda);
  }
}
