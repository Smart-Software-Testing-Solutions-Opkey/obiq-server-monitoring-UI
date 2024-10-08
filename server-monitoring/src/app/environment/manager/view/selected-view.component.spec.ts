import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletedViewComponent } from './selected-view.component';

describe('SeletedViewComponent', () => {
  let component: SeletedViewComponent;
  let fixture: ComponentFixture<SeletedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletedViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeletedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
