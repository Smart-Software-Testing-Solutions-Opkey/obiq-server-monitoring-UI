import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDatetimeComponent } from './filter-datetime.component';

describe('FilterDatetimeComponent', () => {
  let component: FilterDatetimeComponent;
  let fixture: ComponentFixture<FilterDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDatetimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
