
import { Component, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ManagerRightPanelComponent } from 'src/app/environment/manager/right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-mr-ds-ub-console-error-tab',
  templateUrl: './e-m-mr-ds-ub-console-error-tab.component.html',
  styleUrl: './e-m-mr-ds-ub-console-error-tab.component.scss'
})

export class EMMrDsUbConsoleErrorTabComponent implements OnDestroy{
  constructor(
      public service_data: AppDataService,
      public app_service: AppService,
      public dataService: AppDataService,
      private modalService: NgbModal,
      private msgbox: MsgboxService 
  ){

  }
@Input() analyticsType: any;
  @Input() view: any;
  @Input('dataTimeData') set dataTimeData({obj_filter}){

    this.logToSearch = '';
    this.allDataLoaded = false
    this.offset = 0;
    this.timeFilter = obj_filter
    this.get_console_log_error(this.timeFilter)
   
}
 
  limit: number = 20; 
  offset: number = 0; 
  ub_console_err_log_Data_Source: any[] = []; 
  allDataLoaded: boolean = false; 
  subscriptions: Subscription[] = [];

  timeFilter : any;
  ngOnInit(): void {
  this.startDataReceiving();
  }
   onSelectionChange(e) {
     
      let dataItem = e.dataItem
      const modalRef = this.modalService.open(ManagerRightPanelComponent, {
        backdrop: 'static',
        keyboard: false,
        size: 'full',
        centered: true,
        windowClass: 'layout-modal-right panel-end'
      });
      modalRef.result.then((result) => {
      }, (response) => {
        if (response == 'close modal') {
          return;
        }
      });
      modalRef.componentInstance.selectedItem = { callsource: 'ub_console_logs_panel', data: dataItem };
   }

   ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
 
  subscriptions1: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions1.forEach((subscription) => subscription.unsubscribe());
  }

  logToSearch : any;
  appType : string = 'ORACLEFUSION'
  startDataReceiving(){
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      
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
            this.get_console_log_error(this.timeFilter)

          }
          else if ( data.action == 'filterChange'){
            this.appType = data.objFilter.modelApplication.toUpperCase()
            this.get_console_log_error()

          }

        }
      }  
    });
    this.subscriptions1.push(data_receiver);
  }
   get_console_log_error(timeFilter?: any, appendData: boolean = false): void {
    
   
    if (this.allDataLoaded) return; 
   
    const form_url =environment.BASE_OBIQ_SERVER_URL +'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllAppConsoleErrorByFilter';

  
    let form_data = {
      limitBy: this.limit,
      userId:this.service_data.UserDto.UserDTO.U_ID,
      appType: this.appType,
      offset: this.offset ,
      "viewId": this.view.viewId,
      "logToSearch": this.logToSearch
    };
    if(timeFilter?.type == 'setEnum'){
      form_data["timeSpanEnum"] = timeFilter?.value;
    }
    else if(timeFilter?.type == "setCustom"){
      form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
      form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
    }
    else{
      form_data["timeSpanEnum"] ="LAST_24_HOUR";
    }

    window.loadingStart("#ub-err-logs-grid", "Please wait");
    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
        window.loadingStop("#ub-err-logs-grid", "Please wait");
       
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
        this.msgbox.display_error_message(error);

      },
      complete: () => {
        window.loadingStop("#ub-err-logs-grid");
        console.log('Completed loading functional error logs');
      }
    });
  }

  onScroll(): void {
    this.get_console_log_error(this.timeFilter, true); 
  }
}