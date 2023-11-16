import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraCompararComponent } from './barra-comparar.component';

describe('BarraCompararComponent', () => {
  let component: BarraCompararComponent;
  let fixture: ComponentFixture<BarraCompararComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraCompararComponent]
    });
    fixture = TestBed.createComponent(BarraCompararComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
