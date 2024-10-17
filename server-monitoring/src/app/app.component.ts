import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from './services/app.service';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private app_service:AppService,
    public dataService:AppDataService
  ){}

  ngOnInit() {
    this.get_data();
  }

   get_data():any {

    console.log("window.keycloak object ", window.keycloak);

    if (window.keycloak == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }
    if (window.keycloak.sessionId == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }

   // var form_url = environment.BASE_OPKEY_URL + "login/get_data";
   var form_url = "https://myqlm.dev.opkeyone.com/login/get_data";
    var form_data = { sessionID: window.keycloak.sessionId, opkeyone_callsource: "Default" };

    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {
      //   result = {
      //     "ProductBinding": {
      //         "SSTSProduct": "Opkey",
      //         "Name": "Opkey",
      //         "URL": "www.opkey.com",
      //         "ImageColorURL": "https://cdn.myopkey.com/IconImages/OpkeyLogin/OpkeyAppLogo.png",
      //         "ImageTransparentURL": "https://cdn.myopkey.com/IconImages/OpkeyLogin/opkeyLogoWhite.png",
      //         "SupportMail": "mailto:support@opkey.com",
      //         "PrivacyURL": "https://www.opkey.com/privacy-policy",
      //         "FaviconURL": "https://myqlm.opkeyone.com/IconImages/favicon1.ico",
      //         "LogoLight": "/opkeyone/assets/icon-image/opkey-logo/logo-circle-light.png"
      //     },
      //     "LicenseBinding": {
      //         "LicenseName": "Saas",
      //         "LicenseType": "Perennial",
      //         "ModuleType": null,
      //         "ModuleName": null,
      //         "LicenseActive": true,
      //         "LicenseDays": 380,
      //         "StartDate": "10/10/2024",
      //         "EndDate": "30/10/2025",
      //         "IsRestricted": false
      //     },
      //     "UserDTO": {
      //         "U_ID": "cfb30b36-9b66-43ab-8976-114ee0dd2eff",
      //         "Name": "Himanshu Sharma",
      //         "UserName": "himanshu.sharma@opkey.com",
      //         "email_ID": "himanshu.sharma@opkey.com",
      //         "Is_Enabled": true,
      //         "CreatedOn": "2023-06-13T07:34:29+00:00",
      //         "CreatedBy": "a9627f5f-50cf-4f59-aace-ffec3797e4bc",
      //         "LastModifiedOn": "2024-05-31T05:16:24+00:00",
      //         "LastModifiedBy": "a0f6b95e-ae16-431d-909f-3b5b947a1b03",
      //         "Is_SuperAdmin": true,
      //         "Email_Verified_On": "2024-05-31T05:15:57+00:00",
      //         "Last_Password_Change": "2023-06-13T07:34:29+00:00",
      //         "isAutoCreated": false,
      //         "ForcePasswordChange": false,
      //         "ApiKey": "87F6H4K2IM4C7D4XXP",
      //         "Last_Remembered_P_ID": "7dcdeff2-4538-4c2e-9bb7-1f40309a1438",
      //         "Keycloak_SubjectId": "4c43d2b4-43fa-41c2-ba5b-14da65309588",
      //         "UserImage": null,
      //         "idp_Groups": []
      //     },
      //     "ProjectDTO": {
      //         "Name": "MS_Team",
      //         "ProjectPath": null,
      //         "P_ID": "7dcdeff2-4538-4c2e-9bb7-1f40309a1438",
      //         "AuditTrailLevel_ENUM": "LowLevel",
      //         "CreatedBy_ID": "2170f924-6ab5-4d91-b9cf-232a27cd08dc",
      //         "CreatedOn": "2024-08-12T10:45:31",
      //         "ProjectMode_ENUM": "Team",
      //         "IsEncryptionModeOn": true,
      //         "MaxParallelRunAllowed": 10,
      //         "MaxParallelRunOnBrowserStack": 2,
      //         "MaxParallelRunOnSauceLabs": 2,
      //         "SessionLimit": "[X,1,SGMNerO7XEzm]/NcJFHxEZJWfSqfFwbS+XA==",
      //         "Tracking_ID": "00000000-0000-0000-0000-000000000000",
      //         "ExternalReferenceID": null
      //     },
      //     "Exception": null,
      //     "IsUserLoggedInFirstTime": false,
      //     "IsProjectSelectedFirstTime": false,
      //     "SessionId": "e8ed77dc-817c-4ec3-a3ba-1e8de5d796a6",
      //     "KeycloakSettingBinding": {
      //         "Keycloak_Auth_Url": "https://sstsauth.preprod.opkeyone.com",
      //         "Keycloak_Realm": "KC_SSTS_Auth",
      //         "Keycloak_Auth_ClientId": null,
      //         "Keycloak_Auth_Client_SK": null,
      //         "Keycloak_Web_ClientId": "SSTS",
      //         "Keycloak_Teams_ClientId": "SSTS-Teams",
      //         "SSO_Settings": {
      //             "isEnabled": false,
      //             "IDP_Hint": ""
      //         }
      //     }
      // }
       this.dataService.UserDto = result;


      },
      (error) => {
       
      }
    );

    
  }
}



