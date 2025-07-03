import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMApiErrorWidgetComponent } from './e-m-api-error-widget.component';

describe('EMApiErrorWidgetComponent', () => {
  let component: EMApiErrorWidgetComponent;
  let fixture: ComponentFixture<EMApiErrorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMApiErrorWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMApiErrorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
