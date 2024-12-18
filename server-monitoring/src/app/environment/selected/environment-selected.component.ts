import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-environment-selected',
  templateUrl: './environment-selected.component.html',
  styleUrls: ['./environment-selected.component.scss']
})
export class EnvironmentSelectedComponent {
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
    
      this.selectedAnalyticsType = val
    }
    check_env_configuration() {
      
      //this.getAllViews()
      if (!this.service_data.is_env_configure) {
        this.router.navigate(['environment/configure']);
      } else {
  
      }
    }
    
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
      if(Object.values(val.analyticsTypes).length>0){

        let obj = {
          objSettings:val.settingsPanel,
          selectedAnalyticsType: val.analyticsTypes,
          selectedView:val.viewSelected
        }
        this.service_data.leftPanelTotalData = obj
        this.router.navigate(['/environment']);
      }
    }
  
  

  
}
