import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmailComponent } from './common-email.component';

describe('CommonEmailComponent', () => {
  let component: CommonEmailComponent;
  let fixture: ComponentFixture<CommonEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
