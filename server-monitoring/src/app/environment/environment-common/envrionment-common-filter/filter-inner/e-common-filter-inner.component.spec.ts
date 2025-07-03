import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommonFilterInnerComponent } from './e-common-filter-inner.component';

describe('ECommonFilterInnerComponent', () => {
  let component: ECommonFilterInnerComponent;
  let fixture: ComponentFixture<ECommonFilterInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ECommonFilterInnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECommonFilterInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
