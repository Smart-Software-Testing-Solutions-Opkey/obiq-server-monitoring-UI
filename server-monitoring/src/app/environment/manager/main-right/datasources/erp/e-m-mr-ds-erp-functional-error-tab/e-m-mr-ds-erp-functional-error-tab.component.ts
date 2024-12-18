import { Component, Input } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-mr-ds-erp-functional-error-tab',
  templateUrl: './e-m-mr-ds-erp-functional-error-tab.component.html',
  styleUrl: './e-m-mr-ds-erp-functional-error-tab.component.scss'
})
export class EMMrDsErpFunctionalErrorTabComponent {
  constructor(
      public service_data: AppDataService,
      public app_service: AppService,
      public dataService: AppDataService,
  ){

  }
@Input() analyticsType: any;
  @Input() view: any;


  ngOnInit(): void {
  this.get_Functional_log_error();
  }
    get_Functional_log_error() {
      let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllAppFunctionalErrorByFilter";
  
      let form_data = {
        "timeSpanEnum": "LAST_7_DAYS",
        "limitBy": 0,
        "appType":"ORACLEFUSION",
        "offset": 0,
      };
  
      this.app_service.make_post_server_call(form_url, form_data).subscribe({
        next: (result: any) => {
       
        },
        error: (error: any) => {
          // window.loadingStop("#Env_manager_main_right");
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
    }
}