import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentCurdServiceComponent } from '../service/environment-curd-service.component';

@Component({
  selector: 'app-environment-curd',
  templateUrl: './environment-curd.component.html',
  styleUrls: ['./environment-curd.component.scss']
})
export class EnvironmentCurdComponent {

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }


  create_environment() {
    debugger;

    this.activeModal.dismiss('close modal');
    this.open_modal_service();
  }

  open_modal_service() {
    const modalRef = this.modalService.open(EnvironmentCurdServiceComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true,
      windowClass: 'layout-modal'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
    });
  }

  close_model() {
    this.activeModal.dismiss('close modal');
  }

}
