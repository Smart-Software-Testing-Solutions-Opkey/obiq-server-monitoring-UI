import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent } from './environment-manager-widgets-progress-bars-common-journeys.component';

describe('EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent', () => {
  let component: EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
