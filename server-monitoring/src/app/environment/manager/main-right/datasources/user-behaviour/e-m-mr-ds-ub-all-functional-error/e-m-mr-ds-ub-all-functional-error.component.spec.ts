import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbAllFunctionalErrorComponent } from './e-m-mr-ds-ub-all-functional-error.component';

describe('EMMrDsUbAllFunctionalErrorComponent', () => {
  let component: EMMrDsUbAllFunctionalErrorComponent;
  let fixture: ComponentFixture<EMMrDsUbAllFunctionalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbAllFunctionalErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbAllFunctionalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
