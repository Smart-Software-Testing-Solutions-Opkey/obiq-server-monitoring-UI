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
    public service_notification : NotificationsService
  ) { }
  @Input() selectedItem: any;
  @Input() typeSelectedItem: any = "";

  Public_dropdown_Items = ['Can View', 'Can Edit'];
  selectedValue = 'Can View';
  shared_selected_value = 'Can View';
  showSharedInput: boolean = false;
  filteredUsers: any[] = [];
  addedUsers: any[] = [];
  searchQuery: string = '';
  users: any[] = [];
  addedEmails: string[] = [];
  accessTypeObj = {
    AccessType: "PRIVATE",
    AccessPermisions: {
      "VIEW": true,
      "EDIT": false
    }
  };
  Shared_Access_Type_Obj: { U_ID: string, permission: string }[] = [];
  isDisabled:boolean
  
  inviteType:string='Done'
  
  selectAccessType(type: string): void {
    this.accessTypeObj.AccessType = type

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


selectViewOrEdit(option: string): void {
 
    event.preventDefault();
    event.stopPropagation();

    if (option == "Can View") {
      this.accessTypeObj.AccessPermisions.EDIT = false;
    }
    else if (option == "Can Edit") {
      this.accessTypeObj.AccessPermisions.VIEW = true
      this.accessTypeObj.AccessPermisions.EDIT = true
    }

  }
  deleteUser(index: number): void {
    this.addedUsers.splice(index, 1);
}
  getAllProjects() {

    if(this.dataService.assignedUser.length != 0){
      this.users =this.dataService.assignedUser ;
      return 
    }
   
    let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";

    let form_data = { P_ID: this.dataService.UserDto.ProjectDTO.P_ID };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {;
          // this.showSharedInput = true
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

  ngOnInit(): void {
  
    console.log("sElected Items :" , this.selectedItem);
    
    this.getAllProjects();
    
    if(this.typeSelectedItem == 'create'){
      let obj = {
        AccessType: this.selectedItem?.AccessType,
        AccessPermisions: this.selectedItem?.AccessPermisions
      }
      this.accessTypeObj = obj
    }
    else if(this.typeSelectedItem == 'update'){
      let obj = {
        AccessType: this.selectedItem?.selected_view?.accessType,
        AccessPermisions: this.selectedItem?.AccessPermisions
      }
      this.accessTypeObj = obj
    }
  }
  toggleSharedPermission(dataItem) {
    
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

        if (userToAdd && !this.addedUsers.some(u => u.U_ID === userToAdd.U_ID)) {
            this.addedUsers.push(userToAdd);
            this.Shared_Access_Type_Obj.push({
                U_ID: userToAdd.U_ID,
                permission: 'VIEW'
            });
        }

    });
    this.isDisabled=false
    this.addedEmails = []; // Clear the temporary list after processing
}
  removeUser(user: any): void {
 
    this.addedUsers = this.addedUsers.filter(u => u.U_ID !== user.U_ID);
  }
  updateUserPermission(user: any, selectedPermission: string): void {
   
    selectedPermission = selectedPermission === 'Can Edit' ? 'ALL' : (selectedPermission === 'Can View' ? 'VIEW' : selectedPermission);
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

  finalAccessObj : any ={};

  InviteUsers() {
   
    
    if (this.Shared_Access_Type_Obj.length === 0) {
      if(this.accessTypeObj.AccessType == "SHARED"){
        this.service_notification.notifier(NotificationType.error, 'Please select At least one person to share.');
        return
      }
      this.finalAccessObj = this.accessTypeObj;
    } else {

      this.finalAccessObj = this.Shared_Access_Type_Obj;
    }

    console.log("this.finalAccessObj:", this.finalAccessObj);   
    

    // this.app_service.dataTransmitter({type: "accesstype_ops",data : {action : "accesstype_updated", selected_accesstype_obj:finalAccessObj }})
    this.app_service.dataTransmitter(this.finalAccessObj )


    
   
    this.dataService.isEnablePersister = true
     this.dataService.changedAccessType=this.finalAccessObj.AccessType

     
     let authorizedUsersObj = this.finalAccessObj
     delete authorizedUsersObj["AccessType"]

     let authorizedUsers= []
     for (let key in authorizedUsersObj) {
      if (authorizedUsersObj.hasOwnProperty(key)) {
        authorizedUsers.push(authorizedUsersObj[key])  
      }
   }
   
    authorizedUsers= authorizedUsers.map(function (obj) {
        obj['UserId'] = obj['U_ID']; 
        obj['Permission'] = obj['permission']; 

        // Delete old key
        delete obj['U_ID']; 
        delete obj['permission']; 

        return obj;
    });


    console.log("this===================",this.dataService.changedAccessType)
   if(this.inviteType=='Invite') {

      if(this.typeSelectedItem == 'update'){
        this.sendEmailInvite(authorizedUsers)
        authorizedUsers = []
        this.service_notification.notifier(NotificationType.success, 'Invite sent successfully');
      }
      else if(this.typeSelectedItem == 'create'){

      }
    
   }
   else if(this.inviteType=='Done'&& !this.isDisabled) this.service_notification.notifier(NotificationType.success, 'Access type selected ');

   if(this.inviteType == 'Invite' || this.inviteType == 'Done'){
    this.dataService.isEnablePersister = true;
      this.updateSummaryData();

   }
  }

  sendEmailInvite(authorizedUsers : any){
    let form_url = environment.BASE_OPKEY_URL + "Observability/SendSharedViewMail";

    let obj = {
      "UserID": this.dataService.UserDto.UserDTO.U_ID,
      "ViewName": this.selectedItem.selected_view.viewName,
      "UserName": this.dataService.UserDto.UserDTO.Name,
      "AccessType" : this.dataService.changedAccessType,
      "AuthorizedUsers": authorizedUsers,
      "ProjectID": this.dataService.UserDto.ProjectDTO.P_ID
      
    }

  
    let form_data = {SendViewData : JSON.stringify(obj)}

    this.app_service.make_post_server_call(form_url, form_data).subscribe({

      next: (result: any) => {
       
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

  create_to_update_object() {

    var obj_Update_View = new Object();

    obj_Update_View["viewId"] = this.selectedItem.selected_view.viewId,
    obj_Update_View["viewName"] = this.selectedItem.selected_view.viewName,
    obj_Update_View["accessType"] = this.accessTypeObj.AccessType,
    obj_Update_View["userId"] = this.dataService.UserDto.UserDTO.U_ID
    obj_Update_View["projectId"] = this.dataService.UserDto.ProjectDTO.P_ID
    if( this.accessTypeObj.AccessType == 'PRIVATE'){
      obj_Update_View["authorizedUsers"] = []
    }
    else if (this.accessTypeObj.AccessType == 'PUBLIC'){
      obj_Update_View["authorizedUsers"]= { userId: "00000000-0000-0000-0000-000000000000", permmission: this.accessTypeObj.AccessPermisions.VIEW ? 'VIEW' : 'EDIT'}
    }
    else{
      obj_Update_View["authorizedUsers"] =this.addedUsers.map(val=>{ 
          let obj ={ userId: val.U_ID, permmission:val.permmision?'VIEW':'VIEW'} 
          return obj;
         })
    }
    // obj_Update_View["authorizedUsers"] = this.accessTypeObj.AccessType === 'PRIVATE' ? [] : this.accessTypeObj.AccessType === 'PUBLIC' ? [{ userId: this.dataService.UserDto.UserDTO.U_ID, permmission: this.selectedItem.selectedUids.permmission }] : this.selectedItem.selectedUids;
    return obj_Update_View;
  }
  Update_ViewAccess_Type() {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/updateView";
    let form_data = this.create_to_update_object() as any;
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
         
          if(result){
            // if (this.Shared_Access_Type_Obj.length === 0) {
            //   this.finalAccessObj = this.accessTypeObj;
            // }
            // else{
            //   this.finalAccessObj = this.Shared_Access_Type_Obj;
            // }

            this.selectedItem.selected_view.accessType = this.finalAccessObj.AccessType

            this.selectedItem.selected_view =  this.dataService.selected_view_data.viewSelected;
            console.log("this.selectedItsm: ",this.selectedItem);

            if (this.selectedItem.selected_view.accessType == "SHARED") {
              this.selectedItem.selectedUids = this.finalAccessObj.map(item => ({
                userId: item.U_ID,
                permmission: item.permission === "EDIT" ? "ALL" : item.permission
              }));
            }
            else if (this.selectedItem.selected_view.accessType == "PUBLIC") {
    
              this.selectedItem.selectedUids.userId = "00000000-0000-0000-0000-000000000000"
              if (this.finalAccessObj.AccessPermisions.EDIT == true) {
                this.selectedItem.selectedUids.permmission = "ALL";
              }
              else {
                this.selectedItem.selectedUids.permmission = "VIEW"
              }
            }
            else {
              this.selectedItem.selectedUids.userId = "00000000-0000-0000-0000-000000000000"
              this.selectedItem.selectedUids.permmission = "ALL";
    
            }
            
            
            this.app_service.dataTransmitter({ callsource: 'settings', data: this.selectedItem });
            this.close_model()
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
  onSettingsSelectedData = output<any>()
  updateSummaryData() {
    
    if (this.dataService.isEnablePersister) {

      this.service_notification.showPersister('You have unsaved changes, wish to continue?')
      this.dataService.modalSubInstance.result.then((result) => {
      }, (response) => {
        if (response == 'Yes') {
          // this.onSettingsSelectedData.emit({ isOpen: 'Settings', selectedViewSettings: this.selectedItem })
          this.dataService.selectedArtifactData.selectedView = this.selectedItem.selected_view;
          this.dataService.selectedArtifactData.AccessType = this.selectedItem.selected_view.accessType;
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
    else {
      this.Update_ViewAccess_Type()
    }
  }

  updatePermission(){
    this.Update_ViewAccess_Type()

  }


  
}
