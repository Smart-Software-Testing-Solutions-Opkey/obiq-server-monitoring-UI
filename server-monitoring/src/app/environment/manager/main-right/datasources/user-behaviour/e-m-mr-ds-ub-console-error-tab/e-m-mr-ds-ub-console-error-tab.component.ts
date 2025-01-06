
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
  }
  //  onSelectionChange(e) {
  //    console.log(this.analyticsType,"this is analytics type ");
  //    console.log(this.view,"this is the view")
  //     let dataItem = e.dataItem
  //     const modalRef = this.modalService.open(ManagerRightPanelComponent, {
  //       backdrop: 'static',
  //       keyboard: false,
  //       size: 'full',
  //       centered: true,
  //       windowClass: 'layout-modal-right panel-end w-75'
  //     });
  //     modalRef.result.then((result) => {
  //     }, (response) => {
  //       if (response == 'close modal') {
  //         return;
  //       }
  //     });
  //     modalRef.componentInstance.selectedItem = { callsource: 'Erp_functional_logs_Journey_pannel', data: dataItem };
  //  }
   get_console_log_error(timeFilter?: any, appendData: boolean = false): void {
    window.loadingStart("#ub-err-logs-grid", "Please wait");

    if (this.allDataLoaded) return; 

    const form_url =
      environment.BASE_OBIQ_SERVER_URL +
      'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllAppConsoleErrorByFilter';

    const form_data = {
      timeSpanEnum: 'LAST_7_DAYS',
      userId:this.dataService.UserDto.UserDTO.U_ID,
      limitBy: this.limit,
      appType: 'ORACLEFUSION',
      offset: this.offset 
    };

    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
        window.loadingStop("#ub-err-logs-grid");

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