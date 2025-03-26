import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCalendarComponent } from './filter-calendar.component';

describe('FilterCalendarComponent', () => {
  let component: FilterCalendarComponent;
  let fixture: ComponentFixture<FilterCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
