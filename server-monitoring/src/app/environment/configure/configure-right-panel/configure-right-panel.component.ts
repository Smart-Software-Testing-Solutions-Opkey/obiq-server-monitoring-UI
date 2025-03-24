import { Component, Input, output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

import { NotificationsService } from 'src/app/services/notification-service/notifications.service';
import { NotificationType } from 'src/app/global/enums';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';

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
    public service_notification: NotificationsService,
    public msgboxService :MsgboxService,
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
    public filterSettings: DropDownFilterSettings = {
      caseSensitive: false,
      operator: "contains",
    };
    model_user = null
    selected_user = null;
    select_user(event) {
        event["permission"] = "VIEW"
  
      this.model_user = event;
      this.selected_user = event;
    }
    user_default = { email_ID: 'Select user and add', U_ID: '00000000-0000-0000-0000-000000000000' };
    datasource_added_item = {};
    objDatasourceUser = {};

  


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

    if (this.typeSelectedItem == 'update') {

      this.accessTypeObj.AccessType = this.selectedItem.selected_view.accessType;
      this.accessTypeObj.AccessPermissions = this.selectedItem.selected_view.viewAccessTypePermision && this.selectedItem.selected_view.viewAccessTypePermision!= 'ALL' ? this.selectedItem.selected_view.viewAccessTypePermision : 'EDIT';
     
     
    }
    else if (this.typeSelectedItem == 'create') {

      this.accessTypeObj.AccessType = this.selectedItem.AccessType == "" ? "PRIVATE" : this.selectedItem.AccessType
      // this.accessTypeObj.AccessType = "PRIVATE"
      this.accessTypeObj.AccessPermissions = this.selectedItem.AccessPermisions 
      // this.accessTypeObj.AccessPermissions = "VIEW" 
      
    }
    this.getAllProjects();
  }

  selectAccessType(type: string): void {
    this.accessTypeObj.AccessType = type
    console.log(this.accessTypeObj.AccessPermissions);
    
   
    if (this.accessTypeObj.AccessType == 'SHARED') {
      this.isDisabled = true;
      this.addedUsers = []
      this.datasource_added_item ={}
    }
    else {
      this.isDisabled = false;
    }
  }

  selectViewOrEdit(event): void {
    this.accessTypeObj.AccessPermissions = event
    console.log(this.accessTypeObj)

  }

  add_user() {
 
    if (this.model_user == null || this.model_user == "00000000-0000-0000-0000-000000000000") {
      this.service_notification.notifier(NotificationType.warning, "Please select atleast one user.");
      return;
    }
 
    if (this.datasource_added_item[this.model_user]) {
      this.service_notification.notifier(NotificationType.warning, "This user already added. Please select another user");
      return;
    }
    this.datasource_added_item[this.model_user] = this.selected_user;
    this.addedUsers=Object.values(this.datasource_added_item );
  
    this.model_user = "00000000-0000-0000-0000-000000000000"
    this.isDisabled = false;
 
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




  deleteUser(index: number,U_ID): void {
    this.addedUsers.splice(index, 1);
    delete this.datasource_added_item[U_ID];

    if(Object.keys(this.datasource_added_item).length == 0){
      this.model_user = null;
      this.isDisabled = true;
    }
  }

  bind_data(result){
    this.users = []
    this.objDatasourceUser = {}
    result.forEach((user)=>{
      if(user.U_ID != this.dataService.UserDto.UserDTO.U_ID){
        this.users.push(user);
        this.objDatasourceUser[user.U_ID]= user
      }
    })

    if (this.typeSelectedItem == 'update') {
      this.selectedItem.selected_view.authorizedUsers.forEach(user=>{
        if(user.userId != this.dataService.UserDto.UserDTO.U_ID){
          this.objDatasourceUser[user.userId]['permission'] = user.permmission;
          this.datasource_added_item[user.userId] =  this.objDatasourceUser[user.userId]
        }
    })
  }
  else if( this.typeSelectedItem == 'create'){
    this.selectedItem.authorizedUsers.forEach( user =>{
      if(user.userId != this.dataService.UserDto.UserDTO.U_ID){
        this.objDatasourceUser[user.userId]['permission'] = user.permmission;
        this.datasource_added_item[user.userId] =  this.objDatasourceUser[user.userId]
      }
    })

  }
    this.addedUsers = Object.values(this.datasource_added_item)

  }
  getAllProjects() {

    if (this.dataService.assignedUser.length != 0) {
      this.bind_data(this.dataService.assignedUser);
    
      return
    }

    let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";
    let form_data = { P_ID: this.dataService.UserDto.ProjectDTO.P_ID };
    
    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
        

        
          this.bind_data(result);
         
          this.dataService.assignedUser = this.users

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
    this.dataService.isEnablePersister = true
    if(this.accessTypeObj.AccessType == 'SHARED'){
      this.createSummaryData();
    }

    let authorizedUsers : any =[];
    let currentUserObj = { userId: this.dataService.UserDto.UserDTO.U_ID, permmission: "EDIT"}
    if (this.accessTypeObj.AccessType == 'PRIVATE') {
      authorizedUsers = [currentUserObj ]
    }
    else if (this.accessTypeObj.AccessType == 'PUBLIC') {
      authorizedUsers = [{ userId: this.dataService.UserDto.UserDTO.U_ID, permmission: this.accessTypeObj.AccessPermissions ? this.accessTypeObj.AccessPermissions : "VIEW" }]
    }
    else {
      authorizedUsers = this.addedUsers.map(val => {
        
        let obj = { userId: val.U_ID, permmission: val.permission }
        return obj;
        
      })
      authorizedUsers.push(currentUserObj)
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
    let currentUserObj = { userId: this.dataService.UserDto.UserDTO.U_ID, permmission: "EDIT"}
    if (this.accessTypeObj.AccessType == 'PRIVATE') {
      obj_Update_View["authorizedUsers"] = [currentUserObj ]
    }
    else if (this.accessTypeObj.AccessType == 'PUBLIC') {
      obj_Update_View["authorizedUsers"] = [{ userId: this.dataService.UserDto.UserDTO.U_ID, permmission: this.accessTypeObj.AccessPermissions }]
    }
    else {
      obj_Update_View["authorizedUsers"] = this.addedUsers.map(val => {

        let obj = { userId: val.U_ID, permmission: val.permission }
        

        return obj;
       
      })
      obj_Update_View['authorizedUsers'].push(currentUserObj)
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
            this.selectedItem.selected_view.viewAccessTypePermision = this.accessTypeObj.AccessPermissions;
            this.dataService.selected_view_data.viewSelected.accessType = result.accessType
            this.dataService.selected_view_data.viewSelected.viewAccessTypePermision= this.accessTypeObj.AccessPermissions

            this.dataService.selected_view_data.viewSelected.authorizedUsers = result.authorizedUsers.filter( (user)=> user.userId != this.dataService.UserDto.UserDTO.U_ID)
           
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

  createSummaryData() {


    this.msgboxService.confirm_msg_box('confirm','Invitation will be sent to the selected user once the view is created',[{ text: "OK", primaryBtn: true, value: "ok" }]);
    // if (this.dataService.isEnablePersister) {
    //   this.service_notification.showPersister('Invitation will be sent to the selected user once the view is created')
    //   this.dataService.modalSubInstance.result.then((result) => {
    //   }, (response) => {
      
    //     if (response == 'ok') {
    //       this.dataService.modalSubInstance = null
    //       return
    //     }
        
    //   });
    // }
   
  }




}
