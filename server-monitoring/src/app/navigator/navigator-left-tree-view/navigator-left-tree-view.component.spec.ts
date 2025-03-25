import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorLeftTreeViewComponent } from './navigator-left-tree-view.component';

describe('NavigatorLeftTreeViewComponent', () => {
  let component: NavigatorLeftTreeViewComponent;
  let fixture: ComponentFixture<NavigatorLeftTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigatorLeftTreeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigatorLeftTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
