import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvrionmentCommonFilterComponent } from './envrionment-common-filter.component';

describe('EnvrionmentCommonFilterComponent', () => {
  let component: EnvrionmentCommonFilterComponent;
  let fixture: ComponentFixture<EnvrionmentCommonFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvrionmentCommonFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvrionmentCommonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
