import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent } from './environment-manager-widgets-progress-bars-fastest-journeys.component';

describe('EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent', () => {
  let component: EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
