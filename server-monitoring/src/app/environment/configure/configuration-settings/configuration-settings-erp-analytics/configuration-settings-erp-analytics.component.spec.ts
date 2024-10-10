import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSettingsErpAnalyticsComponent } from './configuration-settings-erp-analytics.component';

describe('ConfigurationSettingsErpAnalyticsComponent', () => {
  let component: ConfigurationSettingsErpAnalyticsComponent;
  let fixture: ComponentFixture<ConfigurationSettingsErpAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSettingsErpAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSettingsErpAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
