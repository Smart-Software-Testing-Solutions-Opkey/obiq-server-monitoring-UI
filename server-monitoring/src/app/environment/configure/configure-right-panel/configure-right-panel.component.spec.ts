import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureRightPanelComponent } from './configure-right-panel.component';

describe('ConfigureRightPanelComponent', () => {
  let component: ConfigureRightPanelComponent;
  let fixture: ComponentFixture<ConfigureRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigureRightPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
