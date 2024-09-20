import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentConfigureComponent } from './environment-configure.component';

describe('EnvironmentConfigureComponent', () => {
  let component: EnvironmentConfigureComponent;
  let fixture: ComponentFixture<EnvironmentConfigureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvironmentConfigureComponent]
    });
    fixture = TestBed.createComponent(EnvironmentConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
