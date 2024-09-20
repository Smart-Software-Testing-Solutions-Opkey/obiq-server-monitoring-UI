import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentCurdServiceComponent } from './environment-curd-service.component';

describe('EnvironmentCurdServiceComponent', () => {
  let component: EnvironmentCurdServiceComponent;
  let fixture: ComponentFixture<EnvironmentCurdServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvironmentCurdServiceComponent]
    });
    fixture = TestBed.createComponent(EnvironmentCurdServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
