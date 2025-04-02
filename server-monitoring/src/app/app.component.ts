import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from './services/app.service';
import { AppDataService } from './services/app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private app_service: AppService,
    public service_data: AppDataService,
    public router : Router,
  ) { }

  ngOnInit() {
    this.get_data();
  }
  is_user_data_loaded = false

  getAllViews(result){
      let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/getAllViewsOfCurrentUser";
      let form_data = {
        userId: result.UserDTO.U_ID,
        projectId: result.ProjectDTO.P_ID
      }
      this.app_service.make_post_server_call(form_url, form_data).subscribe({
  
        next: (result: any) => {
          if(result == null || result?.length == 0){
            this.router.navigateByUrl("/environment/configure");
          }
          else{
            this.router.navigateByUrl("/environment/manager");
          }
          this.service_data.viewsData = result;
        }
      })
  }

  get_data(): any {

    console.log("window.keycloak object ", window.keycloak);

    if (window.keycloak == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }
    if (window.keycloak.sessionId == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }
    var form_url = environment.BASE_OPKEY_URL + "login/get_data";
    var form_data = { sessionID: window.keycloak.sessionId, opkeyone_callsource: "Default" };

    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {
        this.service_data.UserDto = result;
        if (result.UserDTO == null && result.Exception == "User already logged in from other location!" && window.origin.includes("localhost:4200")) {
          this.force_login_user();
        } else {
          this.is_user_data_loaded = true
          this.getAllViews(result);
        }
      },
      (error) => {

      }
    );




  }

  force_login_user() {
    var form_url = environment.BASE_OPKEY_URL + "login/force_login_user";
    var form_data = { sessionID: window.keycloak.sessionId };
    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {
        if (result) {
          this.get_data()
        }
      }
    );
  }
}



