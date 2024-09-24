import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentCurdComponent } from '../curd/add/environment-curd.component';
import { EnvironmentCurdServiceComponent } from '../curd/service/environment-curd-service.component';

@Component({
  selector: 'app-environment-configure',
  templateUrl: './environment-configure.component.html',
  styleUrls: ['./environment-configure.component.scss']
})
export class EnvironmentConfigureComponent {

  
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    
  }

  add_environment() {
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
      this.open_modal_service();
    });
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

      this.select_service_data();
    });
  }

  select_service_data() {
    debugger;
  }
  
}
