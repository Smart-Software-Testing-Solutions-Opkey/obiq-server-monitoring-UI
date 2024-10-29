import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJourneyErrorComponent } from './view-journey-error.component';

describe('ViewJourneyErrorComponent', () => {
  let component: ViewJourneyErrorComponent;
  let fixture: ComponentFixture<ViewJourneyErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJourneyErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJourneyErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
