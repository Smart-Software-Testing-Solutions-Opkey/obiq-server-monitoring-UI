import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsUbOverviewTabComponent } from './e-m-mr-ds-ub-overview-tab.component';

describe('EMMrDsUbOverviewTabComponent', () => {
  let component: EMMrDsUbOverviewTabComponent;
  let fixture: ComponentFixture<EMMrDsUbOverviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsUbOverviewTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsUbOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
