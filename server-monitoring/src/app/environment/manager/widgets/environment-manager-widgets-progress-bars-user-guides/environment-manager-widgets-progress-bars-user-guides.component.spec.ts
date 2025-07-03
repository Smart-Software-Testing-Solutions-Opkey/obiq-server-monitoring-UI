import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsProgressBarsUserGuidesComponent } from './environment-manager-widgets-progress-bars-user-guides.component';

describe('EnvironmentManagerWidgetsProgressBarsUserGuidesComponent', () => {
  let component: EnvironmentManagerWidgetsProgressBarsUserGuidesComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsProgressBarsUserGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsProgressBarsUserGuidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsProgressBarsUserGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
