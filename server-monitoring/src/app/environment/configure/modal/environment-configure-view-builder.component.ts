import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-environment-configure-view-builder',
  standalone: true,
  imports: [],
  templateUrl: './environment-configure-view-builder.component.html',
  styleUrl: './environment-configure-view-builder.component.scss'
})
export class EnvironmentConfigureViewBuilderComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }
  
  close_model() {
    this.activeModal.dismiss('close modal');
  }
  
}
