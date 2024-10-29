import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedJourneyInnerComponent } from './selected-journey-inner.component';

describe('SelectedJourneyInnerComponent', () => {
  let component: SelectedJourneyInnerComponent;
  let fixture: ComponentFixture<SelectedJourneyInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedJourneyInnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedJourneyInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
