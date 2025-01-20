import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbCEPanelComponent } from './e-m-mr-ds-ub-c-e-panel.component';

describe('EMMrDsUbCEPanelComponent', () => {
  let component: EMMrDsUbCEPanelComponent;
  let fixture: ComponentFixture<EMMrDsUbCEPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbCEPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbCEPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
