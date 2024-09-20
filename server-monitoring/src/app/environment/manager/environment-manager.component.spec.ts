import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerComponent } from './environment-manager.component';

describe('EnvironmentManagerComponent', () => {
  let component: EnvironmentManagerComponent;
  let fixture: ComponentFixture<EnvironmentManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvironmentManagerComponent]
    });
    fixture = TestBed.createComponent(EnvironmentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
