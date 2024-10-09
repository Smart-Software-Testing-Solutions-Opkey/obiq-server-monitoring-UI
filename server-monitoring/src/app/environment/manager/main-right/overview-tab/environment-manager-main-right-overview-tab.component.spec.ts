import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerMainRightOverviewTabComponent } from './environment-manager-main-right-overview-tab.component';

describe('EnvironmentManagerMainRightOverviewTabComponent', () => {
  let component: EnvironmentManagerMainRightOverviewTabComponent;
  let fixture: ComponentFixture<EnvironmentManagerMainRightOverviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerMainRightOverviewTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerMainRightOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
