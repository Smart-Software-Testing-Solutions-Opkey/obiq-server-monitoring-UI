import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private app_service:AppService){}

  ngOnInit() {
    this.get_data();
  }

   get_data():any {

    console.log("window.keycloak object ", window.keycloak);

    if (window.keycloak == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }
    if (window.keycloak.sessionId == undefined) { setTimeout(() => { this.get_data(); }, 1000); return false; }

    var form_url = environment.BASE_OPKEY_URL + "login/get_data";
    var form_data = { sessionID: window.keycloak.sessionId, opkeyone_callsource: window.opkeyone_callsource };

    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {
        console.log("get_data", result);
   


      },
      (error) => {
       
      }
    );

    
  }
}



