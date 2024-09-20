import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorBreadcrumbComponent } from './navigator-breadcrumb.component';

describe('NavigatorBreadcrumbComponent', () => {
  let component: NavigatorBreadcrumbComponent;
  let fixture: ComponentFixture<NavigatorBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigatorBreadcrumbComponent]
    });
    fixture = TestBed.createComponent(NavigatorBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
