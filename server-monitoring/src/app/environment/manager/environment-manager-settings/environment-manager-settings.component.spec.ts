import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerSettingsComponent } from './environment-manager-settings.component';

describe('EnvironmentManagerSettingsComponent', () => {
  let component: EnvironmentManagerSettingsComponent;
  let fixture: ComponentFixture<EnvironmentManagerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
