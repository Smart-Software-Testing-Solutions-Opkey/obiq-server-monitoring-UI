import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerMainRightLogTabComponent } from './environment-manager-main-right-log-tab.component';

describe('EnvironmentManagerMainRightLogTabComponent', () => {
  let component: EnvironmentManagerMainRightLogTabComponent;
  let fixture: ComponentFixture<EnvironmentManagerMainRightLogTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerMainRightLogTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerMainRightLogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
