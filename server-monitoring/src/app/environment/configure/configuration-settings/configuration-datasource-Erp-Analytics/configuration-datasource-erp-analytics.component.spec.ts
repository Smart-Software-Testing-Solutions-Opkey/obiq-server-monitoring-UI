import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationDatasourceErpAnalyticsComponent } from './configuration-datasource-erp-analytics.component';

describe('ConfigurationDatasourceErpAnalyticsComponent', () => {
  let component: ConfigurationDatasourceErpAnalyticsComponent;
  let fixture: ComponentFixture<ConfigurationDatasourceErpAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationDatasourceErpAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationDatasourceErpAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
