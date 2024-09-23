import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-environment-curd',
  templateUrl: './environment-curd.component.html',
  styleUrls: ['./environment-curd.component.scss']
})
export class EnvironmentCurdComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }


  create_environment() {
    debugger;
  }

  close_model() {
    this.activeModal.dismiss('Cross click');
  }

}
