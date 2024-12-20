import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterErpProcessComponent } from './filter-erp-process.component';

describe('FilterErpProcessComponent', () => {
  let component: FilterErpProcessComponent;
  let fixture: ComponentFixture<FilterErpProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterErpProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterErpProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
