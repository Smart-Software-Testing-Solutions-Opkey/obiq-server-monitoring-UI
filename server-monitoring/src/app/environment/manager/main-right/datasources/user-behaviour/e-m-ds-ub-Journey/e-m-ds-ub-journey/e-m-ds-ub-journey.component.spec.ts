import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMDsUbJourneyComponent } from './e-m-ds-ub-journey.component';

describe('EMDsUbJourneyComponent', () => {
  let component: EMDsUbJourneyComponent;
  let fixture: ComponentFixture<EMDsUbJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMDsUbJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMDsUbJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
