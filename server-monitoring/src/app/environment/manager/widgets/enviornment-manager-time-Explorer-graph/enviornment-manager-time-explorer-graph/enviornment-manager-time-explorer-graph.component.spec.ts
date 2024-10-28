import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviornmentManagerTimeExplorerGraphComponent } from './enviornment-manager-time-explorer-graph.component';

describe('EnviornmentManagerTimeExplorerGraphComponent', () => {
  let component: EnviornmentManagerTimeExplorerGraphComponent;
  let fixture: ComponentFixture<EnviornmentManagerTimeExplorerGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnviornmentManagerTimeExplorerGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviornmentManagerTimeExplorerGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
