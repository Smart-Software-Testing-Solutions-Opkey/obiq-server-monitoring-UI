import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsStatWidgetComponent } from './environment-manager-widgets-stat-widget.component';

describe('EnvironmentManagerWidgetsStatWidgetComponent', () => {
  let component: EnvironmentManagerWidgetsStatWidgetComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsStatWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsStatWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsStatWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
