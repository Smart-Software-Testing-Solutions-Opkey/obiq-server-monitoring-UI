import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationSettingsComponent } from '../configuration-settings/configuration-settings.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-configure-modal-container',
  templateUrl: './configure-modal-container.component.html',
  styleUrl: './configure-modal-container.component.scss'
})
export class ConfigureModalContainerComponent {

  constructor(
      private modalService: NgbModal,
      private serviceData : AppDataService,
      private router : Router,
      private route : ActivatedRoute,
      private location: Location,
      private appService : AppService
  ){

  }
  source : any;
  ngOnInit(){
    this.getConfigurationData();

    debugger
    this.route.queryParams.subscribe(params => {
       this.source = params['source'];
       
    });
  }

  getConfigurationData(){
      const modalRef = this.modalService.open(ConfigurationSettingsComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'full',
        centered: true,
        windowClass: 'layout-modal transition-none'
      });
      modalRef.result.then((result) => {
      }, (response) => {
        debugger

        response = JSON.parse(response);
        if (response.hasOwnProperty('close_and_move_to_back')) {

          this.location.back();
          // return;
          // if(this.source == 'configuration'){
          //   this.router.navigate(['/environment/configure']);
          // }
          // else if(this.source == 'settings'){
          //   this.router.navigate(['/environment/manager/settings']);
          // }
          // else{
          //   this.router.navigate(['/environment/manager/summary'])
          // }
          
        }
        else if( response.hasOwnProperty("close_and_move_to_next")){
          if( this.source == 'right'){
            this.appService.routeTo('environment','manager',`viewId=${response['close_and_move_to_next']}`)
          }
          else if( this.source == 'settings'){
            this.appService.routeTo('environment',`manager/settings/${response['close_and_move_to_next']}`)
          }
          else if( this.source == 'configuration'){
            this.appService.routeTo('environment','manager',`viewId=${response['close_and_move_to_next']}`)
          }
          


        }
        else if (response == 'create_environment')
          this.select_service_data();
      });
  }

  select_service_data() {

    this.serviceData.is_env_configure = true;
    this.router.navigate(['/environment/manager']);
  }

}
