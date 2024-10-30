import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
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
    public service_data: AppDataService,
    public app_service: AppService,) {

  }
  selectedData: any
  dataKeys: any = []
  dataValues: any = []
  tabSelected: string = 'Trace'
  trace_Selected_data: any = [];
  @Input('child_data') set child_data({ selectedData }) {
    debugger
    this.selectedData = selectedData
    this.dataKeys = Object.keys(this.selectedData)
    this.dataValues = Object.values(this.selectedData);
    console.log(this.selectedData, "this is selected Data in Log tab details main right")

  }
  ngOnInit(): void {
    this.getTraceData();
  }
  onCellClick(event: any) {

  }
  on_trace_Selection_Change_(event: any) {

  }
  getTraceData() {
    window.loadingStart("#Env_manager_main_right", "Please wait");
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
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
        },
        complete: () => {
          console.log("Completed");
        }
      });

  }
  ngOnDestroy(): void {

  }
  changeSelectedTab(tab) {
    this.tabSelected = tab
  }

}
