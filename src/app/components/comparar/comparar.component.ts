import { Component } from '@angular/core';
import { Vivienda } from 'src/app/interfaces/vivienda';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: ['./comparar.component.css']
})
export class CompararComponent {
  vivienda1: Vivienda | null;
  vivienda2: Vivienda | null;

constructor(private route: ActivatedRoute, private router: Router) {
  this.vivienda1 = null;
  this.vivienda2 = null;
}

ngOnInit() {
  const state = this.route.snapshot.paramMap.get('state');
  if (state) {
    const parsedState = JSON.parse(state);
    this.vivienda1 = parsedState.vivienda1;
    this.vivienda2 = parsedState.vivienda2;
  }
}

quitarVivienda1() {
  this.vivienda1 = null;
}
quitarVivienda2() {
  this.vivienda2 = null;
}

}