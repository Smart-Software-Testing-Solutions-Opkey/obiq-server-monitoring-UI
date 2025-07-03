import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbAllApiErrorComponent } from './e-m-mr-ds-ub-all-api-error.component';

describe('EMMrDsUbAllApiErrorComponent', () => {
  let component: EMMrDsUbAllApiErrorComponent;
  let fixture: ComponentFixture<EMMrDsUbAllApiErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbAllApiErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbAllApiErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
