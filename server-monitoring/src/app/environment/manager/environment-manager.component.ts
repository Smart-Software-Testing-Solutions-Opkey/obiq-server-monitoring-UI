import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentCurdComponent } from '../curd/add/environment-curd.component';

@Component({
  selector: 'app-environment-manager',
  templateUrl: './environment-manager.component.html',
  styleUrls: ['./environment-manager.component.scss']
})
export class EnvironmentManagerComponent {

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.curd_create_environment();
  }

  curd_create_environment() {
    const modalRef = this.modalService.open(EnvironmentCurdComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
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

}
