import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-datasource',
  templateUrl: './configuration-settings-datasource.component.html',
  styleUrl: './configuration-settings-datasource.component.scss'
})
export class ConfigurationSettingsDatasourceComponent implements OnInit {

  
  constructor(
    public activeModal: NgbActiveModal,
    public app_service:AppService
  ) { }


  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    this.obj_configuration_setting = obj_configuration_setting;
  }

  ngOnInit() {
   this.getAllWidjets();
  }
 
  ngOnDestroy() {
  //  this.disposeAllSubscriptions();
  
  }

  subscriptions: Subscription[] = [];
 
  data_Source_widjets:any = null;
  selectedServices: { [key: string]: string[] } = {};
  Application_dataSource:any = null;
  User_Behaviour_Analytics_dataSource:any = null;
  System_Diagnostics_dataSource:any = null;
  Test_Automation_Analysis:any = null;
  viewName:String = "";
  Behaviour_Analytics :any=null;
  System_Diagnostics:any = null;
  obj_Data_Source_Selection = {
    viewName: null,
    datasource: null,
  }
  selectedWidget: any = null;
  activeItems: any[] = [];

  getAllApplications(){
 debugger;
//var ajax_url =  environment.BASE_OPKEY_URL+ "ExternalApplicationSettings/GetApplicationAndSettings";
var ajax_url = environment.BASE_OPKEY_URL+"ExternalApplicationSettings/GetApplications"
 
this.app_service.make_get_server_call(ajax_url, {})
  .subscribe({
   
    next: (result: any) => {
      this.Application_dataSource = result;

    },
    error: (error: any) => {
     
      console.warn(error);
    },
    complete: () => {
      console.log("Completed");
    }
  });
}

  getAllWidjets(){
  window.loadingStart("#div-datasource-slection", "Please wait");
  var ajax_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceGroupList";
  this.app_service.make_get_server_call(ajax_url, {})
  .subscribe({
   
    next: (result: any) => {
      window.loadingStop("#div-datasource-slection");
        result.forEach((widjet: any) => {
          if (widjet.name === "ERP Analytics") {
           
            this.getAllApplications();
          }
          if (widjet.name === "User Behaviour Analytics") {    
            this.getUserBehaviourAnalytics();
          }
          if (widjet.name ==="Test Automation Analysis"){

          }
          if( widjet.name ==="System Diagnostics"){

          }
        });
      this.data_Source_widjets = result;
    },
    error: (error: any) => {
      window.loadingStop("#div-datasource-slection");
      console.warn(error);
    },
    complete: () => {
      console.log("Completed");
    }
  });
 
  console.log(this.data_Source_widjets,"these are widjets");

}
 
  select_datasource:any = []

isSelected(widgetName: string, serviceName: string): boolean {
  return this.selectedServices[widgetName] && this.selectedServices[widgetName].includes(serviceName);
}
getUserBehaviourAnalytics(){
 
}

onServiceSelection(widgetName: string, serviceName: string, event: any) {
  debugger;
  const isChecked = event.target.checked;

  if (isChecked) {
    
    if (!this.selectedServices[widgetName]) {
      this.selectedServices[widgetName] = [];
    }

   
    this.selectedServices[widgetName].push(serviceName);
  } else {
   
    this.selectedServices[widgetName] = this.selectedServices[widgetName].filter(item => item !== serviceName);

    
    if (this.selectedServices[widgetName].length === 0) {
      delete this.selectedServices[widgetName];
    }
  }
this.obj_Data_Source_Selection.datasource = this.selectedServices;
this.obj_configuration_setting.selected_datasource = this.obj_Data_Source_Selection

  //this.data_service.widjets_selected_dataSource = this.selectedServices
}

toggleactiveItems(selectedItem :any){
  if (!this.isActive(selectedItem)) {
    this.activeItems.push(selectedItem);
  }
}
isActive(item: any): boolean {
 
  return this.activeItems.includes(item);
}
ShowWSelectedWidjetData(selectedItem: any) {
  this.toggleactiveItems(selectedItem);
  this.data_Source_widjets.forEach((item: any) => {
    item.showServices = false;
    item.display_services = false;
  });

  const selectedIndex = this.data_Source_widjets.findIndex((item: any) => item.id === selectedItem.id);
  if (selectedIndex !== -1) {
    this.data_Source_widjets[selectedIndex].showServices = true;
    this.data_Source_widjets[selectedIndex].display_services = true;
  }
  
}
onInputChange(event:any){
  console.log(event.target.value);
  this.viewName = event.target.value;
  this.obj_Data_Source_Selection.viewName  = this.viewName;
}

  create_environment() {
    // (click)="create_environment()"
    this.activeModal.dismiss('create_environment');
  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }


}
