import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSettingsSystemDiagnosticsComponent } from './configuration-settings-system-diagnostics.component';

describe('ConfigurationSettingsSystemDiagnosticsComponent', () => {
  let component: ConfigurationSettingsSystemDiagnosticsComponent;
  let fixture: ComponentFixture<ConfigurationSettingsSystemDiagnosticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSettingsSystemDiagnosticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSettingsSystemDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
