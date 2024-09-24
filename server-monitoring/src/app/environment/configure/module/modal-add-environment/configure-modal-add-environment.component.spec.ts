import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureModalAddEnvironmentComponent } from './configure-modal-add-environment.component';

describe('ConfigureModalAddEnvironmentComponent', () => {
  let component: ConfigureModalAddEnvironmentComponent;
  let fixture: ComponentFixture<ConfigureModalAddEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureModalAddEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureModalAddEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
