import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorLeftComponent } from './navigator-left.component';

describe('NavigatorLeftComponent', () => {
  let component: NavigatorLeftComponent;
  let fixture: ComponentFixture<NavigatorLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigatorLeftComponent]
    });
    fixture = TestBed.createComponent(NavigatorLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
