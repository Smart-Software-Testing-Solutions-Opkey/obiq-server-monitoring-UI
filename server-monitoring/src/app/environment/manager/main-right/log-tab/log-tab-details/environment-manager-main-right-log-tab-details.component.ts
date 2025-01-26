import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-environment-manager-main-right-log-tab-details',
  templateUrl: './environment-manager-main-right-log-tab-details.component.html',
  styleUrl: './environment-manager-main-right-log-tab-details.component.scss'
})
export class EnvironmentManagerMainRightLogTabDetailsComponent implements OnInit, OnDestroy {

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
    //public service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    private cdr: ChangeDetectorRef,
    private msgbox: MsgboxService 

  ) {

  }
  selectedData: any
  dataKeys: any = []
  dataValues: any = []
  tabSelected: string = 'Trace'
  trace_Selected_data: any = [];
  receivedTimeRange: any
  @Input('child_data') set child_data({ selectedData }) {
    
    this.selectedData = selectedData
    this.dataKeys = Object.keys(this.selectedData)
    this.dataValues = Object.values(this.selectedData);
    console.log(this.selectedData, "this is selected Data in Log tab details main right")

  }

  ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
 
  subscriptions: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        if(data.callsource == 'timeExplorerChart'){

          this.receivedTimeRange = data.data;
          console.log('Received Data:', this.receivedTimeRange);
  
          // Manually trigger change detection
          this.cdr.detectChanges();
        }
      }
    });
    this.getTraceData();
    this.subscriptions.push(data_receiver);
  }

  onCellClick(event: any) {

  }
  on_trace_Selection_Change_(event: any) {

  }
  getTraceData() {
    window.loadingStart("#Env_manager_main_right", "Please wait");
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    this.app_service.make_post_server_call(ajax_url, {
      "essLogId": this.selectedData.dataId,
      "widgetType": "ESS_LOG_METADATA_WIDGET"
    })
      .subscribe({
        next: (result: any) => {
          window.loadingStop("#Env_manager_main_right");
          console.log(result, "+++++++++++++++++++++++++++++++++++")
          this.trace_Selected_data.push(result);


        },
        error: (error: any) => {
          window.loadingStop("#Env_manager_main_right");
          console.warn(error);
          this.msgbox.display_error_message(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });

  }

  changeSelectedTab(tab) {
    this.tabSelected = tab
  }

}
