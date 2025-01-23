import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-environment-manager',
  templateUrl: './environment-manager.component.html',
  styleUrls: ['./environment-manager.component.scss']
})
export class EnvironmentManagerComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service_data: AppDataService,
    private app_service:AppService
  ) { }

  ngOnInit(): void {
    // this.check_env_configuration();
  }

  selectedAnalyticsType: any = null
  changeSelectedAnalytics(val) {
  
    this.selectedAnalyticsType = val
  }
  check_env_configuration() {
    
    //this.getAllViews()
    if (!this.service_data.is_env_configure) {
      this.router.navigate(['environment/configure']);
    } else {

    }
  }
  // getAllViews(){
  //   let result;
  //   if(result.length != 0 ){
  //     this.router.navigate(['/environment']);
  //   }
  //   else{
  //     this.router.navigate(['environment/configure']);
  //   }

  // }
  // getAllVIews(){
  //   debugger;
  //   window.loadingStart("#navigator-left", "Please wait");
  //   let ajax_url =   environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/getAllViewsOfCurrentUser";
  //   this.app_service.make_post_server_call(ajax_url, {"userId":this.dataService.UserDto.UserDTO.U_ID,"projectId":this.dataService.UserDto.ProjectDTO.P_ID})
  //   .subscribe({
  //     next: (result: any) => {



  //     },
  //     error: (error: any) => {
  //       window.loadingStop("#navigator-left");
  //       console.warn(error);
  //     },
  //     complete: () => {
  //       console.log("Completed");
  //     }
  //   });
  // }
  selectedView: any = null
  viewChanged(val) {
    this.selectedView = val
  }
  objSettings: any = {
    isOpen: false,
    selectedViewSettings: {}
  }
  settingsSelected(val) {
    
    this.objSettings = val
  }

  obj_configuration_setting = {
    tab: "datasource",
    title: "Add View",
    selected_datasource: [],
    selected_erp_analytics: [],
    selected_view: null,
    AccessPermisions: {
      "canView": true,
      "canEdit": true
    },
    selectedUids: {
      "userId":"00000000-0000-0000-0000-000000000000",
      "permmission":"ALL"
    },

  }
  leftPanelDataUpdate(val) {
    
    if(this.service_data.isUserAllJourneyOpen == true || this.service_data.isAllErrorOpen == true){
      this.app_service.dataTransmitter({callsource : 'navigatorAll'})
    }
    this.objSettings = val.settingsPanel
    this.selectedAnalyticsType = val.analyticsTypes
   
    this.selectedView = val.viewSelected
    this.service_data.selectedArtifactData = {
      Settings_View_Selection:this.objSettings.selectedViewSettings,
      obj_configuration_setting:this.obj_configuration_setting,
      selectedAnalyticsType:this.selectedAnalyticsType,
      selectedView:this.selectedView,
      allSelectedAnalytics:val.allSelectedAnalytics
    }
    this.app_service.dataTransmitter({callsource:'navigatorops',data:this.service_data.selectedArtifactData});

    
  }

}
