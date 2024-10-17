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
    public app_service:AppService,
  ) {}
  close_model() {
    this.activeModal.dismiss('close modal');
  }

 
  obj_configuration_setting = {
    tab: "datasource",
    is_inner_tab: false,
    title: "Add View",
    viewName:"",
    selected_datasource: [],
    selected_erp_analytics: [],
    selected_system_diagnostics: [],
    ErpAnalytics:{},
    SystemDiagnostics:{},
    active_dataSource_widjets:[],
    AccessType:"PUBLIC",
    selectedUids:{}
  }
  error_obj={
    ViewNameFlag : false,
    DataSourceFlag :false,
    ErpApplication:false,
    SystemDiagnosticsData:false,

  }

  revert_Error_Flags(){
    this.error_obj.ViewNameFlag = false;
    this.error_obj.DataSourceFlag = false;
    this.error_obj.ErpApplication = false;
    this.error_obj.SystemDiagnosticsData = false;
  }
  ValidationCheck(): boolean {
  debugger;
  this.revert_Error_Flags()
  const allWidgets = this.obj_configuration_setting.active_dataSource_widjets;
  const selectedDataSource: any = this.obj_configuration_setting.selected_datasource;
  const isErpOrDiagnostics = allWidgets.some((item)=>item.name == 'ERP Analytics' || item.name == 'System Diagnostics') ; // check krenge if erp and Diagnostics selected h ya nhi 
  if(this.obj_configuration_setting.viewName == ""){
    this.error_obj.ViewNameFlag = true
   return false;
  }
   if (Array.isArray(allWidgets) && allWidgets.length == 0) {
    this.error_obj.DataSourceFlag = true
    return false
  }

  if (Array.isArray(this.obj_configuration_setting.selected_datasource) && isErpOrDiagnostics) {
    this.error_obj.ErpApplication = true
    return false;
  }
  else if (typeof selectedDataSource === 'object' && this.obj_configuration_setting.selected_datasource !== null && this.obj_configuration_setting.selected_datasource && isErpOrDiagnostics) {
    for (const key in selectedDataSource) {
      if (selectedDataSource.hasOwnProperty(key)) {
        const dataSource = selectedDataSource[key];
    
        if (dataSource) {
          // Check kr rhe  'ERP Analytics' aur 'SystemDiagnostics' properties ke liye
          const hasErpAnalytics = dataSource.hasOwnProperty('ERP Analytics');
          const hasSystemDiagnostics = dataSource.hasOwnProperty('System Diagnostics');

          // if (!hasErpAnalytics ) { // hiiden as i dont have data for now && !hasSystemDiagnostics
            
          // } 
          if (!hasErpAnalytics) {

            this.error_obj.ErpApplication = true;
            
            return false;
          }
          //  else if (!hasSystemDiagnostics) {
          //   alert("'SystemDiagnostics validation implimented nhi hai");
          // }
  
        } 
      }
    }
  }
  return true;
}
  next() {
    debugger;
    if (!this.ValidationCheck()) {
      return; 
    }

    console.log("obj_configuration_setting==", this.obj_configuration_setting);

    if (this.obj_configuration_setting.tab == "datasource") { 
      this.obj_configuration_setting.tab = "ERP_Analytics";
      this.obj_configuration_setting.title = "Add ERP Analytics";
      this.obj_configuration_setting.is_inner_tab = true;
    }
    // else if (this.obj_configuration_setting.tab == "ERP_Analytics") { 
    //   this.obj_configuration_setting.tab = "system_diagnostics";
    //   this.obj_configuration_setting.title = "Add System Diagnostics";
    //   this.obj_configuration_setting.is_inner_tab = true;
    // }
    // else if (this.obj_configuration_setting.tab == "system_diagnostics") { 
    //   this.obj_configuration_setting.tab = "view_summary";
    //   this.obj_configuration_setting.title = "Create View";
    //   this.obj_configuration_setting.is_inner_tab = false;
    // }
    else if (this.obj_configuration_setting.tab == "ERP_Analytics") { 
      this.obj_configuration_setting.tab = "view_summary";
      this.obj_configuration_setting.title = "Create View";
      this.obj_configuration_setting.is_inner_tab = false;
    }
    else if (this.obj_configuration_setting.tab == "view_summary") { 
      this.obj_configuration_setting.is_inner_tab = false;
      alert("error"); 
      
    }

  }

  back() {
    debugger;
    if (this.obj_configuration_setting.tab == "view_summary") { 
      this.obj_configuration_setting.tab = "system_diagnostics";
      this.obj_configuration_setting.title = "Add System Diagnostics";
      this.obj_configuration_setting.is_inner_tab = true;
    }
    else if (this.obj_configuration_setting.tab == "system_diagnostics") { 
      this.obj_configuration_setting.tab = "ERP_Analytics"; 
      this.obj_configuration_setting.title = "Add ERP Analytics";
      this.obj_configuration_setting.is_inner_tab = true;
    }
    else if (this.obj_configuration_setting.tab == "ERP_Analytics") { 
      this.obj_configuration_setting.tab = "datasource"; 
      this.obj_configuration_setting.title = "Create View";
      this.obj_configuration_setting.is_inner_tab = false;
    }
    else if (this.obj_configuration_setting.tab == "datasource") { 
      this.obj_configuration_setting.is_inner_tab = false;
      alert("error");
    }

  }
  //Base/getAllProjects
  createLinkedDataSourceObject() {
    debugger;
    var linkedDataarray = [];

    this.obj_configuration_setting.active_dataSource_widjets.forEach(widget => {
       
        let linkedDataObject = {
            dataSourceId: widget.id,
            linkedData: []
        };

      
        if (widget.selectedRows && widget.selectedRows.length > 0) {
          
            widget.selectedRows.forEach(selectedRow => {
                linkedDataObject.linkedData.push({
                    ApplicationType: selectedRow.ApplicationType, 
                    SettingsID: selectedRow.SettingsID
                });
            });
        }
      linkedDataarray.push(linkedDataObject);
    });

    return linkedDataarray;
}

  create_View_object(){
    debugger;
    console.log(this.obj_configuration_setting,"create Object Config settings")
    var obj_Create_View = new Object();
    obj_Create_View["viewName"] = this.obj_configuration_setting.viewName;
    obj_Create_View["description"] = ""
    obj_Create_View["userId"] = this.service_data.UserDto.UserDTO.U_ID
    obj_Create_View["userName"] = this.service_data.UserDto.UserDTO.Name
    obj_Create_View["projectId"] = this.service_data.UserDto.ProjectDTO.P_ID
    obj_Create_View["accessType"] = this.obj_configuration_setting.AccessType
    obj_Create_View["authorizedUsers"] = this.obj_configuration_setting.AccessType === 'PRIVATE' ? [{ userId: this.service_data.UserDto.UserDTO.U_ID, permmission: "ALL" }] :this.obj_configuration_setting.AccessType === 'PUBLIC' ? [] :this.obj_configuration_setting.selectedUids;
    obj_Create_View["linkedDataSource"] = this. createLinkedDataSourceObject();
    return obj_Create_View;
  }
  createView(){
    debugger;
    var View_obj = this.create_View_object() as any;
    window.loadingStart("#div-datasource-slection", "Please wait");
    
    //let ajax_url =   environment.BASE_OPKEY_URL+"/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/createView";
    let ajax_url =   "https://myqlm.dev.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/createView";
    this.app_service.make_post_server_call(ajax_url, View_obj)
    .subscribe({
      next: (result: any) => {
        window.loadingStop("#div-datasource-slection");
        
     
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

  finish() {
    debugger;
    this.createView()
    this.service_data.is_env_configure = true;
    this.close_model();
    this.router.navigate(['/environment']);
  }

}
