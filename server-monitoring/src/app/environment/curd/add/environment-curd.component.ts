import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';



@Component({
  selector: 'app-environment-curd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './environment-curd.component.html',
  styleUrls: ['./environment-curd.component.scss']
})
export class EnvironmentCurdComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    public app_service:AppService
  ) { }
  ngOnInit() {
   this.getAllWidjets();
   this.getAllApplications();
   this.getUserBehaviourAnalytics();
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
  var ajax_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceGroupList";
  this.app_service.make_get_server_call(ajax_url, {})
  .subscribe({
   
    next: (result: any) => {
     console.log(result,"this is result");
      this.data_Source_widjets = result;
    },
    error: (error: any) => {
      console.warn(error);
    },
    complete: () => {
      console.log("Completed");
    }
  });
 
  console.log(this.data_Source_widjets,"these are widjets")
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
console.log(this.selectedServices)
  //this.data_service.widjets_selected_dataSource = this.selectedServices
}


ShowWSelectedWidjetData(selectedItem: any) {
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

  create_environment() {
    // (click)="create_environment()"
    this.activeModal.dismiss('create_environment');
  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }

}
