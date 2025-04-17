import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClinicComponent } from './form-clinic.component';

describe('FormClinicComponent', () => {
  let component: FormClinicComponent;
  let fixture: ComponentFixture<FormClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormClinicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
