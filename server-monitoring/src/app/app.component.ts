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

  constructor(private app_service: AppService,
    public service_data: AppDataService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data(): any {

    console.log("window.keycloak object ", window.keycloak);

    if (window.keycloak == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }
    if (window.keycloak.sessionId == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }
    var form_url = environment.BASE_OPKEY_URL + "login/get_data";
    var form_data = { sessionID: window.keycloak.sessionId, opkeyone_callsource: "Default" };

    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {
        result = {
          "ProductBinding": {
              "SSTSProduct": "Opkey",
              "Name": "Opkey",
              "URL": "www.opkey.com",
              "ImageColorURL": "https://cdn.myopkey.com/IconImages/OpkeyLogin/OpkeyAppLogo.png",
              "ImageTransparentURL": "https://cdn.myopkey.com/IconImages/OpkeyLogin/opkeyLogoWhite.png",
              "SupportMail": "mailto:support@opkey.com",
              "PrivacyURL": "https://www.opkey.com/privacy-policy",
              "FaviconURL": "https://myqlm.opkeyone.com/IconImages/favicon1.ico",
              "LogoLight": "/opkeyone/assets/icon-image/opkey-logo/logo-circle-light.png"
          },
          "LicenseBinding": {
              "LicenseName": "Saas",
              "LicenseType": "Pro",
              "ModuleType": null,
              "ModuleName": null,
              "LicenseActive": true,
              "LicenseDays": 940,
              "StartDate": "06/06/2024",
              "EndDate": "06/06/2027",
              "IsRestricted": false
          },
          "UserDTO": {
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
              "Last_Password_Change": "2024-11-02T10:20:56+00:00",
              "isAutoCreated": false,
              "ForcePasswordChange": false,
              "ApiKey": "7ZGM1WZUXXWTQB2ZAP",
              "Last_Remembered_P_ID": "e498cb95-1e87-44c9-9da6-887bacf54323",
              "Keycloak_SubjectId": "75374f99-3de5-4559-b475-d236052fcafc",
              "UserImage": null,
              "idp_Groups": []
          },
          "ProjectDTO": {
              "Name": "Coupa Testing",
              "ProjectPath": null,
              "P_ID": "e498cb95-1e87-44c9-9da6-887bacf54323",
              "AuditTrailLevel_ENUM": "LowLevel",
              "CreatedBy_ID": "396048c9-8e40-4f2a-995a-03b0bbc0f18e",
              "CreatedOn": "2024-06-28T07:18:57",
              "ProjectMode_ENUM": "Team",
              "IsEncryptionModeOn": true,
              "MaxParallelRunAllowed": 10,
              "MaxParallelRunOnBrowserStack": 2,
              "MaxParallelRunOnSauceLabs": 2,
              "SessionLimit": "[X,1,SGMNerO7XEzm]/NcJFHxEZJWfSqfFwbS+XA==",
              "Tracking_ID": "00000000-0000-0000-0000-000000000000",
              "ExternalReferenceID": null
          },
          "Exception": null,
          "IsUserLoggedInFirstTime": false,
          "IsProjectSelectedFirstTime": false,
          "SessionId": "b690e785-1d24-46b6-978d-521321d25108",
          "KeycloakSettingBinding": {
              "Keycloak_Auth_Url": "https://sstsauth.labs.opkeyone.com",
              "Keycloak_Realm": "KC_SSTS_Auth",
              "Keycloak_Auth_ClientId": null,
              "Keycloak_Auth_Client_SK": null,
              "Keycloak_Web_ClientId": "SSTS",
              "Keycloak_Teams_ClientId": "SSTS-Teams",
              "SSO_Settings": {
                  "isEnabled": false,
                  "IDP_Hint": ""
              }
          }
      }
        this.service_data.UserDto = result;


      },
      (error) => {

      }
    );


  }
}



