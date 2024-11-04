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
      this.addedUsers = []
    }
    else if (type == "PRIVATE") {
      this.accessTypeObj = {
        AccessType: "PRIVATE",
        AccessPermisions: {
          "VIEW": true,
          "EDIT": false
        }
      };
      this.addedUsers = [];
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


selectViewOrEdit(option: string): void {
  debugger;
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
    debugger;
   var result = [
    {
        "U_ID": "04efda02-26d8-4836-810d-471d93009978",
        "Name": "Papiya Banerjee",
        "UserName": "papiya.banerjee@opkey.com",
        "email_ID": "papiya.banerjee@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-09-26T06:46:43+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-09-26T06:46:43+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-09-26T07:43:16+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "4ZE5NP302CTQ5IBYXJ",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "322c3f6e-43c6-47b1-a78f-330edfb41857",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "14f713ba-0358-4dab-b960-fe363aa22d34",
        "Name": "Harshita Srivastava",
        "UserName": "Harshita.srivastav@opkey.com",
        "email_ID": "Harshita.srivastav@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-09-13T05:36:25+00:00",
        "CreatedBy": "e054a6db-a1ba-4817-8cff-31bbb7e495bf",
        "LastModifiedOn": "2024-10-11T10:02:38+00:00",
        "LastModifiedBy": "5efda440-6316-4bf5-973b-2b413556ded5",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-09-13T05:39:37+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "K3N5P5SQKS250JRQ4F",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "63b24c46-d0fb-4666-ab7a-475617800cc2",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "Name": "Jogin Abraham",
        "UserName": "jogin.abraham@opkey.com",
        "email_ID": "jogin.abraham@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-06T14:52:06+00:00",
        "CreatedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "LastModifiedOn": "2024-06-06T14:52:23+00:00",
        "LastModifiedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "Is_SuperAdmin": true,
        "Email_Verified_On": "2024-06-13T06:14:34+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "VQ5W24KIQMY7P5VLSF",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "93b8b4b7-339b-46e1-9c2a-4cea753a9e53",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "1f4c19bd-a4b0-4aa5-84ee-136a27176c73",
        "Name": "avinesh.arora@opkey.com",
        "UserName": "avinesh.arora@opkey.com",
        "email_ID": "avinesh.arora@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-13T05:41:59+00:00",
        "CreatedBy": "e054a6db-a1ba-4817-8cff-31bbb7e495bf",
        "LastModifiedOn": "2024-06-13T06:44:21+00:00",
        "LastModifiedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T06:19:44+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "MJ8CRI6TQN11VILGKX",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "a4825b84-f8bd-4e20-9bce-a64456cebafa",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "21e25295-55a3-4290-aadd-4fa8d630a296",
        "Name": "julian.andronic@opkey.com",
        "UserName": "julian.andronic@opkey.com",
        "email_ID": "julian.andronic@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-07-06T03:08:44+00:00",
        "CreatedBy": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "LastModifiedOn": "2024-07-06T03:09:23+00:00",
        "LastModifiedBy": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "0001-01-01T00:00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "73B4YMTO5JMC8MTRJH",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": null,
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "396048c9-8e40-4f2a-995a-03b0bbc0f18e",
        "Name": "Vishwa",
        "UserName": "vishwa.mohan@opkey.com",
        "email_ID": "vishwa.mohan@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-11T08:22:00+00:00",
        "CreatedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "LastModifiedOn": "2024-10-18T17:43:58+00:00",
        "LastModifiedBy": "396048c9-8e40-4f2a-995a-03b0bbc0f18e",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T06:35:44+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "SZO6Q0LSI8004IID3H",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "072bc4c1-5de7-43f2-8492-0e2c7b49db86",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "3f0c842d-bbcb-489c-b4c1-292bc1517a42",
        "Name": "rushikesh.potekar@opkey.com",
        "UserName": "rushikesh.potekar@opkey.com",
        "email_ID": "rushikesh.potekar@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-07-03T10:59:11+00:00",
        "CreatedBy": "1f4c19bd-a4b0-4aa5-84ee-136a27176c73",
        "LastModifiedOn": "2024-08-22T08:24:00+00:00",
        "LastModifiedBy": "396048c9-8e40-4f2a-995a-03b0bbc0f18e",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-07-03T11:50:03+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "EOLB1NC0LLO7KJ3WYJ",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "297edc49-afc1-48a8-8f19-563ffcfae4d0",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "52990016-79e7-41d3-a9f0-7f397415444f",
        "Name": "neon.nishant@opkey.com",
        "UserName": "neon.nishant@opkey.com",
        "email_ID": "neon.nishant@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-07-22T11:16:01+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-07-22T11:16:01+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-07-22T11:33:15+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "NZVEWP22TQRU4V4SX1",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "d017c885-c885-416b-bddb-00dfe14c5d2e",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "55ea5849-7022-45a0-ba16-f2836a2f0ce5",
        "Name": "Lavish Kumar",
        "UserName": "lavish.kumar@opkey.com",
        "email_ID": "lavish.kumar@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-06T08:38:24+00:00",
        "CreatedBy": "7b1ceb4e-c64b-4cea-8a77-832fbe68410c",
        "LastModifiedOn": "2024-06-06T08:38:24+00:00",
        "LastModifiedBy": "7b1ceb4e-c64b-4cea-8a77-832fbe68410c",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T07:22:02+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "QMWVLDCO8RM0GX3DX5",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "b99b08b1-dd16-4d5f-b113-327a0b87bc28",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "5b6f37ab-20d5-4d13-b1eb-bfe753d61905",
        "Name": "Deepti Pandey",
        "UserName": "deepti.pandey@opkey.com",
        "email_ID": "deepti.pandey@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-10T12:52:39+00:00",
        "CreatedBy": "e054a6db-a1ba-4817-8cff-31bbb7e495bf",
        "LastModifiedOn": "2024-07-30T10:33:36+00:00",
        "LastModifiedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T06:34:00+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "DHAN82ESTEVWFIXEUY",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "18dab97b-48f2-40b5-bf95-649e2ee884a0",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "5efda440-6316-4bf5-973b-2b413556ded5",
        "Name": "Amit Bhatia",
        "UserName": "Amit.bhatia@opkey.com",
        "email_ID": "Amit.bhatia@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-09-13T05:36:25+00:00",
        "CreatedBy": "e054a6db-a1ba-4817-8cff-31bbb7e495bf",
        "LastModifiedOn": "2024-10-11T09:40:35+00:00",
        "LastModifiedBy": "a67d40dc-b2f9-410b-8bd8-f92bc4efe363",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-09-13T06:10:41+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "D0ZKP2W6QC7YPF1D37",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "e66cfb23-637f-4407-b665-771b6072a3f6",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "64c417a3-4974-414f-9ac8-f85aeac2637a",
        "Name": "Upendra Sharma",
        "UserName": "upendra.sharma@opkey.com",
        "email_ID": "upendra.sharma@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-07-25T06:24:09+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-07-25T06:24:09+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-07-25T10:17:32+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "KOEVCA8JV4NZX36W8U",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "a3ebefc7-0e09-4634-b744-b028aacc74d1",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "65f6b391-b56b-4dca-ad61-2f19fb567f85",
        "Name": "apoorva.gaurav@opkey.com",
        "UserName": "apoorva.gaurav@opkey.com",
        "email_ID": "apoorva.gaurav@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-09-04T06:01:40+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-09-04T06:10:43+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": true,
        "Email_Verified_On": "2024-09-04T06:10:39+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "66ZOC403XJUZDPL2DC",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "e98f9f78-ad7f-425b-8573-da3c3215463c",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "6aecd37e-b75d-4ba4-9a0d-cdc7d114706b",
        "Name": "Yatin Syal",
        "UserName": "yatin.syal@opkey.com",
        "email_ID": "yatin.syal@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-26T07:16:11+00:00",
        "CreatedBy": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "LastModifiedOn": "2024-06-26T07:16:11+00:00",
        "LastModifiedBy": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "Is_SuperAdmin": true,
        "Email_Verified_On": "2024-06-26T07:27:17+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "QB51MO3JYDLMJLDLOM",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "8c612e85-7924-432f-8de7-1120ea1b241c",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "6cefe957-5c08-4022-82ac-b4e2508cf2f5",
        "Name": "Himanshu Kumar",
        "UserName": "himanshu.kumar@opkey.com",
        "email_ID": "himanshu.kumar@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-11T18:11:23+00:00",
        "CreatedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "LastModifiedOn": "2024-06-11T18:11:23+00:00",
        "LastModifiedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T06:38:20+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "B3RTAUJ1WVYNO37EL0",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "54f062db-267b-40d5-ad7e-1e688129ad99",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "6d384163-aad2-4b11-b50d-0330dfa977b1",
        "Name": "Rohan  Chavan",
        "UserName": "rohan.chavan@opkey.com",
        "email_ID": "rohan.chavan@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-09-27T05:11:06+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-09-27T05:11:06+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-09-27T05:21:29+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "D8SCQH54YTMGUSXT01",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "9d04b24b-2279-44d9-9836-1c7ba142f713",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "6dd20d99-ff80-4568-bc36-4ce6d84078e4",
        "Name": "shanno pandey",
        "UserName": "shanno.pandey@opkey.com",
        "email_ID": "shanno.pandey@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-28T08:23:49+00:00",
        "CreatedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "LastModifiedOn": "2024-06-28T08:23:49+00:00",
        "LastModifiedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-28T08:24:07+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "HIJ7MD6EEDJXMQ1XG1",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "7058e9da-bf6d-4c5a-8116-48c6993c3ed0",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "7013c420-f08a-4151-8382-502a3343cd2d",
        "Name": "Kunal Ghai",
        "UserName": "kunal.ghai@opkey.com",
        "email_ID": "kunal.ghai@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-06T08:38:24+00:00",
        "CreatedBy": "7b1ceb4e-c64b-4cea-8a77-832fbe68410c",
        "LastModifiedOn": "2024-06-06T08:38:24+00:00",
        "LastModifiedBy": "7b1ceb4e-c64b-4cea-8a77-832fbe68410c",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T06:43:36+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "3S83LJ4SWMAG26I20L",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "e5b32b6f-fc21-47e8-b36c-1327c92dc962",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "7b1ceb4e-c64b-4cea-8a77-832fbe68410c",
        "Name": "anshuman.chatterjee@opkey.com",
        "UserName": "anshuman.chatterjee@opkey.com",
        "email_ID": "anshuman.chatterjee@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-06T08:00:25+00:00",
        "CreatedBy": "ec1c7763-8e56-4c33-b133-42aecf5d351e",
        "LastModifiedOn": "2024-06-06T08:00:25+00:00",
        "LastModifiedBy": "ec1c7763-8e56-4c33-b133-42aecf5d351e",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T06:14:35+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "EKHPSIYMD61WFWJBGA",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "1885f593-c2be-4a47-9f04-833f7e63e02f",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "89c23b0c-00f6-4de1-9358-d37a1a72a4c7",
        "Name": "Piyush Bedi",
        "UserName": "piyush.bedi@opkey.com",
        "email_ID": "piyush.bedi@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-09-16T13:18:02+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-09-16T13:18:23+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-09-16T13:21:47+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "UJSBOX2TUK4TXKI824",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "844d7c08-727b-463e-88e6-95e3239094fb",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Name": "Roushan Paswan",
        "UserName": "roushan.kumar@opkey.com",
        "email_ID": "roushan.kumar@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-07-17T07:48:22+00:00",
        "CreatedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "LastModifiedOn": "2024-07-17T07:48:42+00:00",
        "LastModifiedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "Is_SuperAdmin": true,
        "Email_Verified_On": "2024-07-17T07:53:08+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "N2BHSEMXEKV02IJHU5",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "de7877be-6046-4257-8a5c-ff5c854354bd",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "92886554-ebf8-4aeb-a192-c6f5f0955682",
        "Name": "Sakshi Panwar",
        "UserName": "sakshi.panwar@designbrewery.in",
        "email_ID": "sakshi.panwar@designbrewery.in",
        "Is_Enabled": true,
        "CreatedOn": "2024-10-17T12:55:01+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-10-17T12:55:01+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-10-17T12:58:48+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "OE8SU0F3IE2DKPCEID",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "8316d78b-9779-438e-aa63-27211d175ba7",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "96b951cd-940f-4d8a-8a85-fdf5288366e8",
        "Name": "aman.kumar@opkey.com",
        "UserName": "aman.kumar@opkey.com",
        "email_ID": "aman.kumar@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-10-28T09:14:00+00:00",
        "CreatedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "LastModifiedOn": "2024-10-28T09:14:00+00:00",
        "LastModifiedBy": "7013c420-f08a-4151-8382-502a3343cd2d",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-10-28T10:34:52+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "VB11VPM6M35FCB1J13",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "c6acadf6-9e03-4b51-b9c6-21baa6be877f",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "99305d82-3970-426a-a45c-b61c3707a60c",
        "Name": "Abhishek Parihar",
        "UserName": "abhishek.parihar@opkey.com",
        "email_ID": "abhishek.parihar@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-12T17:18:21+00:00",
        "CreatedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "LastModifiedOn": "2024-06-12T17:18:21+00:00",
        "LastModifiedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T07:38:16+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "AXBG78M4H7YOVXO1A8",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "2c1656a1-66ac-4dfd-b1c4-4cb9906bb49f",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "9cdbbb2d-bce0-474c-b9a4-84d66bbcd0f7",
        "Name": "arpan stephen",
        "UserName": "arpan.stephen@opkey.com",
        "email_ID": "arpan.stephen@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-07-25T09:13:23+00:00",
        "CreatedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "LastModifiedOn": "2024-07-25T09:13:23+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-07-25T10:12:01+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "R3BFQO0K1315BKFGZ4",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "814ef623-3939-4655-8c38-09c64ee79870",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "a67d40dc-b2f9-410b-8bd8-f92bc4efe363",
        "Name": "Rishabh jain",
        "UserName": "rishabh.jain@opkey.com",
        "email_ID": "rishabh.jain@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-11T06:18:30+00:00",
        "CreatedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "LastModifiedOn": "2024-08-29T05:34:19+00:00",
        "LastModifiedBy": "8bc98ea9-3729-4e3b-a1bc-2012e4166c58",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-13T06:20:19+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "84NZWC7QHI71TWH4VR",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "7d21634a-10f0-4e6f-a75f-e77a788422f1",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "a84c48c1-13e8-49d3-8563-0524cd4e4b12",
        "Name": "Dimpy Sharma",
        "UserName": "dimpy.sharma@opkey.com",
        "email_ID": "dimpy.sharma@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-12T12:27:18+00:00",
        "CreatedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "LastModifiedOn": "2024-07-06T03:09:56+00:00",
        "LastModifiedBy": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-08-13T16:07:16+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "O5HC0LMYSS04VTDGEN",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "6a672a26-4ac8-49e3-a477-d03df7bfbe41",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "Name": "yogesh.suri@opkey.com",
        "UserName": "yogesh.suri@opkey.com",
        "email_ID": "yogesh.suri@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-10T12:52:39+00:00",
        "CreatedBy": "e054a6db-a1ba-4817-8cff-31bbb7e495bf",
        "LastModifiedOn": "2024-06-26T07:14:21+00:00",
        "LastModifiedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-06-25T21:39:18+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "AYB3P4MELMA2QA0QC1",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "f239f82b-c858-4702-8bb0-0a2361e47d26",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "bff8a913-ee53-4b8d-a4f4-705606f06ccb",
        "Name": "Himanshu Sharma",
        "UserName": "himanshu.sharma@opkey.com",
        "email_ID": "himanshu.sharma@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-11-02T10:20:56+00:00",
        "CreatedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "LastModifiedOn": "2024-11-02T10:20:56+00:00",
        "LastModifiedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-11-04T05:21:54+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "7ZGM1WZUXXWTQB2ZAP",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "75374f99-3de5-4559-b475-d236052fcafc",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "e054a6db-a1ba-4817-8cff-31bbb7e495bf",
        "Name": "raunak.choraria@opkey.com",
        "UserName": "raunak.choraria@opkey.com",
        "email_ID": "raunak.choraria@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-06-06T14:38:29+00:00",
        "CreatedBy": "55ea5849-7022-45a0-ba16-f2836a2f0ce5",
        "LastModifiedOn": "2024-06-10T12:47:24+00:00",
        "LastModifiedBy": "55ea5849-7022-45a0-ba16-f2836a2f0ce5",
        "Is_SuperAdmin": true,
        "Email_Verified_On": "2024-06-13T06:35:57+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "H8XLRL0QFRPCVUROYW",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "0174ff01-260c-4e7a-b6fe-edeb2610cd0e",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "e8e00a1b-677f-47b1-8c5e-6cef31415649",
        "Name": "noah.keil@opkey.com",
        "UserName": "noah.keil@opkey.com",
        "email_ID": "noah.keil@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2024-07-06T03:08:44+00:00",
        "CreatedBy": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "LastModifiedOn": "2024-07-06T03:09:45+00:00",
        "LastModifiedBy": "b61cb5ff-28bc-4a67-a0c4-07f502756ef9",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "0001-01-01T00:00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "UXYWYG1KIOXXMEF1H0",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": null,
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    },
    {
        "U_ID": "ec1c7763-8e56-4c33-b133-42aecf5d351e",
        "Name": "mayank baliyan",
        "UserName": "mayank.baliyan@opkey.com",
        "email_ID": "mayank.baliyan@opkey.com",
        "Is_Enabled": true,
        "CreatedOn": "2012-11-27T11:23:48+00:00",
        "CreatedBy": "ec1c7763-8e56-4c33-b133-42aecf5d351e",
        "LastModifiedOn": "2012-11-27T11:23:48+00:00",
        "LastModifiedBy": "ec1c7763-8e56-4c33-b133-42aecf5d351e",
        "Is_SuperAdmin": false,
        "Email_Verified_On": "2024-07-17T09:49:08+00:00",
        "Last_Password_Change": "0001-01-01T00:00:00",
        "isAutoCreated": false,
        "ForcePasswordChange": false,
        "ApiKey": "d61b539c4df4f944d1",
        "Last_Remembered_P_ID": "00000000-0000-0000-0000-000000000000",
        "Keycloak_SubjectId": "0a632e29-ef53-4b49-acf4-7023ecad87a4",
        "UserImage": null,
        "idp_Groups": [],
        "Groups": null,
        "AssignedRoles": null
    }
]
this.showSharedInput = true
// this.Show_Project_Access = true
 this.users = result;
 return;
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
                permission: 'VIEW'
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
