import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-view-summary',
  templateUrl: './configuration-settings-view-summary.component.html',
  styleUrl: './configuration-settings-view-summary.component.scss'
})
export class ConfigurationSettingsViewSummaryComponent implements OnInit {

  constructor(
    public app_service: AppService,
    public dataService: AppDataService) {
  }

  obj_configuration_setting: any;
  Selected_grid_dataSource: any;
  selected_grid_System_Diagnostics:any;
  Show_Project_Access: boolean = false;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
  
    debugger;
    this.obj_configuration_setting = obj_configuration_setting;
    console.log("obj_configuration_setting===++++++++++++++++++++++++++++++++++++++++++++", obj_configuration_setting);
  }
  ngOnInit() {
    this.get_all_summary(this.obj_configuration_setting)
  }

  get_all_summary(selectionData) {
    debugger;
    this.Selected_grid_dataSource = selectionData.selected_erp_analytics;
    this.selected_grid_System_Diagnostics = selectionData.selected_system_diagnostics;
    

    console.log(this.Selected_grid_dataSource);

  }

  selectedAccessType: string = 'PRIVATE';
  accessTypes: string[] = ['PUBLIC', 'PRIVATE', 'SHARED'];
  users: any[] = [];
  selectedUsers: any[] = [];

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
    this.obj_configuration_setting.selectedUids = this.selectedUsers;

    console.log(this.selectedUsers);
  }


  getAllProjects() {
    debugger;
    //   var  result ={
    //     "Users": [
    //         {
    //             "U_ID": "a6419346-5b95-4f16-ae0e-b41f63443333",
    //             "Name": "rishabh.jain@opkey.com",
    //             "UserName": "rishabh.jain@opkey.com",
    //             "email_ID": "rishabh.jain@opkey.com",
    //             "Is_Enabled": true,
    //             "CreatedOn": "2024-10-14T01:15:35+05:30",
    //             "CreatedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
    //             "LastModifiedOn": "2024-10-14T01:15:35+05:30",
    //             "LastModifiedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
    //             "Is_SuperAdmin": false,
    //             "Email_Verified_On": "0001-01-01T00:00:00",
    //             "Last_Password_Change": "2024-10-14T01:15:35+05:30",
    //             "isAutoCreated": false,
    //             "ForcePasswordChange": false,
    //             "ApiKey": "0RFACJW8AMQ4WWZ7E6",
    //             "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
    //             "Keycloak_SubjectId": null,
    //             "UserImage": null,
    //             "idp_Groups": []
    //         },
    //         {
    //             "U_ID": "a89198cc-9d23-4173-a19d-c676ead27fdb",
    //             "Name": "himanshu.kumar@opkey.com",
    //             "UserName": "himanshu.kumar@opkey.com",
    //             "email_ID": "himanshu.kumar@opkey.com",
    //             "Is_Enabled": true,
    //             "CreatedOn": "2024-10-14T01:15:35+05:30",
    //             "CreatedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
    //             "LastModifiedOn": "2024-10-14T01:15:35+05:30",
    //             "LastModifiedBy": "ceee256b-d766-4e0c-baa0-871f3d60e41a",
    //             "Is_SuperAdmin": false,
    //             "Email_Verified_On": "0001-01-01T00:00:00",
    //             "Last_Password_Change": "2024-10-14T01:15:35+05:30",
    //             "isAutoCreated": false,
    //             "ForcePasswordChange": false,
    //             "ApiKey": "SL04H8NX0A7DN3ETDN",
    //             "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
    //             "Keycloak_SubjectId": null,
    //             "UserImage": null,
    //             "idp_Groups": []
    //         }
    //     ]
    // };  
    // this.Show_Project_Access = true
    // this.users = result.Users;
    // return;

    //let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";
    let form_url = "https://myqlm.preprod.opkeyone.com/Profile/GetAssignedUsersInProject";

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

  onCellClick(event) {

  }

  onSelectionChange(event) {

  }


}
