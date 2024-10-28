import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent } from './environment-manager-widgets-total-errors-area-widget.component';

describe('EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent', () => {
  let component: EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent;
  let fixture: ComponentFixture<EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
