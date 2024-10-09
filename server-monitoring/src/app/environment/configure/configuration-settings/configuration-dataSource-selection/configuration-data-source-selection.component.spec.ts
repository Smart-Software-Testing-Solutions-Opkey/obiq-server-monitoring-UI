import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationDataSourceSelectionComponent } from './configuration-data-source-selection.component';

describe('ConfigurationDataSourceSelectionComponent', () => {
  let component: ConfigurationDataSourceSelectionComponent;
  let fixture: ComponentFixture<ConfigurationDataSourceSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationDataSourceSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationDataSourceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
