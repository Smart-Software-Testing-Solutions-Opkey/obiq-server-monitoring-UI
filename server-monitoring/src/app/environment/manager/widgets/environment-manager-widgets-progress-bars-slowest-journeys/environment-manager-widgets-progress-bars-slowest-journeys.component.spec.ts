import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent } from './environment-manager-widgets-progress-bars-slowest-journeys.component';

describe('EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent', () => {
  let component: EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
