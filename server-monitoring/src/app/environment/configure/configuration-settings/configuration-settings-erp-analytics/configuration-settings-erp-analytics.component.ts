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
    this.createInstance("OracleFusion")
   }

   createInstance(app:string){
    var jsondata = {"Dictionary_Application_Settings": {
    "SAP": [
      {
        "SystemIdentifier": "Rakesh",
        "EnvironmentType": null,
        "EnvironmentURL": "https://sstsinc2--promtest.my.salesforce.com",
        "ConsumerKey": "sap",
        "ConsumerSecret": null,
        "Scope": null,
        "Username": "rakesh.kumar@opkey.com",
        "Password": "Rocky@123",
        "SecurityToken": null,
        "ClientLanguage": "english",
        "InstanceNumber": "1234",
        "Port": null,
        "SID": null,
        "RefreshToken": null,
        "TenantName": null,
        "OracleIntegrationCloudURL": null,
        "OracleIntegrationCloudInstanceName": null,
        "SettingsID": "2c3b7c9c-54d7-4416-888a-22f90b80153e",
        "SettingsName": null,
        "TeamID": "8f2c0aa6-418d-4f99-9ab1-a53eae2a587c",
        "TeamName": "Default SAP Team",
        "OrgID": null,
        "CreatedBy": "Rakesh Kumar",
        "CreatedOn": "Thursday, January 11, 2024 9:32:59 AM",
        "ModifiedBy": "Kunal Ghai",
        "ModifiedOn": "Wednesday, August 28, 2024 11:50:50 AM",
        "URL": "https://sstsinc2--promtest.my.salesforce.com"
      }
    ],
    "Salesforce": [
      {
        "SystemIdentifier": "SalesforceENV",
        "EnvironmentType": null,
        "EnvironmentURL": "https://sstsinc2--promtest.my.salesforce.com",
        "ConsumerKey": "3MVG9_I_oWkIqLrm48ZA4.eYURlcdToLwScZhJEw67WdEFU5LxZ2ul.AH5KzLUyTamQasFRJgeNJwzb.czqRp",
        "ConsumerSecret": "7A89C1DA768004C879B295BD87AC8D78AB5E40978EC96F130566A66FDD7DF7F7",
        "Scope": null,
        "Username": "raunak.choraria@sstsinc.com.promtest",
        "Password": "Crestech@8",
        "SecurityToken": "",
        "ClientLanguage": null,
        "InstanceNumber": null,
        "Port": null,
        "SID": null,
        "RefreshToken": null,
        "TenantName": null,
        "OracleIntegrationCloudURL": null,
        "OracleIntegrationCloudInstanceName": null,
        "SettingsID": "d5460052-311c-478e-960f-58937a50f11b",
        "SettingsName": null,
        "TeamID": "5ff22d3c-50d0-4daf-b73a-8f8a02642e30",
        "TeamName": "Default Salesforce Team",
        "OrgID": "00D010000008kddEAA",
        "CreatedBy": "Lavish Kumar",
        "CreatedOn": "Monday, December 11, 2023 8:17:40 AM",
        "ModifiedBy": "Lavish Kumar",
        "ModifiedOn": "Monday, December 11, 2023 8:17:40 AM",
        "URL": "https://sstsinc2--promtest.my.salesforce.com"
      }
    ],
    "OracleFusion": [
      {
        "SystemIdentifier": "  efrtgtggt",
        "EnvironmentType": null,
        "EnvironmentURL": "tggtgt",
        "ConsumerKey": null,
        "ConsumerSecret": null,
        "Scope": null,
        "Username": "   ",
        "Password": "Welcome@1234",
        "SecurityToken": null,
        "ClientLanguage": null,
        "InstanceNumber": null,
        "Port": null,
        "SID": null,
        "RefreshToken": null,
        "TenantName": null,
        "OracleIntegrationCloudURL": null,
        "OracleIntegrationCloudInstanceName": null,
        "SettingsID": "0141bd3a-d767-4b31-88f7-e331bd32b89f",
        "SettingsName": null,
        "TeamID": "72fd8350-1154-4f48-8ce1-75651040637a",
        "TeamName": "Default OracleFusion Team",
        "OrgID": null,
        "CreatedBy": "Himanshu Kumar",
        "CreatedOn": "Wednesday, June 19, 2024 9:49:28 AM",
        "ModifiedBy": "Kunal Ghai",
        "ModifiedOn": "Friday, August 30, 2024 6:59:55 AM",
        "URL": "tggtgt"
      },
      {
        "SystemIdentifier": "env",
        "EnvironmentType": null,
        "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
        "ConsumerKey": null,
        "ConsumerSecret": null,
        "Scope": null,
        "Username": "Opkey_Cloud_Emp",
        "Password": "Welcome123",
        "SecurityToken": null,
        "ClientLanguage": null,
        "InstanceNumber": null,
        "Port": null,
        "SID": null,
        "RefreshToken": null,
        "TenantName": null,
        "OracleIntegrationCloudURL": null,
        "OracleIntegrationCloudInstanceName": null,
        "SettingsID": "323cef64-ca6e-481f-a750-caf7fe037d08",
        "SettingsName": null,
        "TeamID": "72fd8350-1154-4f48-8ce1-75651040637a",
        "TeamName": "Default OracleFusion Team",
        "OrgID": null,
        "CreatedBy": "Lavish Kumar",
        "CreatedOn": "Saturday, December 9, 2023 3:52:23 PM",
        "ModifiedBy": "Lavish Kumar",
        "ModifiedOn": "Saturday, December 9, 2023 3:52:23 PM",
        "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/"
      },
      {
        "SystemIdentifier": "IF NEW",
        "EnvironmentType": null,
        "EnvironmentURL": "https://fa-euef-test-saasfaprod1.fa.ocs.oraclecloud.com/fscmUI/faces/AtkHomePageWelcome?_adf.ctrl-state=px85e7az9_1&_adf.no-new-window-redirect=true&_afrLoop=11601565257638136&_afrWindowMode=2&_afrWindowId=null&_afrFS=16&_afrMT=screen&_afrMFW=1920&_afrMFH=945&_afrMFDW=1920&_afrMFDH=1080&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=96&_afrMFG=0&_afrMFS=0&_afrMFO=0",
        "ConsumerKey": null,
        "ConsumerSecret": null,
        "Scope": null,
        "Username": "smusunuri@hcg.com",
        "Password": "Oracle@123",
        "SecurityToken": null,
        "ClientLanguage": null,
        "InstanceNumber": null,
        "Port": null,
        "SID": null,
        "RefreshToken": null,
        "TenantName": null,
        "OracleIntegrationCloudURL": null,
        "OracleIntegrationCloudInstanceName": null,
        "SettingsID": "54b9c0a5-3923-416e-bf5b-3293e5840a17",
        "SettingsName": null,
        "TeamID": "72fd8350-1154-4f48-8ce1-75651040637a",
        "TeamName": "Default OracleFusion Team",
        "OrgID": null,
        "CreatedBy": "Nikhil Sharma",
        "CreatedOn": "Thursday, June 13, 2024 12:43:13 PM",
        "ModifiedBy": "Nikhil Sharma",
        "ModifiedOn": "Thursday, June 13, 2024 12:43:13 PM",
        "URL": "https://fa-euef-test-saasfaprod1.fa.ocs.oraclecloud.com/fscmUI/faces/AtkHomePageWelcome?_adf.ctrl-state=px85e7az9_1&_adf.no-new-window-redirect=true&_afrLoop=11601565257638136&_afrWindowMode=2&_afrWindowId=null&_afrFS=16&_afrMT=screen&_afrMFW=1920&_afrMFH=945&_afrMFDW=1920&_afrMFDH=1080&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=96&_afrMFG=0&_afrMFS=0&_afrMFO=0"
      },
      {
        "SystemIdentifier": "Opkey",
        "EnvironmentType": null,
        "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
        "ConsumerKey": null,
        "ConsumerSecret": null,
        "Scope": null,
        "Username": "narava.brahmaji@opkey.com",
        "Password": "Opkey@0624",
        "SecurityToken": null,
        "ClientLanguage": null,
        "InstanceNumber": null,
        "Port": null,
        "SID": null,
        "RefreshToken": null,
        "TenantName": null,
        "OracleIntegrationCloudURL": null,
        "OracleIntegrationCloudInstanceName": null,
        "SettingsID": "774667c5-d747-4558-88ca-ac57af0aefd2",
        "SettingsName": null,
        "TeamID": "72fd8350-1154-4f48-8ce1-75651040637a",
        "TeamName": "Default OracleFusion Team",
        "OrgID": null,
        "CreatedBy": "Brahmaji Narava",
        "CreatedOn": "Wednesday, June 26, 2024 4:44:26 AM",
        "ModifiedBy": "Brahmaji Narava",
        "ModifiedOn": "Wednesday, June 26, 2024 4:44:26 AM",
        "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/"
      },
      {
        "SystemIdentifier": "sad",
        "EnvironmentType": null,
        "EnvironmentURL": "asdass",
        "ConsumerKey": null,
        "ConsumerSecret": null,
        "Scope": null,
        "Username": "asdas",
        "Password": "dasdasd",
        "SecurityToken": null,
        "ClientLanguage": null,
        "InstanceNumber": null,
        "Port": null,
        "SID": null,
        "RefreshToken": null,
        "TenantName": null,
        "OracleIntegrationCloudURL": null,
        "OracleIntegrationCloudInstanceName": null,
        "SettingsID": "9554fb4c-cea8-4818-bacf-9b358f4eb98f",
        "SettingsName": null,
        "TeamID": "72fd8350-1154-4f48-8ce1-75651040637a",
        "TeamName": "Default OracleFusion Team",
        "OrgID": null,
        "CreatedBy": "Kunal Ghai",
        "CreatedOn": "Wednesday, August 28, 2024 12:53:07 PM",
        "ModifiedBy": "Kunal Ghai",
        "ModifiedOn": "Wednesday, August 28, 2024 12:53:07 PM",
        "URL": "asdass"
      }
    ]
    }
  }
  this.Instance_list = Object.entries(jsondata.Dictionary_Application_Settings).flatMap(([appType, instances]) =>
    instances.map(instance => ({
        ...instance, // Spread all original properties
        ApplicationType: appType, // Add application type
    }))
);
return

    var ajax_url = environment.BASE_OPKEY_URL+"ExternalApplicationSettings/GetAllSettingsByApplications"
    var ajax_data = { str_application: JSON.stringify([app]) };

    this.app_service.make_get_server_call(ajax_url, ajax_data)
        .subscribe({
            next: (result: any) => {
                this.Instance_list = result;
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

    console.log('Selected Rows:', this.selectedRows);

    this.obj_configuration_setting.selected_erp_analytics = this.selectedRows;
  }


}
