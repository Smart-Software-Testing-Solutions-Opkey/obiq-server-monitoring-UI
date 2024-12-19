import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsEFEJourneyComponent } from './e-m-mr-ds-e-f-e-journey.component';

describe('EMMrDsEFEJourneyComponent', () => {
  let component: EMMrDsEFEJourneyComponent;
  let fixture: ComponentFixture<EMMrDsEFEJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsEFEJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsEFEJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
