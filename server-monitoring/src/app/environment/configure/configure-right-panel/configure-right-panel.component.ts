import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

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
  ) { }
  @Input() selectedItem: any;
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
  selectAccessType(type: string): void {
    debugger;
    this.showSharedInput = false;
    this.accessTypeObj.AccessType = type;
    this.Shared_Access_Type_Obj = [];
    if (type == "PUBLIC") {
      this.accessTypeObj = {
        AccessType: "PUBLIC",
        AccessPermisions: {
          "VIEW": true,
          "EDIT": false
        }
      };
    }
    else if (type == "PRIVATE") {
      this.accessTypeObj = {
        AccessType: "PRIVATE",
        AccessPermisions: {
          "VIEW": true,
          "EDIT": false
        }
      };
    }

    else if (type == "SHARED") {
      this.showSharedInput = true;
      this.Shared_Access_Type_Obj["AccessType"] = type;
      this.perform_Shared_Access_Operation();
    }

  }
  addEmailToTempList(): void {
    if (this.searchQuery.trim()) {
        this.addedEmails.push(this.searchQuery.trim());
        this.searchQuery = ''; // Clear the input field
    }
}
removeTempEmail(email: string): void {
  this.addedEmails = this.addedEmails.filter(e => e !== email);
}


  selectViewOrEdit(option: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (option == "VIEW") {
      this.accessTypeObj.AccessPermisions.EDIT = false;
    }
    else if (option == "EDIT") {
      this.accessTypeObj.AccessPermisions.VIEW = true
      this.accessTypeObj.AccessPermisions.EDIT = true
    }

  }
  getAllProjects() {
    debugger;
   
    // let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";
    let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";

    let form_data = { P_ID: this.dataService.UserDto.ProjectDTO.P_ID };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          this.showSharedInput = true
          // this.Show_Project_Access = true
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


  perform_Shared_Access_Operation(): void {
    debugger;

  }

  ngOnInit(): void {

    this.getAllProjects();
  }
  toggleSharedPermission(dataItem) {
    debugger;
  }
  filterUsers(query: string) {
    debugger;
    this.filteredUsers = this.users.filter(user =>
      user.email_ID.toLowerCase().includes(query.toLowerCase()) ||
      user.UserName.toLowerCase().includes(query.toLowerCase())
    );
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
                permission: 'EDIT'
            });
        }
    });

    this.addedEmails = []; // Clear the temporary list after processing
}
  removeUser(user: any): void {
    debugger;
    this.addedUsers = this.addedUsers.filter(u => u.U_ID !== user.U_ID);
  }
  updateUserPermission(user: any, selectedPermission: string): void {
    debugger;
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


  InviteUsers() {
    debugger;
    let finalAccessObj;

    if (this.Shared_Access_Type_Obj.length === 0) {

      finalAccessObj = this.accessTypeObj;
    } else {

      finalAccessObj = this.Shared_Access_Type_Obj;
    }
    this.app_service.dataTransmitter(finalAccessObj);
    this.close_model()
  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }

  close_right_panel() {
    this.activeModal.dismiss('close modal');
  }
}
