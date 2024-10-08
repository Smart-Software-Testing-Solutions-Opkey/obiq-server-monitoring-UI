import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerRightSectionComponent } from './environment-manager-right-section.component';

describe('EnvironmentManagerRightSectionComponent', () => {
  let component: EnvironmentManagerRightSectionComponent;
  let fixture: ComponentFixture<EnvironmentManagerRightSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentManagerRightSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerRightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
