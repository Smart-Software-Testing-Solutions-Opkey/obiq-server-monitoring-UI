import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentCurdServiceComponent } from '../curd/service/environment-curd-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { ConfigureCreateEnvironmentComponent } from './configure-create-environment/configure-create-environment.component';
import { RightPanelAddEnvironmentComponent } from '../manager/right-panel/right-panel-add-environment.component';

@Component({
  selector: 'app-environment-configure',
  templateUrl: './environment-configure.component.html',
  styleUrls: ['./environment-configure.component.scss']
})
export class EnvironmentConfigureComponent {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService
  ) { }

  add_environment() {
    const modalRef = this.modalService.open(RightPanelAddEnvironmentComponent, {
      windowClass: 'layout-modal-right panel-end',
      backdropClass: 'modal-overlay-bg-light',
      backdrop: 'static',
      size: 'xl'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
      this.select_service_data();
    });
  }

  // add_environment() {
  //   this.create_environment();
  // }

  // create_environment() {
  //   const modalRef = this.modalService.open(ConfigureCreateEnvironmentComponent, {
  //     backdrop: 'static',
  //     keyboard: false,
  //     size: 'lg',
  //     centered: true,
  //     windowClass: 'layout-modal'
  //   });
  //   modalRef.result.then((result) => {
  //   }, (response) => {
  //     if (response == 'close modal') {
  //       return;
  //     }
  //     this.open_modal_service();
  //   });
  // }


  // open_modal_service() {
  //   const modalRef = this.modalService.open(EnvironmentCurdServiceComponent, {
  //     backdrop: 'static',
  //     keyboard: false,
  //     size: 'lg',
  //     centered: true,
  //     windowClass: 'layout-modal'
  //   });
  //   modalRef.result.then((result) => {
  //   }, (response) => {
  //     if (response == 'close modal') {
  //       return;
  //     }

  //     this.select_service_data();
  //   });
  // }

  select_service_data() {
    debugger;
    this.service_data.is_env_configure = true;
    this.router.navigate(['/environment']);
  }
  
}
