import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgboxDialogComponent } from './msgbox-dialog.component';

describe('MsgboxDialogComponent', () => {
  let component: MsgboxDialogComponent;
  let fixture: ComponentFixture<MsgboxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsgboxDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgboxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
