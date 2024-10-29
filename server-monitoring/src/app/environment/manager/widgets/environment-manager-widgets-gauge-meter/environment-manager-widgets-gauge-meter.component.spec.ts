import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsGaugeMeterComponent } from './environment-manager-widgets-gauge-meter.component';

describe('EnvironmentManagerWidgetsGaugeMeterComponent', () => {
  let component: EnvironmentManagerWidgetsGaugeMeterComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsGaugeMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsGaugeMeterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsGaugeMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
