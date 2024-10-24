import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSettingsSummaryAfterViewCreationComponent } from './configuration-settings-summary-after-view-creation.component';

describe('ConfigurationSettingsSummaryAfterViewCreationComponent', () => {
  let component: ConfigurationSettingsSummaryAfterViewCreationComponent;
  let fixture: ComponentFixture<ConfigurationSettingsSummaryAfterViewCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSettingsSummaryAfterViewCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSettingsSummaryAfterViewCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
