import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelAddEnvironmentComponent } from './right-panel-add-environment.component';

describe('RightPanelAddEnvironmentComponent', () => {
  let component: RightPanelAddEnvironmentComponent;
  let fixture: ComponentFixture<RightPanelAddEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightPanelAddEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightPanelAddEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
