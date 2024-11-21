import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-system-diagnostics',
  templateUrl: './configuration-settings-system-diagnostics.component.html',
  styleUrl: './configuration-settings-system-diagnostics.component.scss'
})
export class ConfigurationSettingsSystemDiagnosticsComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
   private router: Router,
   private route: ActivatedRoute,
   public service_data: AppDataService,
   public app_service: AppService,){

 }
  obj_configuration_setting:any;
  selected_System_Diagnostics_Rows: any[] = [];
  obj_error = {
    display_SystemDiagnosticsData: false,
  }

  @Input('child_data') set child_data({ obj_configuration_setting ,display_SystemDiagnosticsData}) {
    this.obj_configuration_setting = obj_configuration_setting;

    this.obj_error.display_SystemDiagnosticsData = display_SystemDiagnosticsData;
    this.bindData()
  }
  Instance_list:any;

  ngOnInit(): void {
    this.get_System_Diagnostics_Services();
  }
  onCellClick(event:any){

  }
  on_Selection_Change_System_diagnostics(event:any){
      debugger;
  
      const selectedRow = event.selectedRows;
      const deselectedRow = event.deselectedRows;
  
      selectedRow.forEach((row: any) => {
        this.selected_System_Diagnostics_Rows.push(row.dataItem);
      });
  
      deselectedRow.forEach((row: any) => {
        const index = this.selected_System_Diagnostics_Rows.findIndex(item => item.SystemIdentifier === row.dataItem.SystemIdentifier);
        if (index !== -1) {
          this.selected_System_Diagnostics_Rows.splice(index, 1);
        }
      });
  
  
      console.log('Selected Rows:', this.selected_System_Diagnostics_Rows);
  
      this.obj_configuration_setting.selected_system_diagnostics = this.selected_System_Diagnostics_Rows;
      if(this.obj_configuration_setting.selected_system_diagnostics.length>0)this.obj_error.display_SystemDiagnosticsData = false;
    }
 
  selectedKeys = []
  bindData(){
    debugger;
    this.selectedKeys = this.obj_configuration_setting?.selected_system_diagnostics?.map(ele =>ele.OBIQ_Agent);

  }
  
  
  get_System_Diagnostics_Services(){
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryObiqAgentController/getAllAvailableObiqAgents";  
    let form_data = {};

    this.app_service.make_get_server_call(form_url, form_data)
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
  
}
