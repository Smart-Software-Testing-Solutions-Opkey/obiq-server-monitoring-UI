import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsErpOverviewTabComponent } from './e-m-mr-ds-erp-overview-tab.component';

describe('EMMrDsErpOverviewTabComponent', () => {
  let component: EMMrDsErpOverviewTabComponent;
  let fixture: ComponentFixture<EMMrDsErpOverviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsErpOverviewTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsErpOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
