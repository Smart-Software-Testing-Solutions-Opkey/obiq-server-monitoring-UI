import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbApiErrorTabComponent } from './e-m-mr-ds-ub-api-error-tab.component';

describe('EMMrDsUbApiErrorTabComponent', () => {
  let component: EMMrDsUbApiErrorTabComponent;
  let fixture: ComponentFixture<EMMrDsUbApiErrorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbApiErrorTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbApiErrorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
