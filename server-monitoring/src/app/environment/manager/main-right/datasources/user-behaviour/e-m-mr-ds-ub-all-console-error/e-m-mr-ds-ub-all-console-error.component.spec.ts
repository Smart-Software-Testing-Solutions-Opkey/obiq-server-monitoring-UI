import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbAllConsoleErrorComponent } from './e-m-mr-ds-ub-all-console-error.component';

describe('EMMrDsUbAllConsoleErrorComponent', () => {
  let component: EMMrDsUbAllConsoleErrorComponent;
  let fixture: ComponentFixture<EMMrDsUbAllConsoleErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbAllConsoleErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbAllConsoleErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
