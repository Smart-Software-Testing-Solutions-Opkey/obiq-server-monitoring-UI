import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ManagerRightPanelComponent } from 'src/app/environment/manager/right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-e-m-mr-ds-ub-all-api-error',
  templateUrl: './e-m-mr-ds-ub-all-api-error.component.html',
  styleUrl: './e-m-mr-ds-ub-all-api-error.component.scss'
})
export class EMMrDsUbAllApiErrorComponent {


  constructor(
    public service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private msgbox: MsgboxService

  ) {

  }
  @Input() analyticsType: any;
  @Input() view: any;

  limit: number = 20;
  offset: number = 0;
  ub_api_err_log_Data_Source: any[] = [];
  allDataLoaded: boolean = false;
  subscriptions: Subscription[] = [];
  viewId: any;

  timeFilter: any; 
  selectedTimeDate: any = {
    type :'setEnum',
    value : "LAST_24_HOUR",
  };
  ngOnInit(): void {

    this.dataService.isAllErrorOpen = true
    this.route.queryParams.subscribe(params => {
      this.viewId = params['viewId'];  
    });
    this.selectedTimeDate = this.dataService.selectedDateTime

    
    this.get_api_log_error();
    this.startDataReceiving();
  }
  ngOnDestroy(): void {
    this.dataService.isAllErrorOpen = false
    this.disposeAllSubscriptions();
  }
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
        windowClass: 'layout-modal-right panel-end'
      });
      modalRef.result.then((result) => {
      }, (response) => {
        if (response == 'close modal') {
          return;
        }
      });
      modalRef.componentInstance.selectedItem = { callsource: 'ub_api_logs_panel', data: dataItem };
   }

  logToSearch: any;
  appType: string = 'ORACLEFUSION'
  startDataReceiving() {
    let data_receiver=this.app_service.dataReceiver().subscribe(data => {

      if (data !== null) {

        if (data.callsource == 'LOG_APP_API_ERROR' || data.callsource == 'ubAllApi') {
          this.logToSearch = '';
          this.offset = 0;
          this.allDataLoaded = false;

          if (data.action == 'refresh') {
            this.get_api_log_error()
          }
          if (data.action == 'search') {
            this.logToSearch = data.data;
            this.offset = 0;
            this.allDataLoaded = false;
            this.get_api_log_error()

          }
          else if (data.action == 'filterChange') {
            this.appType = data.objFilter.modelApplication.toUpperCase()
            this.get_api_log_error()

          }

        }
        else if(data.callsource == 'navigatorAll'){
          this.backToMenu();
        }
      }
    });
    this.subscriptions.push(data_receiver);
  }
  get_api_log_error(timeFilter?: any, appendData: boolean = false): void {
    //window.loadingStop("#ub-err-logs-grid", "Please wait");
    if (this.allDataLoaded) return;
  

    const form_url =
      environment.BASE_OBIQ_SERVER_URL +
      'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllAppApiErrorByFilter';

      let form_data = {
        limitBy: this.limit,
        userId:this.service_data.UserDto.UserDTO.U_ID,
        appType: this.appType,
        offset: this.offset ,
        "viewId": this.viewId, 
        "logToSearch": this.logToSearch
      };

      
      if(this.selectedTimeDate?.type == 'setEnum'){
        form_data["timeSpanEnum"] = this.selectedTimeDate?.value;
      }
      else if(this.selectedTimeDate?.type == "setCustom"){
        form_data["fromTimeInMillis"] = this.selectedTimeDate?.fromTimeInMillis;
        form_data["toTimeInMillis"] = this.selectedTimeDate?.toTimeInMillis;
      }
      

      window.loadingStart("#ub-err-logs-grid", "Please wait");

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
          this.ub_api_err_log_Data_Source = [...this.ub_api_err_log_Data_Source, ...result];
        } else {
          this.ub_api_err_log_Data_Source = result;
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
    this.get_api_log_error( true,true);
  }

  backToMenu() {
    this.app_service.dataTransmitter({ callsource: 'settings', data: 'backToMenu' });
  }
  filterObj: any = {}
  // filterChanged(val) {
  //   this.filterObj = val
  //   this.get_api_log_error();
  // }

  obj_filter = null
  changeTimeFilter(val){
    this.obj_filter = JSON.parse(JSON.stringify(val))
    this.selectedTimeDate = val
    this.allDataLoaded = false;
    this.offset= 0;
    this.logToSearch = ''
    this.ub_api_err_log_Data_Source= []
    this.get_api_log_error();
  }

}
