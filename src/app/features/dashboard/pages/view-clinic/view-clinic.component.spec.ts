import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClinicComponent } from './view-clinic.component';

describe('ViewClinicComponent', () => {
  let component: ViewClinicComponent;
  let fixture: ComponentFixture<ViewClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClinicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
