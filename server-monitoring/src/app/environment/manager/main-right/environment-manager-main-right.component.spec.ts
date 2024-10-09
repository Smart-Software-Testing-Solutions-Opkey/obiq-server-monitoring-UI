import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerMainRightComponent } from './environment-manager-main-right.component';

describe('EnvironmentManagerMainRightComponent', () => {
  let component: EnvironmentManagerMainRightComponent;
  let fixture: ComponentFixture<EnvironmentManagerMainRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagerMainRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerMainRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
