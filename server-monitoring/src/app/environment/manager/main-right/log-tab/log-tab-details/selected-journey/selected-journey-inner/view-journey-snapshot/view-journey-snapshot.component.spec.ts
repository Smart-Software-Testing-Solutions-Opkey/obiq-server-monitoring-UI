import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJourneySnapshotComponent } from './view-journey-snapshot.component';

describe('ViewJourneySnapshotComponent', () => {
  let component: ViewJourneySnapshotComponent;
  let fixture: ComponentFixture<ViewJourneySnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJourneySnapshotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJourneySnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
