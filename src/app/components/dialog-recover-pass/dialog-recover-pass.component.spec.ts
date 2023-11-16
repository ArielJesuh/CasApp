import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecoverPassComponent } from './dialog-recover-pass.component';

describe('DialogRecoverPassComponent', () => {
  let component: DialogRecoverPassComponent;
  let fixture: ComponentFixture<DialogRecoverPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRecoverPassComponent]
    });
    fixture = TestBed.createComponent(DialogRecoverPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
