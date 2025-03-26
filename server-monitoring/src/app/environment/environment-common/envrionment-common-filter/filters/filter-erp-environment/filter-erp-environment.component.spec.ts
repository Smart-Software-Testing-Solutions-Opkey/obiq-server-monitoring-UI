import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterErpEnvironmentComponent } from './filter-erp-environment.component';

describe('FilterErpEnvironmentComponent', () => {
  let component: FilterErpEnvironmentComponent;
  let fixture: ComponentFixture<FilterErpEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterErpEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterErpEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
