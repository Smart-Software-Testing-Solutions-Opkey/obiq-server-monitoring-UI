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


  obj_configuration_setting: any;

  obj_error = {
    dispaly_Instances: false,
  }

  @Input('child_data') set child_data({ obj_configuration_setting, dispaly_Instances }) {
    this.obj_configuration_setting = obj_configuration_setting;
    this.obj_error.dispaly_Instances = dispaly_Instances;
    this.bindData()
  }

  constructor(
    public activeModal: NgbActiveModal,
    public app_service: AppService) {

  }

  Instance_list: any[] = [];
  selectedRows: any[] = [];
  ngOnInit() {

    this.get_all_Instance()
  }

  get_all_Instance() {
    debugger;
  //   let result = {
  //     "OracleFusion": [
  //         {
  //             "SystemIdentifier": "Oracle Instance 1",
  //             "EnvironmentType": null,
  //             "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
  //             "ConsumerKey": null,
  //             "ConsumerSecret": null,
  //             "Scope": null,
  //             "Username": "Opkey_Cloud_Emp",
  //             "Password": "Fusion@123",
  //             "ProcessEssLog": true,
  //             "SecurityToken": null,
  //             "ClientLanguage": null,
  //             "InstanceNumber": null,
  //             "Port": null,
  //             "SID": null,
  //             "RefreshToken": null,
  //             "TenantName": null,
  //             "OracleIntegrationCloudURL": null,
  //             "OracleIntegrationCloudInstanceName": null,
  //             "SettingsID": "c66f04d5-4080-43ca-bd43-0a209fe13491",
  //             "SettingsName": null,
  //             "TeamID": "90676406-29c5-4bbf-988e-645642808770",
  //             "TeamName": "Default OracleFusion Team",
  //             "OrgID": null,
  //             "CreatedBy": "himanshu sharma",
  //             "CreatedOn": "Thursday, October 17, 2024 10:24:59 AM",
  //             "ModifiedBy": "himanshu sharma",
  //             "ModifiedOn": "Thursday, October 17, 2024 10:24:59 AM",
  //             "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
  //             "Application": "OracleFusion"
  //         }

  //     ],
  //     "SAP": [
  //         {
  //           "SystemIdentifier": "Rakesh",
  //           "EnvironmentType": null,
  //           "EnvironmentURL": "https://sstsinc2--promtest.my.salesforce.com",
  //           "ConsumerKey": "sap",
  //           "ConsumerSecret": null,
  //           "Scope": null,
  //           "Username": "rakesh.kumar@opkey.com",
  //           "Password": "Rocky@123",
  //           "SecurityToken": null,
  //           "ClientLanguage": "english",
  //           "InstanceNumber": "1234",
  //           "Port": null,
  //           "SID": null,
  //           "RefreshToken": null,
  //           "TenantName": null,
  //           "OracleIntegrationCloudURL": null,
  //           "OracleIntegrationCloudInstanceName": null,
  //           "SettingsID": "2c3b7c9c-54d7-4416-888a-22f90b80153e",
  //           "SettingsName": null,
  //           "TeamID": "8f2c0aa6-418d-4f99-9ab1-a53eae2a587c",
  //           "TeamName": "Default SAP Team",
  //           "OrgID": null,
  //           "CreatedBy": "Rakesh Kumar",
  //           "CreatedOn": "Thursday, January 11, 2024 9:32:59 AM",
  //           "ModifiedBy": "Kunal Ghai",
  //           "ModifiedOn": "Wednesday, August 28, 2024 11:50:50 AM",
  //           "URL": "https://sstsinc2--promtest.my.salesforce.com"
  //         }
  //       ]
  // };

  // this.Instance_list = this.get_instance_item(result);

  // console.log("Instance_list=====", this.Instance_list);

  // return

    let select_applicaton = this.obj_configuration_setting.selected_datasource.select_applicaton_item;

    let form_url = environment.BASE_OPKEY_URL + "ExternalApplicationSettings/GetAllSettingsByApplications";
    //let form_url = "https://myqlm.dev.opkeyone.com/ExternalApplicationSettings/GetAllSettingsByApplications";

    let form_data = { str_application: JSON.stringify(select_applicaton) };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
        if (Object.keys(result).length === 0) {
              let result = {
                "OracleFusion": [
                    {
                        "SystemIdentifier": "Oracle Instance 1",
                        "EnvironmentType": null,
                        "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
                        "ConsumerKey": null,
                        "ConsumerSecret": null,
                        "Scope": null,
                        "Username": "Opkey_Cloud_Emp",
                        "Password": "Fusion@123",
                        "ProcessEssLog": true,
                        "SecurityToken": null,
                        "ClientLanguage": null,
                        "InstanceNumber": null,
                        "Port": null,
                        "SID": null,
                        "RefreshToken": null,
                        "TenantName": null,
                        "OracleIntegrationCloudURL": null,
                        "OracleIntegrationCloudInstanceName": null,
                        "SettingsID": "c66f04d5-4080-43ca-bd43-0a209fe13491",
                        "SettingsName": null,
                        "TeamID": "90676406-29c5-4bbf-988e-645642808770",
                        "TeamName": "Default OracleFusion Team",
                        "OrgID": null,
                        "CreatedBy": "himanshu sharma",
                        "CreatedOn": "Thursday, October 17, 2024 10:24:59 AM",
                        "ModifiedBy": "himanshu sharma",
                        "ModifiedOn": "Thursday, October 17, 2024 10:24:59 AM",
                        "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
                        "Application": "OracleFusion"
                    }
          
                ],
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
                  ]
            };
            this.Instance_list = this.get_instance_item(result);
        } 
        else {
          this.Instance_list = this.get_instance_item(result);
        }
         
        },
        error: (error: any) => {
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });


  }


  get_instance_item(object) {
    debugger;
    let incident = [];
    Object.keys(object).forEach(function (obj, ind) {
      object[obj].forEach(item => {
        incident.push(item);
      })
    })

    return incident;
}


  onCellClick(event: any) {
    debugger;
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


    console.log('Selected Rows:', this.selectedRows);

    this.obj_configuration_setting.selected_erp_analytics = this.selectedRows;

  }
  selectedKeys = []

  bindData(){
    this.selectedKeys = []
    this.selectedRows =  []
    this.obj_configuration_setting?.selected_erp_analytics?.forEach((ele) =>{
      this.selectedKeys.push(ele.SettingsID)
      this.selectedRows.push(ele)
    });
  }


}
