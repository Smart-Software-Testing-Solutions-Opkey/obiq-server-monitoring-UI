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
        result =   result = {
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
              "LicenseDays": 906,
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
              "CreatedOn": "2024-11-02T10:20:56",
              "CreatedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
              "LastModifiedOn": "2024-11-02T10:20:56",
              "LastModifiedBy": "1581e571-798f-42d0-ac4d-445aa57f8857",
              "Is_SuperAdmin": false,
              "Email_Verified_On": "2024-11-04T05:21:54",
              "Last_Password_Change": "2024-11-02T10:20:56",
              "isAutoCreated": false,
              "ForcePasswordChange": false,
              "ApiKey": "7ZGM1WZUXXWTQB2ZAP",
              "Last_Remembered_P_ID": "e498cb95-1e87-44c9-9da6-887bacf54323",
              "Keycloak_SubjectId": "75374f99-3de5-4559-b475-d236052fcafc",
              "UserImage": null,
              "idp_Groups": [],
              "Is_MarketplaceAdmin": false,
              "Is_KeywordManagementAdmin": false,
              "Is_LicenseAdmin": false
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
          "SessionId": "1ac98379-ea0b-44d3-b1f6-430b1f514149",
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
          },
          "ProjectKey": "%5bX%2c1%2c%2fbHRVKkLrFGR%5d0Vg%2fMA4k0IrnBjfIiL63hqa%2bETLmtnr2jAQVxE%2b%2f7XJIN%2bsdmSPLbya3BaCb8Y%2fg9MDDRyrEN6y4LEpqOo4VXgCEqKvMBY8shO37RR91ZmbnUdoK9%2fMYBIAVbdbNlr791hlTDid8FGSbTCOTQTi48%2fdLThFOSl%2fPNjd6u99B%2bfvEu9bvTZl0ku6O5O3v0vAYyG5Yk5f4bUScBZxVD%2bz2j8FatruOqj6NWIcaNEkjT9M43J3m1q5KXU%2f43EKOdTqNGAVwLIRu6cqqjjliZ6T6SmIqv6vFII36bXO%2faBc%2fK4GiV0toOJhdZPaJ8NtSu52McGdVvXpSYJoRBFmverzoLW6l94%2biOIVRRgLf7oYwU7SGc1Gidtz6bHkbizXhG1xbPHmEF1AlAonRVwlgHJCTYMzH7ihiChLxDp0toWuyGvkPFVfxIeHpkYk8Y%2b4nIYq3cSQ3QXT43hEjarqZWjTyS4j1pq26Nelr%2bh2MqqnWmPmJbAWlx20B6%2bu8%2bpnpppgqFKsHNo4eM2cVit7b6mSNrPGwDPmZjk2dqtx4PY36%2bAYKFjq3tRx6sEUKkzaWixlCleXE9yfwy1zlqoqhIcSiup9DJTG9B0VhW3xnuhBk0JhB8BfaXp3Hu3zzvO%2b6q%2bk79ffF6jQSHQwAI8KeIwb%2bfU%2bgU2rJeGJRuHZi0%2f74rcf%2bURkTSYF%2bbGukEz0ymuga8puLpnR%2f1DsAmn2yc71mObc%2buCSzEVPicqeENa2LpUia6IEHsNiwzc8HVxuYTXVw"
      }
        this.service_data.UserDto = result;
        if(result.UserDTO == null && result.Exception == "User already logged in from other location!" && window.origin.includes("localhost:4200")){
          var form_url = environment.BASE_OPKEY_URL + "login/force_login_user";
          var form_data = { sessionID: window.keycloak.sessionId};
          this.app_service.make_get_server_call(form_url, form_data).subscribe(
            (result: any) => {
              if(result){
                this.get_data()
              }
            }
          );
        }
      },
      (error) => {

      }
    );


  }
}



