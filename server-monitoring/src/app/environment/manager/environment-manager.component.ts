import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-environment-manager',
  templateUrl: './environment-manager.component.html',
  styleUrls: ['./environment-manager.component.scss']
})
export class EnvironmentManagerComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service_data: AppDataService
  ) { }

  ngOnInit(): void {
    // this.check_env_configuration();
  }

  selectedAnalyticsType: any = null
  changeSelectedAnalytics(val) {
    debugger
    this.selectedAnalyticsType = val
  }
  check_env_configuration() {
    debugger;
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
    debugger
    this.objSettings = val
  }

  obj_configuration_setting = {
    tab: "datasource",
    title: "Add View",
    selected_datasource: [],
    selected_erp_analytics: [],
    selected_view: null
  }
  leftPanelDataUpdate(val) {
    debugger
    this.objSettings = val.settingsPanel
    this.selectedAnalyticsType = val.analyticsTypes
    this.selectedView = val.viewSelected
  }

}
