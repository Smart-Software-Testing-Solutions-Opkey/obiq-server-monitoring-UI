import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-configuration-settings',
  templateUrl: './configuration-settings.component.html',
  styleUrl: './configuration-settings.component.scss'
})
export class ConfigurationSettingsComponent {

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
    public service_data: AppDataService,
    public app_service: AppService,
  ) { }
  close_model() {
    this.activeModal.dismiss('close modal');
  }


  obj_configuration_setting = {
    tab: "datasource",
    is_value_selection: false,
    title: "Add View",
    AccessType: "",
    AccessPermisions: {
      "canView": true,
      "canEdit": true
    },
    selectedUids: {
      "permmission":""
    },
    selected_datasource: null,
    selected_erp_analytics: [],
    selected_system_diagnostics: [],
    selected_user_behaviour_component: [],
    selected_view: null,
    visitedTabs:[]
  }


  datasource_item = [];
  next() {
    debugger;
    if (!this.ValidationCheck()) {
      return;
    }

    console.log("obj_configuration_setting==**********************", this.obj_configuration_setting);

    this.datasource_item = [];

    if (this.obj_configuration_setting.selected_datasource != null && this.obj_configuration_setting.selected_datasource.select_datasource_item.length != 0) {

      this.datasource_item = this.obj_configuration_setting.selected_datasource.select_datasource_item;

    }

    if (this.obj_configuration_setting.tab == "datasource") {
      debugger
      // if (this.datasource_item.findIndex(item => item.name == 'ERP Analytics') != -1) {
      //   this.obj_configuration_setting.tab = 'ERP Analytics';
      //   this.obj_configuration_setting.title = "Add ERP Analytics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      // else if (this.datasource_item.findIndex(item => item.name == 'System Diagnostics') != -1) {
      //   this.obj_configuration_setting.tab = 'System Diagnostics';
      //   this.obj_configuration_setting.title = "Add System Diagnostics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      this.obj_configuration_setting.visitedTabs.push(this.obj_configuration_setting.tab)
      if(this.datasource_item.length>0){
        let item = this.datasource_item[0]
        this.obj_configuration_setting.tab = item.name;
        this.obj_configuration_setting.title = "Add" + item.name;
        this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "view_summary";
        this.obj_configuration_setting.title = "Create View";
        this.obj_configuration_setting.is_value_selection = false;
      }

    }
    else if (this.obj_configuration_setting.tab == "ERP Analytics") {
      // if (this.datasource_item.findIndex(item => item.name == 'System Diagnostics') != -1) {
      //   this.obj_configuration_setting.tab = 'System Diagnostics';
      //   this.obj_configuration_setting.title = "Add System Diagnostics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      this.obj_configuration_setting.visitedTabs.push(this.obj_configuration_setting.tab)

      let ind = this.datasource_item.findIndex(item => item.name == 'ERP Analytics')
      if((ind+1) != (this.datasource_item.length)){
       let item = this.datasource_item[ind+1]
       this.obj_configuration_setting.tab = item.name;
       this.obj_configuration_setting.title = "Add" + item.name;
       this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "view_summary";
      this.obj_configuration_setting.title = "Create View";
      this.obj_configuration_setting.is_value_selection = false;
      }
    }
      else if (this.obj_configuration_setting.tab == "User Behaviour Analytics") {
        this.obj_configuration_setting.visitedTabs.push(this.obj_configuration_setting.tab)

      let ind = this.datasource_item.findIndex(item => item.name == 'User Behaviour Analytics')
      if((ind+1) != (this.datasource_item.length)){
       let item = this.datasource_item[ind+1]
       this.obj_configuration_setting.tab = item.name;
       this.obj_configuration_setting.title = "Add" + item.name;
       this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "view_summary";
        this.obj_configuration_setting.title = "Create View";
        this.obj_configuration_setting.is_value_selection = false;
      }
    }
    else if (this.obj_configuration_setting.tab == "System Diagnostics") {
      this.obj_configuration_setting.visitedTabs.push(this.obj_configuration_setting.tab)
    
      let ind = this.datasource_item.findIndex(item => item.name == 'System Diagnostics')
      if((ind+1) != (this.datasource_item.length)){
       let item = this.datasource_item[ind+1]
       this.obj_configuration_setting.tab = item.name;
       this.obj_configuration_setting.title = "Add" + item.name;
       this.obj_configuration_setting.is_value_selection = true;
      }
      else {
      this.obj_configuration_setting.tab = "view_summary";
      this.obj_configuration_setting.title = "Create View";
      this.obj_configuration_setting.is_value_selection = false;
      }
    }
    else if (this.obj_configuration_setting.tab == "Test Automation Analysis") {
      this.obj_configuration_setting.visitedTabs.push(this.obj_configuration_setting.tab)

      let ind = this.datasource_item.findIndex(item => item.name == 'Test Automation Analysis')
      if((ind+1) != (this.datasource_item.length)){
       let item = this.datasource_item[ind+1]
       this.obj_configuration_setting.tab = item.name;
       this.obj_configuration_setting.title = "Add" + item.name;
       this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "view_summary";
      this.obj_configuration_setting.title = "Create View";
      this.obj_configuration_setting.is_value_selection = false;
      }
    }
    // else if (this.obj_configuration_setting.tab == "System Diagnostics") {
    //   this.obj_configuration_setting.tab = "view_summary";
    //   this.obj_configuration_setting.title = "Create View";
    //   this.obj_configuration_setting.is_value_selection = false;
    // }
    else if (this.obj_configuration_setting.tab == "view_summary") {
      this.obj_configuration_setting.is_value_selection = false;
      alert("error");

    }

  }

  back() {
    debugger;

    if (this.obj_configuration_setting.tab == "view_summary") {

      // if (this.datasource_item.findIndex(item => item.name == 'System Diagnostics') != -1) {
      //   this.obj_configuration_setting.tab = "System Diagnostics";
      //   this.obj_configuration_setting.title = "Add System Diagnostics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      // else if (this.datasource_item.findIndex(item => item.name == 'ERP Analytics') != -1) {
      //   this.obj_configuration_setting.tab = "ERP Analytics";
      //   this.obj_configuration_setting.title = "Add ERP Analytics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      if(this.datasource_item?.length>0){
        let item = this.datasource_item[this.datasource_item.length-1]
        this.obj_configuration_setting.tab = item.name;
        this.obj_configuration_setting.title = "Add" + item.name;
        this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "datasource";
        this.obj_configuration_setting.title = "Create View";
        this.obj_configuration_setting.is_value_selection = false;
      }

    }
    else if (this.obj_configuration_setting.tab == "System Diagnostics") {

      // if(this.datasource_item.findIndex(item => item.name == 'ERP Analytics') != -1) {
      //   this.obj_configuration_setting.tab = "ERP Analytics";
      //   this.obj_configuration_setting.title = "Add ERP Analytics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      let ind = this.datasource_item.findIndex(item => item.name == 'System Diagnostics')
      if((ind-1)>=0){
        let item = this.datasource_item[ind-1]
        this.obj_configuration_setting.tab = item.name;
        this.obj_configuration_setting.title = "Add" + item.name;
        this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "datasource";
        this.obj_configuration_setting.title = "Create View";
        this.obj_configuration_setting.is_value_selection = false;
      }
    }
    else if (this.obj_configuration_setting.tab == "Test Automation Analysis") {

      // if(this.datasource_item.findIndex(item => item.name == 'ERP Analytics') != -1) {
      //   this.obj_configuration_setting.tab = "ERP Analytics";
      //   this.obj_configuration_setting.title = "Add ERP Analytics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      let ind = this.datasource_item.findIndex(item => item.name == 'Test Automation Analysis')
      if((ind-1)>=0){
        let item = this.datasource_item[ind-1]
        this.obj_configuration_setting.tab = item.name;
        this.obj_configuration_setting.title = "Add" + item.name;
        this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "datasource";
        this.obj_configuration_setting.title = "Create View";
        this.obj_configuration_setting.is_value_selection = false;
      }
    }
    else if (this.obj_configuration_setting.tab == "ERP Analytics") {

      // if(this.datasource_item.findIndex(item => item.name == 'ERP Analytics') != -1) {
      //   this.obj_configuration_setting.tab = "ERP Analytics";
      //   this.obj_configuration_setting.title = "Add ERP Analytics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      let ind = this.datasource_item.findIndex(item => item.name == 'ERP Analytics')
      if((ind-1)>=0){
        let item = this.datasource_item[ind-1]
        this.obj_configuration_setting.tab = item.name;
        this.obj_configuration_setting.title = "Add" + item.name;
        this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "datasource";
        this.obj_configuration_setting.title = "Create View";
        this.obj_configuration_setting.is_value_selection = false;
      }
    }
    else if (this.obj_configuration_setting.tab == "User Behaviour Analytics") {

      // if(this.datasource_item.findIndex(item => item.name == 'ERP Analytics') != -1) {
      //   this.obj_configuration_setting.tab = "ERP Analytics";
      //   this.obj_configuration_setting.title = "Add ERP Analytics";
      //   this.obj_configuration_setting.is_value_selection = true;
      // }
      let ind = this.datasource_item.findIndex(item => item.name == 'User Behaviour Analytics')
      if((ind-1)>=0){
        let item = this.datasource_item[ind-1]
        this.obj_configuration_setting.tab = item.name;
        this.obj_configuration_setting.title = "Add" + item.name;
        this.obj_configuration_setting.is_value_selection = true;
      }
      else {
        this.obj_configuration_setting.tab = "datasource";
        this.obj_configuration_setting.title = "Create View";
        this.obj_configuration_setting.is_value_selection = false;
      }
    }
    // else if (this.obj_configuration_setting.tab == "ERP Analytics") {
    //   this.obj_configuration_setting.tab = "datasource";
    //   this.obj_configuration_setting.title = "Create View";
    //   this.obj_configuration_setting.is_value_selection = false;
    // }
    else if (this.obj_configuration_setting.tab == "datasource") {
      this.obj_configuration_setting.is_value_selection = false;
      alert("error");
    }
    this.obj_configuration_setting.visitedTabs.pop()
    this.reset_error();

  }


  // Reason validation------------------------------

  dispaly_viewName: boolean = false;
  dispaly_DataSource: boolean = false;
  display_ErpApplication: boolean = false;
  display_SystemDiagnosticsData: boolean = false;
  dispaly_Instances: boolean = false;

  ValidationCheck() {

    this.reset_error();

    if (this.obj_configuration_setting.tab == "datasource") {

      if (this.obj_configuration_setting.selected_datasource.viewName == "") {
        this.dispaly_viewName = true;
        return false;
      }
      else if (this.obj_configuration_setting.selected_datasource.select_datasource_item.length == 0) {
        this.dispaly_DataSource = true;
        return false;
      }
      else if (this.obj_configuration_setting.selected_datasource.select_datasource_item.length != 0) {

        let is_display = true;

        this.obj_configuration_setting.selected_datasource.select_datasource_item.forEach((item: any) => {

          if (item.name == 'ERP Analytics') {
            if (this.obj_configuration_setting.selected_datasource.select_applicaton_item.length == 0) {
              this.display_ErpApplication = true;
              is_display = false;
            }
          }
          else if (item.name == 'System Diagnostics') {
            if (this.obj_configuration_setting.selected_datasource.select_systemDiagnostics_item.length == 0) {
              this.display_SystemDiagnosticsData = true;
              is_display = false;
            }
          }
        });


        return is_display;
      }


    }
    
    if(this.obj_configuration_setting.tab == "ERP Analytics") { 

      if (this.obj_configuration_setting.selected_erp_analytics.length == 0) {
        this.dispaly_Instances = true;
        return false;
      }

    }

    return true;


  }

  reset_error() {
    this.dispaly_viewName = false;
    this.dispaly_DataSource = false;
    this.display_ErpApplication = false;
    this.display_SystemDiagnosticsData = false;
    this.dispaly_Instances = false;
  }

  //-------------------------------------------------------

  // finish() {
  //   debugger;
  //   this.service_data.is_env_configure = true;
  //   this.close_model();
  //   this.router.navigate(['/environment']);
  // }


  finish() {
    debugger;
    this.createView()

  }

  createView() {
    debugger;

    window.loadingStart("#div-datasource-slection", "Please wait");

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/createView";

    let form_data = this.create_View_object() as any;

    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          window.loadingStop("#div-datasource-slection");
          this.service_data.is_env_configure = true;
          this.close_model();   // calling GetAllViewds after View Creation
          this.app_service.dataTransmitter("viewCreated");
          this.router.navigate(['/environment']);

        },
        error: (error: any) => {
          window.loadingStop("#div-datasource-slection");
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }

  create_View_object() {
    debugger;
    console.log(this.obj_configuration_setting, "create Object Config settings")
    var obj_Create_View = new Object();
    obj_Create_View["viewName"] = this.obj_configuration_setting.selected_datasource.viewName;
    obj_Create_View["description"] = ""
    obj_Create_View["userId"] = this.service_data.UserDto.UserDTO.U_ID
    obj_Create_View["userName"] = this.service_data.UserDto.UserDTO.Name
    obj_Create_View["projectId"] = this.service_data.UserDto.ProjectDTO.P_ID
    obj_Create_View["accessType"] = this.obj_configuration_setting.AccessType === "" ? 'PRIVATE' : this.obj_configuration_setting.AccessType
    obj_Create_View["authorizedUsers"] = this.obj_configuration_setting.AccessType === 'PRIVATE' ? [{ userId: this.service_data.UserDto.UserDTO.U_ID, permmission: "ALL" }] : this.obj_configuration_setting.AccessType === 'PUBLIC' ? [{userId: this.service_data.UserDto.UserDTO.U_ID, permmission: this.obj_configuration_setting.selectedUids.permmission}] : this.obj_configuration_setting.selectedUids;
    obj_Create_View["linkedDataSource"] = this.createLinkedDataSourceObject();
    return obj_Create_View;
  }


  createLinkedDataSourceObject() {
    debugger;
    var linkedDataarray = [];

    this.obj_configuration_setting.selected_datasource.select_datasource_item.forEach(widget => {

      let linkedDataObject = {
        dataSourceId: widget.id,
        linkedData: []
      };


      if (widget.name == "ERP Analytics") {
        this.obj_configuration_setting.selected_erp_analytics.forEach(selectedRow => {
          linkedDataObject.linkedData.push({
            name: selectedRow.SystemIdentifier,
            value: selectedRow.SettingsID
          });
        });
      }
      linkedDataarray.push(linkedDataObject);
    });

    return linkedDataarray;
  }


}
