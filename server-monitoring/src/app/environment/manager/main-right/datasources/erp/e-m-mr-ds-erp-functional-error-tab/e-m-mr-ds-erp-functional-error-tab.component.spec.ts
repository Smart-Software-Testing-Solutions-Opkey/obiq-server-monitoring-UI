import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsErpFunctionalErrorTabComponent } from './e-m-mr-ds-erp-functional-error-tab.component';

describe('EMMrDsErpFunctionalErrorTabComponent', () => {
  let component: EMMrDsErpFunctionalErrorTabComponent;
  let fixture: ComponentFixture<EMMrDsErpFunctionalErrorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsErpFunctionalErrorTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsErpFunctionalErrorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
