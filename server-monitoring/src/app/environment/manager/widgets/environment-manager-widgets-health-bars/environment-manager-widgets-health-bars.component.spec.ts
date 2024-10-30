import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsHealthBarsComponent } from './environment-manager-widgets-health-bars.component';

describe('EnvironmentManagerWidgetsHealthBarsComponent', () => {
  let component: EnvironmentManagerWidgetsHealthBarsComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsHealthBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsHealthBarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsHealthBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
