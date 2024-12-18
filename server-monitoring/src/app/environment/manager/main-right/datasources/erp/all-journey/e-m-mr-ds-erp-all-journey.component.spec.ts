import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsErpAllJourneyComponent } from './e-m-mr-ds-erp-all-journey.component';

describe('EMMrDsErpAllJourneyComponent', () => {
  let component: EMMrDsErpAllJourneyComponent;
  let fixture: ComponentFixture<EMMrDsErpAllJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsErpAllJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsErpAllJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
