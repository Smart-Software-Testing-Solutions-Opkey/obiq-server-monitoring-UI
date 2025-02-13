import { Component, Input, output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

import { NotificationsService } from 'src/app/services/notification-service/notifications.service';
import { NotificationType } from 'src/app/global/enums';
import { MsgboxService } from 'src/app/services/msgbox.service';

@Component({
  selector: 'app-configure-right-panel',
  templateUrl: './configure-right-panel.component.html',
  styleUrl: './configure-right-panel.component.scss'
})
export class ConfigureRightPanelComponent {

  constructor(
    public dataService: AppDataService,
    public app_service: AppService,
    private activeModal: NgbActiveModal,
    private msgbox: MsgboxService,
    public service_notification: NotificationsService
  ) { }
  @Input() selectedItem: any;
  @Input() typeSelectedItem: any = "";

  Public_dropdown_Items = [
    {
      text: 'Can View',
      value: 'VIEW'
    },
    {
      text: 'Can Edit',
      value: 'EDIT'
    },
  ];

  selected_dropdown_Item = this.Public_dropdown_Items[0]



  filteredUsers: any[] = [];
  addedUsers: any[] = [];
  searchQuery: string = '';
  users: any[] = [];
  addedEmails: string[] = [];
  accessTypeObj = {
    AccessType: "PRIVATE",
    AccessPermissions: 'VIEW'
  };
  Shared_Access_Type_Obj: { U_ID: string, permission: string }[] = [];
  isDisabled: boolean = false


  ngOnInit(): void {

    this.getAllProjects();

    if (this.typeSelectedItem == 'update') {

      this.accessTypeObj.AccessType = this.selectedItem.selected_view.accessType;
      this.accessTypeObj.AccessPermissions = this.selectedItem.selected_view.viewAccessTypePermision ? this.selectedItem.selected_view.viewAccessTypePermision : 'VIEW';
     
    }
    else if (this.typeSelectedItem == 'create') {

      this.accessTypeObj.AccessType = this.selectedItem.AccessType == "PRIVATE" ? "PRIVATE" : this.selectedItem.AccessType
      // this.accessTypeObj.AccessType = "PRIVATE"
      this.accessTypeObj.AccessPermissions = this.selectedItem.AccessPermisions == "VIEW" ? "VIEW" : this.selectedItem.AccessType
      // this.accessTypeObj.AccessPermissions = "VIEW"
      
    }
  }

  selectAccessType(type: string): void {
    this.accessTypeObj.AccessType = type
    console.log(this.accessTypeObj.AccessPermissions);
    

    if (this.accessTypeObj.AccessType == 'SHARED') {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
    }
  }

  selectViewOrEdit(event): void {
    this.accessTypeObj.AccessPermissions = event.value
    console.log(this.accessTypeObj)

  }
  filterUsers(query: string) {
    if (!query) {
      this.filteredUsers = [];
      return;
    }
    this.filteredUsers = this.users.filter(user =>
      user.Name.toLowerCase().includes(query.toLowerCase()) ||
      user.email_ID.toLowerCase().includes(query.toLowerCase())
    );
  }

  addEmailToTempList(): void {
    if (this.searchQuery.trim()) {
      this.addedEmails.push(this.searchQuery.trim());
      this.searchQuery = '';
    }
  }
  removeTempEmail(email: string): void {
    this.addedEmails = this.addedEmails.filter(e => e !== email);
  }



  deleteUser(index: number): void {
    this.addedUsers.splice(index, 1);
  }
  getAllProjects() {

    if (this.dataService.assignedUser.length != 0) {
      this.users = this.dataService.assignedUser;
      return
    }

    let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";

    let form_data = { P_ID: this.dataService.UserDto.ProjectDTO.P_ID };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          ;

          // this.Show_Project_Access = true
          this.users = result;
          this.dataService.assignedUser = result

        },
        error: (error: any) => {
          this.msgbox.display_error_message(error);
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }


  perform_Shared_Access_Operation(): void {


  }

 
  toggleSharedPermission(dataItem) {

  }

  selectUser(user: any) {
    // Add email to the list if not already added
    if (!this.addedEmails.includes(user.email_ID)) {
      this.addedEmails.push(user.email_ID);
    }
    this.searchQuery = '';
    this.filteredUsers = [];
  }
  addAllEmailsToGrid(): void {
    this.addedEmails.forEach(email => {
      const userToAdd = this.users.find(user =>
        user.email_ID.toLowerCase() === email.toLowerCase() ||
        user.UserName.toLowerCase() === email.toLowerCase()
      );

      userToAdd["permission"] = "VIEW"
      if (userToAdd && !this.addedUsers.some(u => u.U_ID === userToAdd.U_ID)) {
        this.addedUsers.push(userToAdd);
        this.Shared_Access_Type_Obj.push({
          U_ID: userToAdd.U_ID,
          permission: 'VIEW'
        });
      }

    });
    this.isDisabled = false
    this.addedEmails = []; // Clear the temporary list after processing
  }
  removeUser(user: any): void {

    this.addedUsers = this.addedUsers.filter(u => u.U_ID !== user.U_ID);
  }


  finalAccessObj: any = {};

  

  sendEmailInvite() {
    let form_url = environment.BASE_OPKEY_URL + "Observability/SendSharedViewMail";

    let obj = {
      "UserID": this.dataService.UserDto.UserDTO.U_ID,
      "ViewName": this.selectedItem.selected_view.viewName,
      "UserName": this.dataService.UserDto.UserDTO.Name,
      "AccessType": this.accessTypeObj.AccessType,
      "AuthorizedUsers": this.addedUsers.map(val => {
        let obj = { userId: val.U_ID, permmission: val.permission }
        return obj;
      }),
      "ProjectID": this.dataService.UserDto.ProjectDTO.P_ID

    }


    let form_data = { SendViewData: JSON.stringify(obj) }

    this.app_service.make_post_server_call(form_url, form_data).subscribe({

      next: (result: any) => {
        if (result) {
         
          // this.app_service.dataTransmitter( { type : "accesstype_ops" , data : { action : "accesstype_updated" ,selected_accesstype_obj : this.accessTypeObj}})
          this.close_model();
        }
      },
      error: (error: any) => {

        console.warn(error);
        this.msgbox.display_error_message(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });

  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }

  close_right_panel() {
    this.activeModal.dismiss('close modal');
  }




  updatePermission() {
    this.dataService.isEnablePersister = true
      if (this.accessTypeObj.AccessType == this.selectedItem.selected_view.accessType && this.accessTypeObj.AccessPermissions == this.selectedItem.AccessPermissions) 
        { return }
      this.updateSummaryData();
  
    
  }

  createPermission(){
    
    // store data to send in create view
    

    let authorizedUsers : any =[];
    if (this.accessTypeObj.AccessType == 'PRIVATE') {
      authorizedUsers = [ ]
    }
    else if (this.accessTypeObj.AccessType == 'PUBLIC') {
      authorizedUsers = [{ userId: this.dataService.UserDto.UserDTO.U_ID, permmission: this.accessTypeObj.AccessPermissions }]
    }
    else {
      authorizedUsers = this.addedUsers.map(val => {
        let obj = { userId: val.U_ID, permmission: val.permission }
        return obj;
      })
    }
    this.app_service.dataTransmitter( {type : "accesstype_ops", data : {action : "update_accesstype", accesstype_obj:this.accessTypeObj , authorizedUsers :authorizedUsers}})
    this.close_model();

  }

  create_to_update_object() {

    var obj_Update_View = new Object();
    obj_Update_View["viewId"] = this.selectedItem.selected_view.viewId,
      obj_Update_View["viewName"] = this.selectedItem.selected_view.viewName,
      obj_Update_View["accessType"] = this.accessTypeObj.AccessType,
      obj_Update_View["userId"] = this.dataService.UserDto.UserDTO.U_ID
    obj_Update_View["projectId"] = this.dataService.UserDto.ProjectDTO.P_ID
    if (this.accessTypeObj.AccessType == 'PRIVATE') {
      obj_Update_View["authorizedUsers"] = []
    }
    else if (this.accessTypeObj.AccessType == 'PUBLIC') {
      obj_Update_View["authorizedUsers"] = [{ userId: this.dataService.UserDto.UserDTO.U_ID, permmission: this.accessTypeObj.AccessPermissions }]
    }
    else {
      obj_Update_View["authorizedUsers"] = this.addedUsers.map(val => {
        let obj = { userId: val.U_ID, permmission: val.permission }
        return obj;
      })
    }
    return obj_Update_View;
  }
  Update_ViewAccess_Type() {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/updateView";
    let form_data = this.create_to_update_object() as any;


    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {

          if (result) {
            this.selectedItem.selected_view = result;
            this.dataService.selected_view_data.viewSelected.accessType = result.accessType
           
            if (this.accessTypeObj.AccessType == 'SHARED') {
              this.sendEmailInvite();

            } else {
              this.close_model()
            }

          }

        },
        error: (error: any) => {
          this.msgbox.display_error_message(error);
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
          this.service_notification.notifier(NotificationType.success, 'Access Type Updated');
        }
      });
  }
  // onSettingsSelectedData = output<any>()
  updateSummaryData() {

    if (this.dataService.isEnablePersister) {
      this.service_notification.showPersister('Do you want to update the access type?')
      this.dataService.modalSubInstance.result.then((result) => {
      }, (response) => {
      
        if (response == 'Yes') {
          // this.onSettingsSelectedData.emit({ isOpen: 'Settings', selectedViewSettings: this.selectedItem })
          // this.dataService.selectedArtifactData.selectedView = this.selectedItem.selected_view;
          // this.dataService.selectedArtifactData.AccessType = this.selectedItem.selected_view.accessType;
          this.Update_ViewAccess_Type()
          this.dataService.modalSubInstance = null
          return
        }
        else if (response == 'No') {
          this.dataService.modalSubInstance = null
          return
        }
      });
    }
    // else {
    //   this.Update_ViewAccess_Type()
    // }
  }




}
