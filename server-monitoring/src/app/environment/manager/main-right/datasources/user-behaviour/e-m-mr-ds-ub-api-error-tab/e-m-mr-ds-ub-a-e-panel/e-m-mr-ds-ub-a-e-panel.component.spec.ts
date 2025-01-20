import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbAEPanelComponent } from './e-m-mr-ds-ub-a-e-panel.component';

describe('EMMrDsUbAEPanelComponent', () => {
  let component: EMMrDsUbAEPanelComponent;
  let fixture: ComponentFixture<EMMrDsUbAEPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbAEPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbAEPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
