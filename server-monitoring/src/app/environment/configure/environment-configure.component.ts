import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigureModalAddEnvironmentComponent } from './module/modal-add-environment/configure-modal-add-environment.component';
import { EnvironmentCurdServiceComponent } from '../curd/service/environment-curd-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';

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
    this.curd_create_environment();
  }

  curd_create_environment() {
    const modalRef = this.modalService.open(ConfigureModalAddEnvironmentComponent, {
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
      this.service_data.is_env_configure = true;
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
    this.router.navigate(['/environment'], { relativeTo: this.route });
  }
  
}
