import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMMrDsERPDComponent } from './e-m-mr-ds-e-r-p-d.component';

describe('EMMrDsERPDComponent', () => {
  let component: EMMrDsERPDComponent;
  let fixture: ComponentFixture<EMMrDsERPDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMMrDsERPDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMMrDsERPDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
