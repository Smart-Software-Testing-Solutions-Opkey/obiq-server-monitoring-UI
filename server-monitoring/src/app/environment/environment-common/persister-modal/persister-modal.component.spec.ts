import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersisterModalComponent } from './persister-modal.component';

describe('PersisterModalComponent', () => {
  let component: PersisterModalComponent;
  let fixture: ComponentFixture<PersisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersisterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
