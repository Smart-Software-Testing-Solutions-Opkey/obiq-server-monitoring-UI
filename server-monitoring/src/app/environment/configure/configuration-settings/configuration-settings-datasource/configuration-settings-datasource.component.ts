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
    public app_service: AppService
  ) { }


  obj_configuration_setting: any;

  obj_error = {
    dispaly_viewName: false,
    dispaly_DataSource: false,
    display_ErpApplication: false,
    display_SystemDiagnosticsData: false
  }
  
  @Input('child_data') set child_data({ obj_configuration_setting, dispaly_viewName, dispaly_DataSource, display_ErpApplication, display_SystemDiagnosticsData }) {
    this.obj_configuration_setting = obj_configuration_setting;
    this.obj_error.dispaly_viewName = dispaly_viewName;
    this.obj_error.dispaly_DataSource = dispaly_DataSource;
    this.obj_error.display_ErpApplication = display_ErpApplication;
    this.obj_error.display_SystemDiagnosticsData = display_SystemDiagnosticsData;
  }

  ngOnInit() {
    this.get_all_datasource();
    this.restet_obj_datasource();
  }

  obj_datasource_widget = {
    viewName: "",
    select_datasource_item: [],
    select_applicaton_item: [],
    select_systemDiagnostics_item: []
  }

  restet_obj_datasource() {
    this.obj_configuration_setting.selected_datasource = this.obj_datasource_widget;
    this.obj_error.dispaly_viewName = false;
    this.obj_error.dispaly_DataSource = false;
    this.obj_error.display_ErpApplication = false;
    this.obj_error.display_SystemDiagnosticsData = false;
    this.datasource_item_name = "";
  }

  modal_name: null;
  data_Source_widjets = [];

  get_all_datasource() {

    window.loadingStart("#div-datasource-slection", "Please wait");
    let form_url = environment.BASE_OPKEY_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceGroupList";
    //let form_url = "https://myqlm.dev.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceGroupList";
    let form_data = {};

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          window.loadingStop("#div-datasource-slection");
          result.forEach((widjet: any) => {

            if (widjet.name === "ERP Analytics") {

              this.get_AllApplications();
            }
            if (widjet.name === "User Behaviour Analytics") {
             
            }
            if (widjet.name === "Test Automation Analysis") {

            }
            if (widjet.name === "System Diagnostics") {
              this.get_datasource_system_diagnostics(widjet.id);
            }
          });

          this.data_Source_widjets = result;

          this.data_Source_widjets.forEach(item => {
            item['isChecked'] = false;
          })
          
        },
        error: (error: any) => {
          window.loadingStop("#div-datasource-slection");
          console.warn(error);
        },
        complete: () => {
          window.loadingStop("#div-datasource-slection");
          console.log("Completed");
        }
      });


  }


  datasource_application = [];

  get_AllApplications() {

  //   this.datasource_application = [
  //     "OracleFusion",
  //     "SAP",
  //     "Salesforce",
  //     "PeopleSoft",
  //     "Workday",
  //     "OracleEBS",
  //     "MSDynamicsFSO",
  //     "VeevaVault",
  //     "Coupa",
  //     "OracleIntegrationCloud"
  // ];
  // return

    let form_url = environment.BASE_OPKEY_URL + "ExternalApplicationSettings/GetApplications";
    // let form_url = "https://myqlm.dev.opkeyone.com/ExternalApplicationSettings/GetApplications";
    let form_data = {};

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          this.datasource_application = result;
        },
        error: (error: any) => {

          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }


  datasource_system_diagnostics = [];

  get_datasource_system_diagnostics(widjet_id) {
    let form_url = environment.BASE_OPKEY_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceServiceList";
    //let form_url = "https://myqlm.dev.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceServiceList";
    let form_data = {id:widjet_id};
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          this.datasource_system_diagnostics = result;
        },
        error: (error: any) => {

          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }


  onInputChange(event:any){
    console.log(event.target.value);
    this.modal_name = event.target.value;
    this.obj_datasource_widget.viewName = event.target.value;
    this.obj_configuration_setting.selected_datasource = this.obj_datasource_widget;
  }

  datasource_item_name = "";
  select_datasource(dataItem) {
    debugger;
    this.datasource_item_name = dataItem.name;
    dataItem.isChecked = !dataItem.isChecked;
    if(dataItem.isChecked) {
      this.obj_datasource_widget.select_datasource_item.push(dataItem);
    } else {
      let index = this.obj_datasource_widget.select_datasource_item.findIndex(item => item == dataItem);
      this.obj_datasource_widget.select_datasource_item.splice(index, 1);
    }

    this.obj_configuration_setting.selected_datasource = this.obj_datasource_widget;
    

  }

  select_applicaton(dataItem, event) {
    debugger;
    if(event.target.checked) {
      this.obj_datasource_widget.select_applicaton_item.push(dataItem);
    } else {
      let index = this.obj_datasource_widget.select_applicaton_item.findIndex(item => item == dataItem);
      this.obj_datasource_widget.select_applicaton_item.splice(index, 1);
    }

    this.obj_configuration_setting.selected_datasource = this.obj_datasource_widget;
    
  }

  select_systemDiagnostics(dataItem, event) {
    debugger;
    if(event.target.checked) {
      this.obj_datasource_widget.select_systemDiagnostics_item.push(dataItem);
    } else {
      let index = this.obj_datasource_widget.select_systemDiagnostics_item.findIndex(item => item == dataItem);
      this.obj_datasource_widget.select_systemDiagnostics_item.splice(index, 1);
    }

    this.obj_configuration_setting.selected_datasource = this.obj_datasource_widget;
  }


}
