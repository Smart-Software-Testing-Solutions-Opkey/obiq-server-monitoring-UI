import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureModalContainerComponent } from './configure-modal-container.component';

describe('ConfigureModalContainerComponent', () => {
  let component: ConfigureModalContainerComponent;
  let fixture: ComponentFixture<ConfigureModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigureModalContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
