import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentConfigureViewBuilderComponent } from './environment-configure-view-builder.component';

describe('EnvironmentConfigureViewBuilderComponent', () => {
  let component: EnvironmentConfigureViewBuilderComponent;
  let fixture: ComponentFixture<EnvironmentConfigureViewBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentConfigureViewBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentConfigureViewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
