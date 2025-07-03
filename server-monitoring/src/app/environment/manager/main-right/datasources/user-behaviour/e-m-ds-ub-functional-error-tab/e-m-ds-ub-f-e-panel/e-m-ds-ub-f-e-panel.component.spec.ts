import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMDsUbFEPanelComponent } from './e-m-ds-ub-f-e-panel.component';

describe('EMDsUbFEPanelComponent', () => {
  let component: EMDsUbFEPanelComponent;
  let fixture: ComponentFixture<EMDsUbFEPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMDsUbFEPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMDsUbFEPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
