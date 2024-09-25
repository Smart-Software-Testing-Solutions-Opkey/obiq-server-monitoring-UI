import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureCreateEnvironmentComponent } from './configure-create-environment.component';

describe('ConfigureCreateEnvironmentComponent', () => {
  let component: ConfigureCreateEnvironmentComponent;
  let fixture: ComponentFixture<ConfigureCreateEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureCreateEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureCreateEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
