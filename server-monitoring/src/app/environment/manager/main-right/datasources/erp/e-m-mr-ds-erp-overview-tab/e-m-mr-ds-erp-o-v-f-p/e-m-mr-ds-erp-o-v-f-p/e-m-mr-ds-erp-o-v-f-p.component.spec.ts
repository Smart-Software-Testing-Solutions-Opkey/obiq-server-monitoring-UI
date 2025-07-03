import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsErpOVFPComponent } from './e-m-mr-ds-erp-o-v-f-p.component';

describe('EMMrDsErpOVFPComponent', () => {
  let component: EMMrDsErpOVFPComponent;
  let fixture: ComponentFixture<EMMrDsErpOVFPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsErpOVFPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsErpOVFPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
