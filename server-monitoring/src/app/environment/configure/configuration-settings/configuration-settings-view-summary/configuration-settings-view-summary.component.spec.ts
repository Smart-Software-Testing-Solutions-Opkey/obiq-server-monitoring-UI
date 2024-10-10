import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSettingsViewSummaryComponent } from './configuration-settings-view-summary.component';

describe('ConfigurationSettingsViewSummaryComponent', () => {
  let component: ConfigurationSettingsViewSummaryComponent;
  let fixture: ComponentFixture<ConfigurationSettingsViewSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSettingsViewSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSettingsViewSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
