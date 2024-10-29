import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedJourneyComponent } from './selected-journey.component';

describe('SelectedJourneyComponent', () => {
  let component: SelectedJourneyComponent;
  let fixture: ComponentFixture<SelectedJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
