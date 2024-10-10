import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSettingsDatasourceComponent } from './configuration-settings-datasource.component';

describe('ConfigurationSettingsDatasourceComponent', () => {
  let component: ConfigurationSettingsDatasourceComponent;
  let fixture: ComponentFixture<ConfigurationSettingsDatasourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSettingsDatasourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSettingsDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
