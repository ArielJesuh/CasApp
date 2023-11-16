import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMeInteresaComponent } from './modal-me-interesa.component';

describe('ModalMeInteresaComponent', () => {
  let component: ModalMeInteresaComponent;
  let fixture: ComponentFixture<ModalMeInteresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMeInteresaComponent]
    });
    fixture = TestBed.createComponent(ModalMeInteresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
