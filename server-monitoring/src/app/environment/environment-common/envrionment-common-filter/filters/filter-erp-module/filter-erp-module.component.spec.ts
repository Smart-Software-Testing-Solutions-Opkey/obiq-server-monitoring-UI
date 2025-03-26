import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterErpModuleComponent } from './filter-erp-module.component';

describe('FilterErpModuleComponent', () => {
  let component: FilterErpModuleComponent;
  let fixture: ComponentFixture<FilterErpModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterErpModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterErpModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
