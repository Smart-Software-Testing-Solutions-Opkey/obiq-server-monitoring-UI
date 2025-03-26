import { ChangeDetectorRef, Component, Input, output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrl: './filter-user.component.scss'
})
export class FilterUserComponent {

constructor(
      public app_service: AppService,
       private cdr: ChangeDetectorRef,
       private msgbox: MsgboxService 
    ) {
    }
    appType : any= "OracleFusion";
    @Input('child_data') set child_data({ selectedUser,appType }) {
      if(selectedUser){
        this.selectedUser = selectedUser;
      }
      if(appType){
        this.appType = appType;
      }
     

    }


    selectedUser: any = []
    onSelectedUserChange = output<any>();
    search_filter: string = '';
    selectedCheckboxes: any = {};
    obj_user = {}   

   filterUser : any;

    ngOnInit(): void {
      this.get_user();
    }

    
  
    get_user() {
      var ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/UserJourneyController/getEnvironmentUsersByApplication";
      let formData = { appType: this.appType.toUpperCase() }
      this.app_service.make_post_server_call(ajax_url, formData)
        .subscribe({
          next: (result: any) => {
            if (result && result.length) {
              this.filterUser = result;  
            }

            if(this.selectedUser.length>0){
              this.selectedUser.forEach(item => {
                this.selectedCheckboxes[item] = true;
              });
            }
          },
          error: (error: any) => {
            this.msgbox.display_error_message(error);
            console.warn(error);
          }
        });
    }

    
  clear_search() {
    this.search_filter = '';

  }

  select_User(e, item,ind) {
    if (e.target.checked) {
      this.selectedUser.push(item);
      
    }
    else {
      this.selectedUser.splice(ind,1);
    }
    
    let a = this.selectedUser
    this.selectedUser = JSON.parse(JSON.stringify(this.selectedUser));
    this.onSelectedUserChange.emit(this.selectedUser);
    
  }

  clear_filter() {
    this.selectedUser = [];
    this.filterUser.forEach(item => {
      this.selectedCheckboxes[item] = false;
    });
    this.onSelectedUserChange.emit(this.selectedUser);

  }


}

