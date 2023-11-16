import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarViviendasComponent } from './gestionar-viviendas.component';

describe('GestionarViviendasComponent', () => {
  let component: GestionarViviendasComponent;
  let fixture: ComponentFixture<GestionarViviendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarViviendasComponent]
    });
    fixture = TestBed.createComponent(GestionarViviendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
