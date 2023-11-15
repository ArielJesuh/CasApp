import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVivComponent } from './admin-viv.component';

describe('AdminVivComponent', () => {
  let component: AdminVivComponent;
  let fixture: ComponentFixture<AdminVivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVivComponent]
    });
    fixture = TestBed.createComponent(AdminVivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
