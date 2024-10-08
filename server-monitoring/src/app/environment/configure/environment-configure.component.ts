import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentCurdServiceComponent } from '../curd/service/environment-curd-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { ConfigureCreateEnvironmentComponent } from './configure-create-environment/configure-create-environment.component';
import { RightPanelAddEnvironmentComponent } from '../manager/right-panel/right-panel-add-environment.component';
import { EnvironmentConfigureViewBuilderComponent } from './modal/environment-configure-view-builder.component';

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
    const modalRef = this.modalService.open(EnvironmentConfigureViewBuilderComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'full',
      centered: true,
      windowClass: 'layout-modal transition-none'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
    });
  }

  select_service_data() {
    debugger;
    this.service_data.is_env_configure = true;
    this.router.navigate(['/environment']);
  }
  
}
