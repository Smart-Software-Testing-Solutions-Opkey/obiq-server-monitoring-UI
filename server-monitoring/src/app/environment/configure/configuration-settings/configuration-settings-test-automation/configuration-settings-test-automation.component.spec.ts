import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSettingsTestAutomationComponent } from './configuration-settings-test-automation.component';

describe('ConfigurationSettingsTestAutomationComponent', () => {
  let component: ConfigurationSettingsTestAutomationComponent;
  let fixture: ComponentFixture<ConfigurationSettingsTestAutomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSettingsTestAutomationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSettingsTestAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
