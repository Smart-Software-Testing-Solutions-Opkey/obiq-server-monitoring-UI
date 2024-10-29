import { Component, Input } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-configure-right-panel',
  templateUrl: './configure-right-panel.component.html',
  styleUrl: './configure-right-panel.component.scss'
})
export class ConfigureRightPanelComponent {
 
  constructor(    
    public dataService: AppDataService,
     public app_service: AppService,
  ) { }
  @Input() selectedItem: any;
  showSharedInput:boolean = false;
  filteredUsers: any[] = [];
  addedUsers: any[] = [];
  searchQuery: string = '';
  users: any[] = [];
  accessTypeObj = {
    AccessType: "PRIVATE",
    AccessPermisions: {
      "canView":true,
      "canEdit":true
    }
  };
  Shared_Access_Type_Obj: { U_ID: string, permission: string }[] = [];
  selectAccessType(type: string): void {
   debugger;
   this.showSharedInput = false;
   this.accessTypeObj.AccessType = type;
   this.Shared_Access_Type_Obj = [];
   this. accessTypeObj = {
    AccessType: "PRIVATE",
    AccessPermisions: {
      "canView":true,
      "canEdit":true
    }
  };
   if(type == "SHARED"){
    this.showSharedInput = true;
    this.Shared_Access_Type_Obj["AccessType"] = type;
    this.perform_Shared_Access_Operation();
   }
   
  }

 
  selectViewOrEdit(option: string, event: Event): void {
    event.preventDefault(); 
    event.stopPropagation();
  
   if(option == "view"){
    this.accessTypeObj.AccessPermisions.canEdit = false;
   }
   else if(option == "edit"){
    this.accessTypeObj.AccessPermisions.canView = true
    this.accessTypeObj.AccessPermisions.canEdit = true
   }
 
  }
  getAllProjects() {
    debugger;
      var  result ={
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
                "idp_Groups": [],
                "UserImage":"assets/images/default/profile.png"
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
                "UserImage": "assets/images/default/profile.png",
                "idp_Groups": []
            }
        ]
    };  
    
   
    this.users = result.Users;
    return;
    //let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";
    // let form_url = "https://myqlm.preprod.opkeyone.com/Profile/GetAssignedUsersInProject";

    // let form_data = { P_ID: this.dataService.UserDto.ProjectDTO.P_ID };

    // this.app_service.make_get_server_call(form_url, form_data)
    //   .subscribe({

    //     next: (result: any) => {
    //       this.showSharedInput = true
    //       // this.Show_Project_Access = true
    //       // this.users = result;
    //     },
    //     error: (error: any) => {

    //       console.warn(error);
    //     },
    //     complete: () => {
    //       console.log("Completed");
    //     }
    //   });
  }

 
  perform_Shared_Access_Operation(): void {
  debugger;
    
  }

  ngOnInit(): void {
    
  this.getAllProjects();
  }
  toggleSharedPermission(dataItem){
    debugger;
  }
  filterUsers(query: string){
    debugger;
    this.filteredUsers = this.users.filter(user =>
      user.email_ID.toLowerCase().includes(query.toLowerCase()) || 
      user.UserName.toLowerCase().includes(query.toLowerCase())
    );
  }
  addSelectedUser(searchQuery: string): void {
    debugger;
    const userToAdd = this.users.find(user =>
      user.email_ID.toLowerCase() === searchQuery.toLowerCase() || 
      user.UserName.toLowerCase() === searchQuery.toLowerCase()
    );
  
 
    if (userToAdd && !this.addedUsers.some(u => u.U_ID === userToAdd.U_ID)) {
      this.addedUsers.push(userToAdd);
      this.Shared_Access_Type_Obj.push({
        U_ID: userToAdd.U_ID,
        permission: 'Can Edit'
      });
    }
  
   
    this.searchQuery = '';  
    this.filteredUsers = [];  
  }
  removeUser(user: any): void {
    debugger;
    this.addedUsers = this.addedUsers.filter(u => u.U_ID !== user.U_ID);
  }
  updateUserPermission(user: any, selectedPermission: string): void {
   
    const userIndex = this.addedUsers.findIndex(u => u.U_ID === user.U_ID);
    if (userIndex !== -1) {
      this.addedUsers[userIndex].permission = selectedPermission;
    }
    const sharedUserIndex = this.Shared_Access_Type_Obj.findIndex(obj => obj.U_ID === user.U_ID);
    if (sharedUserIndex !== -1) {
      this.Shared_Access_Type_Obj[sharedUserIndex].permission = selectedPermission;
    }
    console.log(this.Shared_Access_Type_Obj, 'Updated Shared_Access_Type_Obj');
  }
  

  InviteUsers(){

  }
}
