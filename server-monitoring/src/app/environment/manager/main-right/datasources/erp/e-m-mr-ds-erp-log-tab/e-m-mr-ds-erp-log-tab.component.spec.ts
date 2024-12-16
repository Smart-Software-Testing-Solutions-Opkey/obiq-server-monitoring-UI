import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsErpLogTabComponent } from './e-m-mr-ds-erp-log-tab.component';

describe('EMMrDsErpLogTabComponent', () => {
  let component: EMMrDsErpLogTabComponent;
  let fixture: ComponentFixture<EMMrDsErpLogTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsErpLogTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsErpLogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
