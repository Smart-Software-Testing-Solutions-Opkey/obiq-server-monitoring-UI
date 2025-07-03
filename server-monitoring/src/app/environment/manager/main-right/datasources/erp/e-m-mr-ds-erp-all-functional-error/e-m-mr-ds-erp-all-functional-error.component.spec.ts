import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsErpAllFunctionalErrorComponent } from './e-m-mr-ds-erp-all-functional-error.component';

describe('EMMrDsErpAllFunctionalErrorComponent', () => {
  let component: EMMrDsErpAllFunctionalErrorComponent;
  let fixture: ComponentFixture<EMMrDsErpAllFunctionalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsErpAllFunctionalErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsErpAllFunctionalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
