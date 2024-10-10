import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerMainRightLogTabDetailsComponent } from './environment-manager-main-right-log-tab-details.component';

describe('EnvironmentManagerMainRightLogTabDetailsComponent', () => {
  let component: EnvironmentManagerMainRightLogTabDetailsComponent;
  let fixture: ComponentFixture<EnvironmentManagerMainRightLogTabDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerMainRightLogTabDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerMainRightLogTabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
