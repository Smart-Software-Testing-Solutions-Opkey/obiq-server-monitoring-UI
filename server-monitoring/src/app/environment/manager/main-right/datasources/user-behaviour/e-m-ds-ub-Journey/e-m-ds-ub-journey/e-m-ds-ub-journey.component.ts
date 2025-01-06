import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-ds-ub-journey',
  templateUrl: './e-m-ds-ub-journey.component.html',
  styleUrl: './e-m-ds-ub-journey.component.scss'
})
export class EMDsUbJourneyComponent  {

   constructor(
        public service_data: AppDataService,
        public app_service: AppService,
        public dataService: AppDataService,
        private modalService: NgbModal,
    ){
  
    }
  
  @Input() analyticsType: any;
  @Input() view: any;

  ngOnInit(): void {
    this.get_User_Behaviour_Journey();
    }
    get_User_Behaviour_Journey(): void {
      debugger;
       const form_url =
            environment.BASE_OBIQ_SERVER_URL +
            'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqJourneyController/getAllJourneyUsers';
      
            let form_data = {
              userId: this.dataService.UserDto.UserDTO.U_ID,
              projectId: this.dataService.UserDto.ProjectDTO.P_ID
            };
            this.app_service.make_post_server_call(form_url, form_data).subscribe({
            next: (result: any) => {
            window.loadingStop("#erp-err-logs-grid");
              
             
            },
            error: (error: any) => {
              console.warn(error);
              // window.loadingStop("#erp-err-logs-grid");
      
            },
            complete: () => {
              // window.loadingStop("#erp-err-logs-grid");
              console.log('Completed loading functional error logs');
            }
          });
    }
}
