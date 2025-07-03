import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMFunctionalErrorWidgetComponent } from './e-m-functional-error-widget.component';

describe('EMFunctionalErrorWidgetComponent', () => {
  let component: EMFunctionalErrorWidgetComponent;
  let fixture: ComponentFixture<EMFunctionalErrorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMFunctionalErrorWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMFunctionalErrorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
