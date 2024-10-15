import { Component, Input ,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-view-summary',
  templateUrl: './configuration-settings-view-summary.component.html',
  styleUrl: './configuration-settings-view-summary.component.scss'
})
export class ConfigurationSettingsViewSummaryComponent implements OnInit{

  constructor( 
    public app_service:AppService,
    public dataService:AppDataService){

  }
  obj_configuration_setting:any;
  Selected_grid_dataSource:any;
  Show_Project_Access:boolean = false;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    debugger
    this.obj_configuration_setting = obj_configuration_setting;
    console.log("vidwsummary==============================", this.obj_configuration_setting);
    this.CreateViewSummarySelectedInstance(this.obj_configuration_setting)
  }
  ngOnInit() {
    
   }
   CreateViewSummarySelectedInstance(selectionData){
    this.Selected_grid_dataSource = selectionData.selected_erp_analytics;
    console.log(this.Selected_grid_dataSource);


   }
   selectedAccessType: string = 'PUBLIC';
   accessTypes: string[] = ['PUBLIC', 'PRIVATE', 'SHARED']; 
   users: any[] = [];
   selectedUsers: any[] = [];


   onAccessTypeChange(selectedOption: string) {
     this.selectedAccessType = selectedOption;
     if(this.selectedAccessType == "SHARED"){
      this.getAllProjects()
     }
     this.obj_configuration_setting.AccessType = this.selectedAccessType
     console.log('Access Type Changed:', selectedOption);
    
   }

   onUserSelect(user: any, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
     
        this.selectedUsers.push({
            userId: user.U_ID,
            permmission: "ALL" // abhi ke liye sabke liye All 
        });
    } else {    
        this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.userId !== user.U_ID);
    }
    this.obj_configuration_setting.selectedUids = this.selectedUsers;
    
    console.log(this.selectedUsers);
}


   getAllProjects(){
    var ajax_url = environment.BASE_OPKEY_URL+"Profile/GetAssignedUsersInProject"
   this.app_service.make_get_server_call(ajax_url,{"P_ID":this.dataService.UserDto.ProjectDTO.P_ID})
     .subscribe({
      
       next: (result: any) => {
        this.Show_Project_Access = true
        this.users = result.Users;
       },
       error: (error: any) => {
        
         console.warn(error);
       },
       complete: () => {
         console.log("Completed");
       }
     });
 }
   onCellClick(event){

   }
   onSelectionChange(event){

   }

}
