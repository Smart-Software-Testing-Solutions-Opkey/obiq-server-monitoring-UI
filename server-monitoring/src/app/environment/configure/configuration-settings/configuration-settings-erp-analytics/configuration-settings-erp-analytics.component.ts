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
    var ajax_url = environment.BASE_OPKEY_URL+"ExternalApplicationSettings/GetAllSettingsByApplications"
    var ajax_data = { str_application: JSON.stringify([app]) };

    this.app_service.make_get_server_call(ajax_url, ajax_data)
        .subscribe({
          next: (result: { [appType: string]: any[] }) => {
            result =   {
              "OracleFusion": [
                  {
                      "SystemIdentifier": "oracle dev env",
                      "EnvironmentType": null,
                      "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                      "ConsumerKey": null,
                      "ConsumerSecret": null,
                      "Scope": null,
                      "Username": "Opkey_Cloud_Emp",
                      "Password": "Fusion@123",
                      "ProcessEssLog": false,
                      "SecurityToken": null,
                      "ClientLanguage": null,
                      "InstanceNumber": null,
                      "Port": null,
                      "SID": null,
                      "RefreshToken": null,
                      "TenantName": null,
                      "OracleIntegrationCloudURL": null,
                      "OracleIntegrationCloudInstanceName": null,
                      "SettingsID": "019fc54f-00e7-4a1b-9d6a-0dabe95be6cc",
                      "SettingsName": null,
                      "TeamID": "344ffaa7-083f-44f4-a578-c2a277d31481",
                      "TeamName": "Default OracleFusion Team",
                      "OrgID": null,
                      "CreatedBy": "Himanshu Sharma",
                      "CreatedOn": "Tuesday, October 8, 2024 9:55:08 AM",
                      "ModifiedBy": "Himanshu Sharma",
                      "ModifiedOn": "Tuesday, October 8, 2024 10:17:29 AM",
                      "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                      "Application": "OracleFusion"
                  },
                  {
                    "SystemIdentifier": "oracle dev env",
                    "EnvironmentType": null,
                    "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                    "ConsumerKey": null,
                    "ConsumerSecret": null,
                    "Scope": null,
                    "Username": "Opkey_Cloud_Emp",
                    "Password": "Fusion@123",
                    "ProcessEssLog": false,
                    "SecurityToken": null,
                    "ClientLanguage": null,
                    "InstanceNumber": null,
                    "Port": null,
                    "SID": null,
                    "RefreshToken": null,
                    "TenantName": null,
                    "OracleIntegrationCloudURL": null,
                    "OracleIntegrationCloudInstanceName": null,
                    "SettingsID": "019fc54f-00e7-4a1b-9d6a-0dabe95be6cc",
                    "SettingsName": null,
                    "TeamID": "344ffaa7-083f-44f4-a578-c2a277d31481",
                    "TeamName": "Default OracleFusion Team",
                    "OrgID": null,
                    "CreatedBy": "Himanshu Sharma",
                    "CreatedOn": "Tuesday, October 8, 2024 9:55:08 AM",
                    "ModifiedBy": "Himanshu Sharma",
                    "ModifiedOn": "Tuesday, October 8, 2024 10:17:29 AM",
                    "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                    "Application": "OracleFusion"
                }
              ],
              "SAP": [
                {
                    "SystemIdentifier": "oracle dev env",
                    "EnvironmentType": null,
                    "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                    "ConsumerKey": null,
                    "ConsumerSecret": null,
                    "Scope": null,
                    "Username": "Opkey_Cloud_Emp",
                    "Password": "Fusion@123",
                    "ProcessEssLog": false,
                    "SecurityToken": null,
                    "ClientLanguage": null,
                    "InstanceNumber": null,
                    "Port": null,
                    "SID": null,
                    "RefreshToken": null,
                    "TenantName": null,
                    "OracleIntegrationCloudURL": null,
                    "OracleIntegrationCloudInstanceName": null,
                    "SettingsID": "019fc54f-00e7-4a1b-9d6a-0dabe95be6cc",
                    "SettingsName": null,
                    "TeamID": "344ffaa7-083f-44f4-a578-c2a277d31481",
                    "TeamName": "Default OracleFusion Team",
                    "OrgID": null,
                    "CreatedBy": "Himanshu Sharma",
                    "CreatedOn": "Tuesday, October 8, 2024 9:55:08 AM",
                    "ModifiedBy": "Himanshu Sharma",
                    "ModifiedOn": "Tuesday, October 8, 2024 10:17:29 AM",
                    "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                    "Application": "OracleFusion"
                },
                {
                  "SystemIdentifier": "oracle dev env",
                  "EnvironmentType": null,
                  "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                  "ConsumerKey": null,
                  "ConsumerSecret": null,
                  "Scope": null,
                  "Username": "Opkey_Cloud_Emp",
                  "Password": "Fusion@123",
                  "ProcessEssLog": false,
                  "SecurityToken": null,
                  "ClientLanguage": null,
                  "InstanceNumber": null,
                  "Port": null,
                  "SID": null,
                  "RefreshToken": null,
                  "TenantName": null,
                  "OracleIntegrationCloudURL": null,
                  "OracleIntegrationCloudInstanceName": null,
                  "SettingsID": "019fc54f-00e7-4a1b-9d6a-0dabe95be6cc",
                  "SettingsName": null,
                  "TeamID": "344ffaa7-083f-44f4-a578-c2a277d31481",
                  "TeamName": "Default OracleFusion Team",
                  "OrgID": null,
                  "CreatedBy": "Himanshu Sharma",
                  "CreatedOn": "Tuesday, October 8, 2024 9:55:08 AM",
                  "ModifiedBy": "Himanshu Sharma",
                  "ModifiedOn": "Tuesday, October 8, 2024 10:17:29 AM",
                  "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
                  "Application": "OracleFusion"
              }
            ]
          }
              this.Instance_list = Object.entries(result).flatMap(([appType, instances]) =>
                instances.map(instance => ({
                    ...instance, // Spread all original properties
                    ApplicationType: appType, // Add application type
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
