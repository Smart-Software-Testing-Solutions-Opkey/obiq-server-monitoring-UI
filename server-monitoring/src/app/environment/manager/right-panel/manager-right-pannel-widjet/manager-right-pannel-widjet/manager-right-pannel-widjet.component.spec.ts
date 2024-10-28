import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRightPannelWidjetComponent } from './manager-right-pannel-widjet.component';

describe('ManagerRightPannelWidjetComponent', () => {
  let component: ManagerRightPannelWidjetComponent;
  let fixture: ComponentFixture<ManagerRightPannelWidjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerRightPannelWidjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRightPannelWidjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
