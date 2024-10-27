import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSettingsUserBehaviourComponent } from './configuration-settings-user-behaviour.component';

describe('ConfigurationSettingsUserBehaviourComponent', () => {
  let component: ConfigurationSettingsUserBehaviourComponent;
  let fixture: ComponentFixture<ConfigurationSettingsUserBehaviourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationSettingsUserBehaviourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSettingsUserBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
