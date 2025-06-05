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
    window.addEventListener('message', (event) => {
      let res:any = {}
      
     try{
        res = JSON.parse(event.data)
        console.log(res);
        if(res.toSource == 'monitoring'){
          this.app_service.folder_view_flagBS.next(res.flag);  
        }
     }
     catch(error){
      console.log(error);
     }
    });
  }
  is_user_data_loaded = false

  get_data(): any {

    console.log("window.keycloak object ", window.parent.keycloak);

    if (
      typeof window.parent.keycloak === 'undefined' ||
      (!window.parent.keycloak.sessionId &&
        (!window.parent.keycloak.tokenParsed || !window.parent.keycloak.tokenParsed.sid))
    ) {
      setTimeout(() => { this.get_data(); }, 1000);
      return false;
    }

    window.loadingStart("#div_main_manager", "Please wait");
    var form_url = environment.BASE_OPKEY_URL + "login/get_data";
    const sessionID = window.parent.keycloak.sessionId || window.parent.keycloak.tokenParsed.sid;
    var form_data = { sessionID: sessionID, opkeyone_callsource: "Default" };
   

    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {
       
        this.service_data.UserDto = result;
        if (result.UserDTO == null && result.Exception == "User already logged in from other location!" && window.origin.includes("localhost:4200")) {
          this.force_login_user();
        } else {
          window.loadingStop("#div_main_manager");
          this.is_user_data_loaded = true
        }
      },
      (error) => {
        window.loadingStop("#div_main_manager");

      }
    );




  }

  force_login_user() {
    var form_url = environment.BASE_OPKEY_URL + "login/force_login_user";
    var form_data = { sessionID: window.parent.keycloak.sessionId };
    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {
        if (result) {
          this.get_data()
        }
      }
    );
  }
}



