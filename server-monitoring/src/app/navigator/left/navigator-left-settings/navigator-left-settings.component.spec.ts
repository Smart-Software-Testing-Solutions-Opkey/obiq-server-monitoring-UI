import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorLeftSettingsComponent } from './navigator-left-settings.component';

describe('NavigatorLeftSettingsComponent', () => {
  let component: NavigatorLeftSettingsComponent;
  let fixture: ComponentFixture<NavigatorLeftSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigatorLeftSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigatorLeftSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
