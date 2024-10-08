import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagerLeftMenuComponent } from './environment-manager-left-menu.component';

describe('EnvironmentManagerLeftMenuComponent', () => {
  let component: EnvironmentManagerLeftMenuComponent;
  let fixture: ComponentFixture<EnvironmentManagerLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentManagerLeftMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentManagerLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
