import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMConsoleErrorWidgetComponent } from './e-m-console-error-widget.component';

describe('EMConsoleErrorWidgetComponent', () => {
  let component: EMConsoleErrorWidgetComponent;
  let fixture: ComponentFixture<EMConsoleErrorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMConsoleErrorWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMConsoleErrorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
