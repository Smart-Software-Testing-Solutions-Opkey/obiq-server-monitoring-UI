import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbAllJourneyComponent } from './e-m-mr-ds-ub-all-journey.component';

describe('EMMrDsUbAllJourneyComponent', () => {
  let component: EMMrDsUbAllJourneyComponent;
  let fixture: ComponentFixture<EMMrDsUbAllJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbAllJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbAllJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
