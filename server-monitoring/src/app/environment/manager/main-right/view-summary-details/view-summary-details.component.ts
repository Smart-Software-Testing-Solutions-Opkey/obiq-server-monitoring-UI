import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
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
    private service_data: AppDataService) {
  }
  obj_configuration_setting: any;

  
  Settings_View_Selection: any


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
        if(data.callsource == 'navigatorops'){
          if(this.service_data?.selectedArtifactData?.Settings_View_Selection){
            this.Settings_View_Selection = this.service_data.selectedArtifactData.Settings_View_Selection
          }
          if(this.service_data?.selectedArtifactData?.obj_configuration_setting){
            this.obj_configuration_setting = this.service_data.selectedArtifactData.obj_configuration_setting
          }
          if(this.Settings_View_Selection){

            this.get_All_Summary_of_Selected_View(this.Settings_View_Selection)
          }
        }
      }
      
    });
    this.subscriptions.push(data_receiver);
  }

  get_All_Summary_of_Selected_View(view) {
   
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceLinkedServiceList";

    let form_data = { "viewId": view.viewId };
    window.loadingStart('#totalSection','Please wait..')
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          window.loadingStop("#totalSection");
          this.obj_configuration_setting.selected_erp_analytics = result;
          this.obj_configuration_setting.selected_view = view;
          this.obj_configuration_setting = JSON.parse(JSON.stringify(this.obj_configuration_setting))
        },
        error: (error: any) => {
          window.loadingStop("#totalSection");
          console.warn(error);
        }
      });
  }
  ngAfterViewInit(): void {


  }


}
