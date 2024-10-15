import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-erp-analytics',
  templateUrl: './configuration-settings-erp-analytics.component.html',
  styleUrl: './configuration-settings-erp-analytics.component.scss'
})
export class ConfigurationSettingsErpAnalyticsComponent {

    
  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    this.obj_configuration_setting = obj_configuration_setting;
  }

  constructor( 
    public activeModal: NgbActiveModal,
    public app_service:AppService){

  }
  Instance_list :any=null
  selectedRows: any[] = [];
  ngOnInit() {
  
    this.createInstance()
   }

   createInstance(){
    debugger;
    // var result =  {"SAP": [
    //   {
    //     "SystemIdentifier": "Rakesh",
    //     "EnvironmentType": null,
    //     "EnvironmentURL": "https://sstsinc2--promtest.my.salesforce.com",
    //     "ConsumerKey": "sap",
    //     "ConsumerSecret": null,
    //     "Scope": null,
    //     "Username": "rakesh.kumar@opkey.com",
    //     "Password": "Rocky@123",
    //     "SecurityToken": null,
    //     "ClientLanguage": "english",
    //     "InstanceNumber": "1234",
    //     "Port": null,
    //     "SID": null,
    //     "RefreshToken": null,
    //     "TenantName": null,
    //     "OracleIntegrationCloudURL": null,
    //     "OracleIntegrationCloudInstanceName": null,
    //     "SettingsID": "2c3b7c9c-54d7-4416-888a-22f90b80153e",
    //     "SettingsName": null,
    //     "TeamID": "8f2c0aa6-418d-4f99-9ab1-a53eae2a587c",
    //     "TeamName": "Default SAP Team",
    //     "OrgID": null,
    //     "CreatedBy": "Rakesh Kumar",
    //     "CreatedOn": "Thursday, January 11, 2024 9:32:59 AM",
    //     "ModifiedBy": "Kunal Ghai",
    //     "ModifiedOn": "Wednesday, August 28, 2024 11:50:50 AM",
    //     "URL": "https://sstsinc2--promtest.my.salesforce.com"
    //   }, {
    //     "SystemIdentifier": "Rakesh",
    //     "EnvironmentType": null,
    //     "EnvironmentURL": "https://sstsinc2--promtest.my.salesforce.com",
    //     "ConsumerKey": "sap",
    //     "ConsumerSecret": null,
    //     "Scope": null,
    //     "Username": "rakesh.kumar@opkey.com",
    //     "Password": "Rocky@123",
    //     "SecurityToken": null,
    //     "ClientLanguage": "english",
    //     "InstanceNumber": "1234",
    //     "Port": null,
    //     "SID": null,
    //     "RefreshToken": null,
    //     "TenantName": null,
    //     "OracleIntegrationCloudURL": null,
    //     "OracleIntegrationCloudInstanceName": null,
    //     "SettingsID": "2c3b7c9c-54d7-4416-888a-22f90b80153e",
    //     "SettingsName": null,
    //     "TeamID": "8f2c0aa6-418d-4f99-9ab1-a53eae2a587c",
    //     "TeamName": "Default SAP Team",
    //     "OrgID": null,
    //     "CreatedBy": "Rakesh Kumar",
    //     "CreatedOn": "Thursday, January 11, 2024 9:32:59 AM",
    //     "ModifiedBy": "Kunal Ghai",
    //     "ModifiedOn": "Wednesday, August 28, 2024 11:50:50 AM",
    //     "URL": "https://sstsinc2--promtest.my.salesforce.com"
    //   }
    // ],}
    // this.Instance_list = Object.entries(result).flatMap(([appType, instances]) =>
    //   instances.map(instance => ({
    //       ...instance, // saari origanal properties spred kii 
    //       ApplicationType: appType, //Application Type Add KRdia
    //   }))
    // )
    var selectedData = this.obj_configuration_setting.selected_datasource.datasource;
    var  erpAnalyticsValues = {}
    if (selectedData["ERP Analytics"]) {
      erpAnalyticsValues = selectedData["ERP Analytics"];
    }
    console.log(selectedData,"this is selected data ")
    var ajax_url = environment.BASE_OPKEY_URL+"ExternalApplicationSettings/GetAllSettingsByApplications"
    var ajax_data = { str_application: JSON.stringify(erpAnalyticsValues) };

    this.app_service.make_get_server_call(ajax_url, ajax_data)
        .subscribe({
          next: (result: { [appType: string]: any[] }) => {
            
              this.Instance_list = Object.entries(result).flatMap(([appType, instances]) =>
                instances.map(instance => ({
                    ...instance, // saari origanal properties spred kii 
                    ApplicationType: appType, //Application Type Add KRdia
                }))
              )
            },
            
            error: (error: any) => {
                console.warn(error);
            },
            complete: () => {
                console.log("Completed");
            }
        });
      
  
  }
  
   ngOnDestroy() {
    
    
    }
    onCellClick(event: any) {
      const clickedRowData = event.dataItem; 
      console.log(clickedRowData);
  }
  onSelectionChange(event: any) {
    debugger;
    const selectedRow = event.selectedRows;
    const deselectedRow = event.deselectedRows;
    selectedRow.forEach((row: any) => {
      this.selectedRows.push(row.dataItem);
    });

    deselectedRow.forEach((row: any) => {
      const index = this.selectedRows.findIndex(item => item.SystemIdentifier === row.dataItem.SystemIdentifier);
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      }
    });
    const targetId = "574cab25-6703-40da-aabf-48ff22668900"; 
    const targetObject = this.obj_configuration_setting.active_dataSource_widjets.find(obj => obj.id === targetId);

    if (targetObject) {
       
        if (!targetObject.selectedRows) {
            targetObject.selectedRows = []; 
        }
        
      
        targetObject.selectedRows = [...this.selectedRows]; 
    }
    console.log('Selected Rows:', this.selectedRows);

    this.obj_configuration_setting.selected_erp_analytics = this.selectedRows;
  }


}
