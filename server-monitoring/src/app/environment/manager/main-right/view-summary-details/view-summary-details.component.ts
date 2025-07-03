import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-summary-details',
  templateUrl: './view-summary-details.component.html',
  styleUrl: './view-summary-details.component.scss'
})
export class ViewSummaryDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public app_service: AppService,
    public dataService: AppDataService,
    private service_data: AppDataService,
    private msgbox: MsgboxService) {
  }
  obj_configuration_setting = {
    tab: "datasource",
    title: "Add View",
    selected_datasource: [],
    selected_erp_analytics: [],
    selected_user_behaviour_component: [],
    selected_view: null,
    AccessPermisions: 'VIEW',
    selectedUids: {
      "userId": "00000000-0000-0000-0000-000000000000",
      "permmission": "ALL"
    },

  };


  Settings_View_Selection: any;
  @Input('viewId') set viewId(val) {
    this.service_data.selected_view_data.viewSelected['id'] = val;
    this.get_All_Summary_of_Selected_View(val)
  }


  ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  isDisabled = false;
  ngOnInit(): void {


    if (this.service_data!.totalViews.source == "editDisabled") {


      if (this.service_data && this.service_data.totalViews && this.service_data.totalViews.data) {
        this.service_data.totalViews.data.forEach((views) => {
          if (views && views.viewAccessTypePermision && views.viewAccessTypePermision != null) {
            //     views.authorizedUsers.forEach( (val)=>{
            //       if(val.permmission == 'VIEW'){
            //          this.isDisabled = true
            //       }
            //       else if(val.permmission == 'EDIT'){
            //          this.isDisabled = false
            //       }
            //   }
            // )

            if (views.viewAccessTypePermision == 'VIEW') {
              this.isDisabled = true
            }
            else if (views.viewAccessTypePermision == 'EDIT' || views.viewAccessTypePermision == 'ALL') {
              this.isDisabled = false
            }

          }

        });
      }
    }
  }

  onSettingsSelectedDataObject(val) {


    // this.service_data.selectedArtifactData.selectedView = val.selectedViewSettings.selected_view;
    // this.service_data.selectedArtifactData.AccessType = val.selectedViewSettings.selected_view.accessType;

    // this.obj_configuration_setting.AccessType = this.service_data.selectedArtifactData.selectedView.accessType
    // this.obj_configuration_setting = this.service_data.selectedArtifactData

  }


  get_All_Summary_of_Selected_View(viewId) {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceLinkedServiceList";

    let form_data = { "viewId": viewId };
    window.loadingStart('#totalSection', 'Please wait..')
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          window.loadingStop("#totalSection");

          let erpList: any = []
          let ubList: any = []


          result.forEach((res) => {
            if (res.type == "ERP_ANALYTIC_SERVICE") {
              erpList.push(res)
            }
            else {
              ubList.push(res)
            }
          })
          this.obj_configuration_setting.selected_erp_analytics = erpList
          this.obj_configuration_setting.selected_user_behaviour_component = ubList

          this.obj_configuration_setting.selected_view = this.service_data.selected_view_data.viewSelected;
          this.obj_configuration_setting = JSON.parse(JSON.stringify(this.obj_configuration_setting))
        },
        error: (error: any) => {
          window.loadingStop("#totalSection");
          console.warn(error);
          this.msgbox.display_error_message(error);
        }
      });
  }
  ngAfterViewInit(): void {


  }


}
