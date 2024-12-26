import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMDsUbFunctionalErrorTabComponent } from './e-m-ds-ub-functional-error-tab.component';

describe('EMDsUbFunctionalErrorTabComponent', () => {
  let component: EMDsUbFunctionalErrorTabComponent;
  let fixture: ComponentFixture<EMDsUbFunctionalErrorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EMDsUbFunctionalErrorTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMDsUbFunctionalErrorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
