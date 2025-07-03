import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbConsoleErrorTabComponent } from './e-m-mr-ds-ub-console-error-tab.component';

describe('EMMrDsUbConsoleErrorTabComponent', () => {
  let component: EMMrDsUbConsoleErrorTabComponent;
  let fixture: ComponentFixture<EMMrDsUbConsoleErrorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbConsoleErrorTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbConsoleErrorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
