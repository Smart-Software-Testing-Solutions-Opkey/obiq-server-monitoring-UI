
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRightPanelComponent } from 'src/app/environment/manager/right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-mr-ds-ub-console-error-tab',
  templateUrl: './e-m-mr-ds-ub-console-error-tab.component.html',
  styleUrl: './e-m-mr-ds-ub-console-error-tab.component.scss'
})

export class EMMrDsUbConsoleErrorTabComponent {
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
  offset: number = 0; 
  ub_console_err_log_Data_Source: any[] = []; 
  allDataLoaded: boolean = false; 

  ngOnInit(): void {
  this.get_console_log_error();
  this.startDataReceiving();
  }
   onSelectionChange(e) {
     console.log(this.analyticsType,"this is analytics type ");
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
      modalRef.componentInstance.selectedItem = { callsource: 'ub_console_logs_panel', data: dataItem };
   }

  logToSearch : any;
  appType : string = 'ORACLEFUSION'
  startDataReceiving(){
    this.app_service.dataReceiver().subscribe(data => {
      
      if (data !== null) {
       
        if (data.callsource == 'LOG_APP_CONSOLE_ERROR'){
          this.logToSearch = '';
          this.offset = 0;
          this.allDataLoaded= false;

          if( data.action == 'refresh'){
            this.get_console_log_error()
          }
          else if(data.action == 'search'){
            this.logToSearch = data.data;
            this.offset = 0;
            this.allDataLoaded = false;
            this.get_console_log_error()

          }
          else if ( data.action == 'filterChange'){
            this.appType = data.objFilter.modelApplication.toUpperCase()
            this.get_console_log_error()

          }

        }
      }  
    });
  }
   get_console_log_error(timeFilter?: any, appendData: boolean = false): void {
    

    if (this.allDataLoaded) return; 
    window.loadingStart("#ub-err-logs-grid", "Please wait");
    const form_url =
      environment.BASE_OBIQ_SERVER_URL +
      'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllAppConsoleErrorByFilter';

    const form_data = {
      timeSpanEnum: 'LAST_7_DAYS',
      userId:this.dataService.UserDto.UserDTO.U_ID,
      limitBy: this.limit,
      appType: this.appType,
      offset: this.offset 
    };

    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
        window.loadingStop("#ub-err-logs-grid");

        result = [
          {
              "timestamp": 1737369731756,
              "errorId": "dc8ccb79-467b-4af1-9b16-21fde42e4fda",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "c3f4afb2-7f63-44a4-9ea0-a2e6fe481c29"
          },
          {
              "timestamp": 1737369725244,
              "errorId": "80b100b2-ef89-4941-b196-6751d8d7488c",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "c3f4afb2-7f63-44a4-9ea0-a2e6fe481c29"
          },
          {
              "timestamp": 1737369721906,
              "errorId": "bf650c2a-5c2d-4758-84c0-dda9960f31d2",
              "appType": "ORACLEFUSION",
              "appEventLog": "Edit DistributionsViewExport to ExcelQuery By ExampleDetachDetachLine NumberDetail Line NumberAccount ClassDistributionAccounting DatePosted DateAllocationDistribution CommentsSalespersonTax Liability AccountPercentageAmount (USD)Accounted Amount (USD)ReceivableDistribution1/20/25100.0000200.00200.00Distribution CommentsTax Liability Account1RevenueDistribution1/20/25100.0000200.00200.00Distribution CommentsTax Liability AccountSave and CloseCancel",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "c3f4afb2-7f63-44a4-9ea0-a2e6fe481c29"
          },
          {
              "timestamp": 1737364657596,
              "errorId": "287321a5-1d13-4b45-92c6-c778f594111b",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "7eb43a05-e90d-465d-b67c-1645c3ae3c7c"
          },
          {
              "timestamp": 1737364296749,
              "errorId": "04dab675-f0dc-4d06-a7c1-ce357a289838",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "227758cc-d0a8-4a90-9314-fc1e2f565c3c"
          },
          {
              "timestamp": 1737362472681,
              "errorId": "5acfd231-1e52-4f71-abae-a6568c11e9ee",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "13b5e187-010b-41ae-8000-997383542d22"
          },
          {
              "timestamp": 1737362428289,
              "errorId": "0c927c09-7482-4123-8c48-4ed4cd70add1",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "13b5e187-010b-41ae-8000-997383542d22"
          },
          {
              "timestamp": 1737361973900,
              "errorId": "5e6265ea-1d25-4030-bd23-a836bb6203ab",
              "appType": "ORACLEFUSION",
              "appEventLog": "ErrorThe accounting couldn't be completed. Details: View error details from the View Accounting window.View AccountingOK",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "b7328148-1a05-4198-b972-a0e8e7c47f58"
          },
          {
              "timestamp": 1737360974903,
              "errorId": "62aa1716-fff3-40fa-852b-0b482d158d5c",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "b7328148-1a05-4198-b972-a0e8e7c47f58"
          },
          {
              "timestamp": 1737360927530,
              "errorId": "ba8b94b4-01a3-4005-810b-0c2b1a77ba18",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "b7328148-1a05-4198-b972-a0e8e7c47f58"
          },
          {
              "timestamp": 1737359909454,
              "errorId": "37e89f9c-948a-4ad7-ad06-d85eee268fa0",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "b06577d0-fed8-49db-8f6e-81f49c47bc72"
          },
          {
              "timestamp": 1737358235507,
              "errorId": "43e73cf2-9e82-47e7-90d9-fc3b80032e8e",
              "appType": "ORACLEFUSION",
              "appEventLog": "ErrorThe accounting couldn't be completed. Details: View error details from the View Accounting window.View AccountingOK",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "c2ac7597-c6aa-4fab-9989-12b5368016ff"
          },
          {
              "timestamp": 1737357826010,
              "errorId": "20d16bb0-e14b-4797-ad86-ca08a7182610",
              "appType": "ORACLEFUSION",
              "appEventLog": "ErrorThe accounting couldn't be completed. Details: View error details from the View Accounting window.View AccountingOK",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "48873bd6-877a-469a-88bb-50ce6587ab0c"
          },
          {
              "timestamp": 1737357357959,
              "errorId": "7f4e117a-04ee-4a78-a294-537fb1191bf9",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "c2ac7597-c6aa-4fab-9989-12b5368016ff"
          },
          {
              "timestamp": 1737357320791,
              "errorId": "bb16c849-c26c-4f2b-b93d-f778c1966a53",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "c2ac7597-c6aa-4fab-9989-12b5368016ff"
          },
          {
              "timestamp": 1737357237618,
              "errorId": "4ea9714e-5d21-4c93-8692-5879bfc4ecc5",
              "appType": "ORACLEFUSION",
              "appEventLog": "ErrorThe accounting couldn't be completed. Details: View error details from the View Accounting window.View AccountingOK",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "b777d02b-c33b-45d7-8f17-11f8bb6dc540"
          },
          {
              "timestamp": 1737356738427,
              "errorId": "924768d4-ccb1-4dbc-a228-18903039d2d4",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Unknown User",
              "sessionId": "48873bd6-877a-469a-88bb-50ce6587ab0c"
          },
          {
              "timestamp": 1737356699395,
              "errorId": "ec51a8f1-20e9-4c57-b87b-c05a1568b44a",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Unknown User",
              "sessionId": "48873bd6-877a-469a-88bb-50ce6587ab0c"
          },
          {
              "timestamp": 1737356610649,
              "errorId": "23ad8076-9bd7-4021-bf0f-5df6ce09aa06",
              "appType": "ORACLEFUSION",
              "appEventLog": "ErrorThe accounting couldn't be completed. Details: View error details from the View Accounting window.View AccountingOK",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "bfb8cca9-3a0a-4fba-97d2-8dc88a590ad9"
          },
          {
              "timestamp": 1737356350213,
              "errorId": "21c3e76f-2ca9-4166-9223-5177c3b59b1c",
              "appType": "ORACLEFUSION",
              "appEventLog": "Error: A value is required.You must enter a value.",
              "envName": "FA-EWVE-TEST-SAASFAPROD1",
              "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
              "userId": "Opkey_Cloud_Emp",
              "sessionId": "b777d02b-c33b-45d7-8f17-11f8bb6dc540"
          }
      ]
        result = result.map((log) => {

          const date = new Date(log.timestamp);
          return {
            ...log,
            timeString: date.toLocaleString()
          };
        });

        if (result.length < this.limit) {
          this.allDataLoaded = true;
        }

        if (appendData) {
          this.ub_console_err_log_Data_Source = [...this.ub_console_err_log_Data_Source, ...result];
        } else {
          this.ub_console_err_log_Data_Source = result;
        }

        this.offset += this.limit;
      },
      error: (error: any) => {
        console.warn(error);
        window.loadingStop("#ub-err-logs-grid");

      },
      complete: () => {
        window.loadingStop("#ub-err-logs-grid");
        console.log('Completed loading functional error logs');
      }
    });
  }

  onScroll(): void {
    this.get_console_log_error(null, true); 
  }
}