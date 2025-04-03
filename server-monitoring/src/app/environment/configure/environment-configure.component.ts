import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { ConfigurationSettingsComponent } from './configuration-settings/configuration-settings.component';
import { NavModule } from 'src/app/modules/nav.module';

@Component({
  standalone: true,
  imports :[NavModule],
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

    this.router.navigateByUrl("/environment/manager/modal?source=configuration");
  //   const modalRef = this.modalService.open( ConfigurationSettingsComponent,{
  //     backdrop: 'static',
  //     keyboard: false,
  //     size: 'full',
  //     centered: true,
  //     windowClass: 'layout-modal fade-off'
  //   });
  //   modalRef.result.then((result) => {
  //   }, (response) => {
  //     if (response == 'close modal') {
  //       return;
  //     }
  //   });
  }
  
}
