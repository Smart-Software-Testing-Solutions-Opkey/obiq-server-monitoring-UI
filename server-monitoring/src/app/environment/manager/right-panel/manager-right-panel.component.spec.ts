import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRightPanelComponent } from './manager-right-panel.component';

describe('ManagerRightPanelComponent', () => {
  let component: ManagerRightPanelComponent;
  let fixture: ComponentFixture<ManagerRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerRightPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
