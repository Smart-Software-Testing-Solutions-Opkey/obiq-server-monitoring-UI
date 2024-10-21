import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRightPanelComponent } from '../../right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-environment-manager-main-right-log-tab',
  templateUrl: './environment-manager-main-right-log-tab.component.html',
  styleUrl: './environment-manager-main-right-log-tab.component.scss'
})
export class EnvironmentManagerMainRightLogTabComponent implements OnInit,OnDestroy {


  constructor(
    private modalService: NgbModal,
    public service_data: AppDataService,
    public app_service:AppService,
    public dataService:AppDataService
  ){}
  @Input() analyticsType: any;
  @Input() view: any;
  selectedKeys = []
  logDataSource = []
  ngOnInit(): void {
    console.log(this.analyticsType,"this is analythics type in log tab")
    console.log(this.view,"this isnthe view in log tab")
    //this.getLogsChart()
    this.getViewLogs()
  }
  ngOnDestroy(): void {
    
  }
  getLogsChart(){
    window.loadingStart("#Env_manager_main_right", "Please wait");
    //let ajax_url =   environment.BASE_OPKEY_URL+"/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceTabControlList";
    let ajax_url =   "https://myqlm.dev.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    this.app_service.make_post_server_call(ajax_url, {
      "timeSpanEnum":"LAST_7_DAYS",
      "viewId":this.view.viewId,
      "projectId":this.service_data.UserDto.ProjectDTO.P_ID,
      "limitBy":20,
      "offset":0,
      "widgetType":"ESS_LOG_TIMEGRAPH_WIDGET"
  })
    .subscribe({
      next: (result: any) => {
      window.loadingStop("#Env_manager_main_right");
      },
      error: (error: any) => {
        window.loadingStop("#Env_manager_main_right");
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  getViewLogs(){
    debugger;
    window.loadingStart("#Env_manager_main_right", "Please wait");
    //let ajax_url =   environment.BASE_OPKEY_URL+"/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceTabControlList";
    let ajax_url =   "https://myqlm.dev.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    this.app_service.make_post_server_call(ajax_url, {"timeSpanEnum":"LAST_7_DAYS","viewId":this.view.viewId,"projectId":this.service_data.UserDto.ProjectDTO.P_ID,"logToSearch":"","limitBy":20,"offset":0, "widgetType":"ESS_LOG_DATA_WIDGET"})
    .subscribe({
      next: (result: any) => {
        debugger;
      window.loadingStop("#Env_manager_main_right");
      this.logDataSource = result.essLogsList
      },
      error: (error: any) => {
        window.loadingStop("#Env_manager_main_right");
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  onSelectionChange(e){
    debugger
   let dataItem = e.selectedRows[0].dataItem
   const modalRef = this.modalService.open( ManagerRightPanelComponent,{
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
  modalRef.componentInstance.selectedItem = {callsource:'environmentManager',data:dataItem};
  }

    
}
