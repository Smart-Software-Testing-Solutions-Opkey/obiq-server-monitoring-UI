import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentSelectedComponent } from './environment-selected.component';

describe('EnvironmentSelectedComponent', () => {
  let component: EnvironmentSelectedComponent;
  let fixture: ComponentFixture<EnvironmentSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvironmentSelectedComponent]
    });
    fixture = TestBed.createComponent(EnvironmentSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
