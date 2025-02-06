import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
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
    public app_service: AppService,
    private msgbox: MsgboxService ) {

  }

  Instance_list: any[] = [];
  selectedRows: any[] = [];
  ngOnInit() {

    this.get_all_Instance()
  }

  searchText: any ;
  clearSearch(){
    this.searchText = ''
    this.filterSearchResults()
  }
  filterSearchResults(){

      if(this.searchText == null){
        return
      }
      if(this.searchText == ''){
        this.Instance_list = this.temp_Instance_list;
       
      }
      if( this.searchText ){
        this.Instance_list = this.temp_Instance_list.filter( (data)=>
          data?.SystemIdentifier.toLowerCase().includes(this.searchText.toLowerCase()) || data?.CreatedByName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ModifiedByName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ModifiedOn.toLowerCase().includes(this.searchText.toLowerCase())) 
       
      }
        

  }

  temp_Instance_list: any;
  get_all_Instance() {
   
    window.loadingStart("#erp-loader", "Please wait");
    let select_applicaton = this.obj_configuration_setting.selected_datasource.select_applicaton_item;

    let form_url = environment.BASE_OPKEY_URL + "ExternalApplicationSettings/GetAllSettingsByApplications";

    let form_data = { str_application: JSON.stringify(select_applicaton) };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
        //   result = {
        //     "OracleFusion": [
        //         {
        //             "SystemIdentifier": "adcascvv",
        //             "EnvironmentType": null,
        //             "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
        //             "ConsumerKey": null,
        //             "ConsumerSecret": null,
        //             "Scope": null,
        //             "Username": "himanshu.sharma@opkey.com",
        //             "Password": "Crestech@123",
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
        //             "SettingsID": "b262f715-2d6f-4bbc-9361-29b3407d1c43",
        //             "SettingsName": null,
        //             "TeamID": "f49abd90-e39a-4934-9760-00a57bf401b5",
        //             "TeamName": "Default OracleFusion Team",
        //             "OrgID": null,
        //             "CreatedByName": "Himanshu Sharma",
        //             "CreatedOn": "Monday, December 16, 2024 8:59:05 AM",
        //             "CreatedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "ModifiedByName": "Himanshu Sharma",
        //             "ModifiedOn": "Monday, December 16, 2024 8:59:05 AM",
        //             "ModifiedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
        //             "Application": "OracleFusion"
        //         },
        //         {
        //             "SystemIdentifier": "oracle dev env",
        //             "EnvironmentType": null,
        //             "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
        //             "ConsumerKey": null,
        //             "ConsumerSecret": null,
        //             "Scope": null,
        //             "Username": "himanshu.sharma@opkey.com",
        //             "Password": "Crestech@123",
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
        //             "SettingsID": "3c9e3d0c-f730-40a9-a074-62e6585c639a",
        //             "SettingsName": null,
        //             "TeamID": "f49abd90-e39a-4934-9760-00a57bf401b5",
        //             "TeamName": "Default OracleFusion Team",
        //             "OrgID": null,
        //             "CreatedByName": "Himanshu Sharma",
        //             "CreatedOn": "Monday, December 16, 2024 8:58:43 AM",
        //             "CreatedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "ModifiedByName": "Himanshu Sharma",
        //             "ModifiedOn": "Monday, December 16, 2024 8:58:43 AM",
        //             "ModifiedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
        //             "Application": "OracleFusion"
        //         },
        //         {
        //             "SystemIdentifier": "Oracle Instance 1",
        //             "EnvironmentType": null,
        //             "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
        //             "ConsumerKey": null,
        //             "ConsumerSecret": null,
        //             "Scope": null,
        //             "Username": "himanshu.sharma@opkey.com",
        //             "Password": "Crestech@1",
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
        //             "SettingsID": "247f9f7a-7492-4452-81dc-727c0a263191",
        //             "SettingsName": null,
        //             "TeamID": "f49abd90-e39a-4934-9760-00a57bf401b5",
        //             "TeamName": "Default OracleFusion Team",
        //             "OrgID": null,
        //             "CreatedByName": "Himanshu Sharma",
        //             "CreatedOn": "Friday, November 8, 2024 7:54:29 AM",
        //             "CreatedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "ModifiedByName": "Himanshu Sharma",
        //             "ModifiedOn": "Friday, November 8, 2024 7:54:29 AM",
        //             "ModifiedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com/",
        //             "Application": "OracleFusion"
        //         },
        //         {
        //             "SystemIdentifier": "scascavf",
        //             "EnvironmentType": null,
        //             "EnvironmentURL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
        //             "ConsumerKey": null,
        //             "ConsumerSecret": null,
        //             "Scope": null,
        //             "Username": "himanshu.sharma@opkey.com",
        //             "Password": "Crestech@123",
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
        //             "SettingsID": "22ad5c29-4859-4c80-8949-e681e03d45bc",
        //             "SettingsName": null,
        //             "TeamID": "f49abd90-e39a-4934-9760-00a57bf401b5",
        //             "TeamName": "Default OracleFusion Team",
        //             "OrgID": null,
        //             "CreatedByName": "Himanshu Sharma",
        //             "CreatedOn": "Monday, December 16, 2024 8:58:55 AM",
        //             "CreatedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "ModifiedByName": "Himanshu Sharma",
        //             "ModifiedOn": "Monday, December 16, 2024 8:58:55 AM",
        //             "ModifiedBy": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
        //             "URL": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
        //             "Application": "OracleFusion"
        //         }
        //     ]
        // }
          this.Instance_list = this.get_instance_item(result);
          this.temp_Instance_list = this.Instance_list
        },
        error: (error: any) => {
          window.loadingStop("#erp-loader");
          this.msgbox.display_error_message(error);
          console.warn(error);
        },
        complete: () => {
          window.loadingStop("#erp-loader");
          console.log("Completed");
        }
      });


  }


  get_instance_item(object) {
   
    let incident = [];
    Object.keys(object).forEach(function (obj, ind) {
      object[obj].forEach(item => {
        incident.push(item);
      })
    })

    return incident;
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
  
    if(this.obj_configuration_setting.selected_erp_analytics.length>0){
      this.obj_error.dispaly_Instances = false;
    }
    else{
      this.obj_error.dispaly_Instances = true;
    }

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
