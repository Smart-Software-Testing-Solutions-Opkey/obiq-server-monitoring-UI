import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRightPanelComponent } from 'src/app/environment/manager/right-panel/manager-right-panel.component';
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
      private modalService: NgbModal,
  ){

  }
@Input() analyticsType: any;
  @Input() view: any;
  limit: number = 20;
  err_log_Data_Source:any;

  ngOnInit(): void {
  this.get_Functional_log_error();
  }
   onSelectionChange(e) {
     console.log(this.analyticsType,"this is analytics type");
     console.log(this.view,"this is the view")
      let dataItem = e.dataItem
      const modalRef = this.modalService.open(ManagerRightPanelComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'full',
        centered: true,
        windowClass: 'layout-modal-right panel-end w-75'
      });
      modalRef.result.then((result) => {
      }, (response) => {
        if (response == 'close modal') {
          return;
        }
      });
      modalRef.componentInstance.selectedItem = { callsource: 'Erp_functional_logs_Journey_pannel', data: dataItem };
   }
    get_Functional_log_error(timeFilter?: any, appendData: boolean = false) {
      let result = [
        {
          "timestamp": 1734514155274,
          "errorId": "ad12aae2-bf65-4da7-b03a-dc02e618227e",
          "appType": "ORACLEFUSION",
          "appEventLog": "ErrorMessages for this page are listed below.Legal EmployerYou must enter a value.Last NameYou must enter a value.OK",
          "envName": "FA-EWOG-DEV1-SAASFAPROD1",
          "envHost": "https://fa-ewog-dev1-saasfaprod1.fa.ocs.oraclecloud.com",
          "userId": "Unknown User",
          "sessionId": "dbd19405-9b22-4b19-b4c8-78512241a636"
        },
        {
          "timestamp": 1734449001862,
          "errorId": "d973c998-555e-4fb1-9650-9ad23fc4d613",
          "appType": "ORACLEFUSION",
          "appEventLog": "Error: Invalid value: network.Invalid value: network.",
          "envName": "FA-EIIE-DEV4-SAASFAPROD1",
          "envHost": "https://fa-eiie-dev4-saasfaprod1.fa.ocs.oraclecloud.com",
          "userId": "Unknown User",
          "sessionId": "5a82cb70-bc54-40e5-98af-30be9cea84dd"
        }
      ];
    
      // Add formatted timeString field
      this.err_log_Data_Source = result.map((log) => {
        const date = new Date(log.timestamp);
        return {
          ...log,
          timeString: date.toLocaleString() // Add readable time string
        };
      });
        return;
      let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllAppFunctionalErrorByFilter";
  
      let form_data = {
        "timeSpanEnum": "LAST_7_DAYS",
        "limitBy":this.limit,
        "appType":"ORACLEFUSION",
        "offset": 0,
      };
  
      this.app_service.make_post_server_call(form_url, form_data).subscribe({
        next: (result: any) => {
       this.err_log_Data_Source = result;
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
    onScroll() {
      this.get_Functional_log_error(null, true); // Load more data and append it
  }
}