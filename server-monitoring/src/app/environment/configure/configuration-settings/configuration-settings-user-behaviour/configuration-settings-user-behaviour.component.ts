import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-user-behaviour',
  templateUrl: './configuration-settings-user-behaviour.component.html',
  styleUrl: './configuration-settings-user-behaviour.component.scss'
})
export class ConfigurationSettingsUserBehaviourComponent {
  constructor(
    public activeModal: NgbActiveModal,
   private router: Router,
   private route: ActivatedRoute,
   public service_data: AppDataService,
   public app_service: AppService,
   private msgbox: MsgboxService ){

 }
 obj_configuration_setting:any;
 selected_System_User_behaviour: any[] = [];
 obj_error = {
  displayUserError: false,
}

  @Input('child_data') set child_data({ obj_configuration_setting,displayUserError }) {
    this.obj_configuration_setting = obj_configuration_setting;

    if(this.obj_configuration_setting.selected_user_behaviour_component.length>0)
      this.obj_error.displayUserError=false;
    else
       this.obj_error.displayUserError = displayUserError;
    console.log("In User Behaviour", obj_configuration_setting);
   
    this.bindData()
  }
  ngOnInit() {

    this.get_all_Instance();
  }

  agent_lists= [];
 
 temp_agent_list : any;
 get_all_Instance() {
   
    window.loadingStart("#ub-loader", "Please wait");
    let select_applicaton = this.obj_configuration_setting.selected_datasource.select_applicaton_item;

    
    let form_url = environment.BASE_OPKEY_URL + "Base/getAllEnabledUsersLight";
    let form_data = {};

    this.app_service.make_get_server_call(form_url,form_data)
      .subscribe({
        next: (result: any) => {
         if(result && result.length>0){
          this.agent_lists= result;

          this.agent_lists.sort((a, b) => {
            const nameA = a.Name.toUpperCase();
            const nameB = b.Name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          this.temp_agent_list = this.agent_lists


    
          console.log(result)
         }
        },
        error: (error: any) => {
          window.loadingStop("#ub-loader");
          this.msgbox.display_error_message(error);
          console.warn(error);
        },
        complete: () => {
          window.loadingStop("#ub-loader");
          console.log("Completed");
        }
      });

      

  }

  searchText: any ;
  clearSearch(){
    this.searchText = ''
    this.filterSearchResults()
  }
  filterSearchResults(){

      if(this.searchText == null){
        return
      }
      if(this.searchText == ''){
        this.agent_lists = this.temp_agent_list;
       
      }
      if( this.searchText ){
        this.agent_lists = this.temp_agent_list.filter( (data)=>data?.Name.toLowerCase().includes(this.searchText.toLowerCase()) || data?.email_ID.toLowerCase().includes(this.searchText.toLowerCase()) )
      }
        

  }
  on_Selection_Change_User_Behavious(event:any){
   
   

    const selectedRow = event.selectedRows;
    const deselectedRow = event.deselectedRows;

    selectedRow.forEach((row: any) => {
      this.selected_System_User_behaviour.push(row.dataItem);
    });

    deselectedRow.forEach((row: any) => {
      const index = this.selected_System_User_behaviour.findIndex(item => item.SystemIdentifier === row.dataItem.SystemIdentifier);
      if (index !== -1) {
        this.selected_System_User_behaviour.splice(index, 1);
      }
    });


    console.log('Selected Rows:', this.selected_System_User_behaviour);

    this.obj_configuration_setting.selected_user_behaviour_component = this.selected_System_User_behaviour;
    if(this.obj_configuration_setting.selected_user_behaviour_component.length>0)this.obj_error.displayUserError=false;
    this.selectedKeys
  }
  
  selectedKeys = []

  bindData(){
    this.selectedKeys = this.obj_configuration_setting?.selected_user_behaviour_component?.map(ele =>ele.email_ID);
  }
}
