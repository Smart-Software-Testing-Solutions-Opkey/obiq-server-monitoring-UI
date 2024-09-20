import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentCurdComponent } from './environment-curd.component';

describe('EnvironmentCurdComponent', () => {
  let component: EnvironmentCurdComponent;
  let fixture: ComponentFixture<EnvironmentCurdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvironmentCurdComponent]
    });
    fixture = TestBed.createComponent(EnvironmentCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
