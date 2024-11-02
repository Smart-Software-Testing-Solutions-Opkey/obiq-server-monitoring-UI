import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTraceInnerComponent } from './selected-trace-inner.component';

describe('SelectedTraceInnerComponent', () => {
  let component: SelectedTraceInnerComponent;
  let fixture: ComponentFixture<SelectedTraceInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedTraceInnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedTraceInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
