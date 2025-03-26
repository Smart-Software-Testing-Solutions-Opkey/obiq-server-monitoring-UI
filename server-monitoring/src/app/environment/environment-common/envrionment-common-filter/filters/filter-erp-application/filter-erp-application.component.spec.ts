import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterErpApplicationComponent } from './filter-erp-application.component';

describe('FilterErpApplicationComponent', () => {
  let component: FilterErpApplicationComponent;
  let fixture: ComponentFixture<FilterErpApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterErpApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterErpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
