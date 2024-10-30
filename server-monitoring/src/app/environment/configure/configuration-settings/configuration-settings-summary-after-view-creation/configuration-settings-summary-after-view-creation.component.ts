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
    var result = {
      "Users": [
        {
          "U_ID": "a6419346-5b95-4f16-ae0e-b41f63443333",
          "Name": "rishabh.jain@opkey.com",
          "UserName": "rishabh.jain@opkey.com",
          "email_ID": "rishabh.jain@opkey.com",
          "Is_Enabled": true,
          "CreatedOn": "2024-10-14T01:15:35+05:30",
          "CreatedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
          "LastModifiedOn": "2024-10-14T01:15:35+05:30",
          "LastModifiedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
          "Is_SuperAdmin": false,
          "Email_Verified_On": "0001-01-01T00:00:00",
          "Last_Password_Change": "2024-10-14T01:15:35+05:30",
          "isAutoCreated": false,
          "ForcePasswordChange": false,
          "ApiKey": "0RFACJW8AMQ4WWZ7E6",
          "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
          "Keycloak_SubjectId": null,
          "UserImage": null,
          "idp_Groups": []
        },
        {
          "U_ID": "a89198cc-9d23-4173-a19d-c676ead27fdb",
          "Name": "himanshu.kumar@opkey.com",
          "UserName": "himanshu.kumar@opkey.com",
          "email_ID": "himanshu.kumar@opkey.com",
          "Is_Enabled": true,
          "CreatedOn": "2024-10-14T01:15:35+05:30",
          "CreatedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
          "LastModifiedOn": "2024-10-14T01:15:35+05:30",
          "LastModifiedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
          "Is_SuperAdmin": false,
          "Email_Verified_On": "0001-01-01T00:00:00",
          "Last_Password_Change": "2024-10-14T01:15:35+05:30",
          "isAutoCreated": false,
          "ForcePasswordChange": false,
          "ApiKey": "SL04H8NX0A7DN3ETDN",
          "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
          "Keycloak_SubjectId": null,
          "UserImage": null,
          "idp_Groups": []
        }
      ]
    };
    this.Show_Project_Access = true
    this.users = result.Users;
    return;

    let form_url = environment.BASE_OBIQ_SERVER_URL + "Profile/GetAssignedUsersInProject";

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
