import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ManagerRightPanelComponent } from 'src/app/environment/manager/right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-e-m-mr-ds-erp-all-functional-error',
  templateUrl: './e-m-mr-ds-erp-all-functional-error.component.html',
  styleUrl: './e-m-mr-ds-erp-all-functional-error.component.scss'
})
export class EMMrDsErpAllFunctionalErrorComponent {
  constructor(
    public service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    private modalService: NgbModal,
    private route: ActivatedRoute

){

}
@Input() analyticsType: any;
@Input() view: any;

limit: number = 20; 
offset: number = 0; 
erp_functional_err_log_Data_Source: any[] = []; 
allDataLoaded: boolean = false; 


subscriptions: Subscription[] = [];
 
viewId: any;
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.viewId = params['viewId'];  
  });
  

  this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
    if(data?.type == "getDataWithTime"){
      this.logToSearch = '';
      this.allDataLoaded = false
      this.offset = 0;
      this.get_all_Functional_log_error(data?.timeFilter)
    }
  }))
this.get_all_Functional_log_error();
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
      modalRef.componentInstance.selectedItem = { callsource: 'Erp_functional_logs_Journey_pannel', data: dataItem };
   }


logToSearch : any;
appType : string = 'ORACLEFUSION'
startDataReceiving(){
  this.app_service.dataReceiver().subscribe(data => {
    
    if (data !== null) {
      
      if (data.callsource == 'LOG_APP_FUNCTIONAL_ERROR' ||  data.callsource == 'erpAllFunctional'){
        this.logToSearch = '';
        this.offset = 0;
        this.allDataLoaded= false;

        if(data.selectedAnalyticsType == 'ERP_ANALYTICS_DATASOURCE' || data.hasOwnProperty('selectedAnalyticsType') == false){
          if( data.action == 'refresh'){
            this.get_all_Functional_log_error()
          }
          else if ( data.action == 'filterChange'){
            this.appType = data.objFilter.modelApplication.toUpperCase()
            this.get_all_Functional_log_error()

          }
          else if(data.action == 'search'){
            this.logToSearch = data.data;
            this.offset = 0;
            this.allDataLoaded = false;
            this.get_all_Functional_log_error()
          }
        }
        

      }
    }  
  });
}
get_all_Functional_log_error(timeFilter?: any, appendData: boolean = false): void {
  window.loadingStart("#erp-err-logs-grid", "Please wait");

  if (this.allDataLoaded) return; 

  const form_url =
    environment.BASE_OBIQ_SERVER_URL +
    'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllAppFunctionalErrorByFilter';

    let form_data = {
      limitBy: this.limit,
      appType: this.appType,
      offset: this.offset,
      "viewId": this.viewId,
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

  this.app_service.make_post_server_call(form_url, form_data).subscribe({
    next: (result: any) => {
      window.loadingStop("#erp-err-logs-grid", "Please wait");

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
        this.erp_functional_err_log_Data_Source = [...this.erp_functional_err_log_Data_Source, ...result];
      } else {
        this.erp_functional_err_log_Data_Source = result;
      }

      this.offset += this.limit;
    },
    error: (error: any) => {
      console.warn(error);
      window.loadingStop("#erp-err-logs-grid", "Please wait");

    },
    complete: () => {
      window.loadingStop("#erp-err-logs-grid");
      console.log('Completed loading functional error logs');
    }
  });
}

onScroll(): void {
  this.get_all_Functional_log_error(null, true); 
}


  
  backToMenu(){
    this.app_service.routeTo('environment','summary')
  }
  filterObj:any = {}
  filterChanged(val){
    this.filterObj = val
   this.get_all_Functional_log_error();
  }
}
