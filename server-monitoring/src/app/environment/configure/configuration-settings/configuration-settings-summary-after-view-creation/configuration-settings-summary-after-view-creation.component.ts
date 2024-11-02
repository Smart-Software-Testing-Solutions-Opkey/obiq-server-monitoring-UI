import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-summary-after-view-creation',
  templateUrl: './configuration-settings-summary-after-view-creation.component.html',
  styleUrl: './configuration-settings-summary-after-view-creation.component.scss'
})
export class ConfigurationSettingsSummaryAfterViewCreationComponent implements OnInit, AfterViewInit {
  constructor(
    public app_service: AppService,
    public dataService: AppDataService) {
  }
  obj_configuration_setting: any;
  selectedAccessType: string;
  accessTypes: string[] = ['PUBLIC', 'PRIVATE', 'SHARED'];
  users: any[] = [];
  selectedUsers: any[] = [];
  Show_Project_Access: boolean = false;
  Selected_grid_dataSource: any;
  groupedDataSource: any = {};
  @Input('child_data')
  set child_data({ obj_configuration_setting }) {
    debugger;
    if (obj_configuration_setting !== this.obj_configuration_setting) {
      this.obj_configuration_setting = obj_configuration_setting;


      this.onConfigurationSettingChange();
    }
  }

  onCellClick(event) {

  }
  onConfigurationSettingChange(): void {
    if (this.obj_configuration_setting) {

      this.obj_configuration_setting.selected_erp_analytics = this.obj_configuration_setting.selected_erp_analytics.map(item => {
        return {
          ...item,
          value: JSON.parse(item.value)
        };
      });
      this.Selected_grid_dataSource = this.obj_configuration_setting.selected_erp_analytics
    }
    debugger;
    this.selectedAccessType = this.obj_configuration_setting.selected_view.accessType
    console.log('Configuration setting has changed:', this.obj_configuration_setting);
  }


  ngOnInit(): void {
  }
  ngAfterViewInit(): void {

  }
  onAccessTypeChange(selectedOption: string) {
    debugger;
    this.selectedAccessType = selectedOption;
    if (this.selectedAccessType == "SHARED") {
      this.getAllProjects()
    }
    else {
      this.Show_Project_Access = false
    }
    this.obj_configuration_setting.AccessType = this.selectedAccessType
    console.log('Access Type Changed:', selectedOption);

  }

  onUserSelect(user: any, event: Event): void {
    debugger;
    if ((event.target as HTMLInputElement).checked) {

      this.selectedUsers.push({
        userId: user.U_ID,
        permmission: "ALL" // abhi ke liye sabke liye All 
      });
    } else {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.userId !== user.U_ID);
    }


    console.log(this.selectedUsers);
  }
  create_to_update_object() {
    debugger;
    var obj_Update_View = new Object();
    obj_Update_View["viewId"] = this.obj_configuration_setting.selected_view.viewId,
      obj_Update_View["viewName"] = this.obj_configuration_setting.selected_view.viewName,
      obj_Update_View["accessType"] = this.selectedAccessType,
      obj_Update_View["projectId"] = this.dataService.UserDto.ProjectDTO.P_ID
    obj_Update_View["authorizedUsers"] = this.selectedAccessType === 'PRIVATE' ? [{ userId: this.dataService.UserDto.UserDTO.U_ID, permmission: "ALL" }] : this.selectedAccessType === 'PUBLIC' ? [] : this.selectedUsers;
    return obj_Update_View;
  }
  Update_ViewAccess_Type() {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/updateView";

    let form_data = this.create_to_update_object() as any;

    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {

        },
        error: (error: any) => {

          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }

  getAllProjects() {
    debugger;
   
    let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";

    let form_data = { P_ID: this.dataService.UserDto.ProjectDTO.P_ID };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {

          this.Show_Project_Access = true
          this.users = result;
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
