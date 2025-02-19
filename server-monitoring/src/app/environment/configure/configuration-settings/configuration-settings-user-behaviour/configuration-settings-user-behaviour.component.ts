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
 selected_System_User_behaviour: any = {};
 obj_error = {
  displayUserError: false,
}

  @Input('child_data') set child_data({ obj_configuration_setting,displayUserError }) {
    this.obj_configuration_setting = obj_configuration_setting;

    if(this.obj_configuration_setting.selected_user_behaviour_component.length>0){

      this.obj_configuration_setting.selected_user_behaviour_component.map((ele)=>{
        this.selected_System_User_behaviour[ele.U_ID] = ele
      })
      this.obj_error.displayUserError=false;
    } else{
      this.obj_error.displayUserError = displayUserError;
    }
       
  
   
    this.selectedKeys = Object.keys(this.selected_System_User_behaviour);
  }
  ngOnInit() {
     this.get_all_users()
  }

  user_lists= [];
 
 temp_user_list : any;
 get_all_users() {
   
    if(this.service_data?.selectedDataSourceData?.userBehaviourdata.length != 0){
      this.user_lists = this.service_data.selectedDataSourceData.userBehaviourdata
      this.temp_user_list = this.user_lists
      return
    }
    window.loadingStart("#ub-loader", "Please wait");
    let select_applicaton = this.obj_configuration_setting.selected_datasource.select_applicaton_item;

    
    let form_url = environment.BASE_OPKEY_URL + "Base/getAllEnabledUsersLight";
    let form_data = {};

    this.app_service.make_get_server_call(form_url,form_data)
      .subscribe({
        next: (result: any) => {
         if(result && result.length>0){
          this.user_lists= result;

          this.user_lists.sort((a, b) => {
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

          this.temp_user_list = this.user_lists
          this.service_data.selectedDataSourceData.userBehaviourdata = this.user_lists
         
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
        this.user_lists = this.temp_user_list;
       
      }
      if( this.searchText ){
        this.user_lists = this.temp_user_list.filter( (data)=>data?.Name.toLowerCase().includes(this.searchText.toLowerCase()) || data?.email_ID.toLowerCase().includes(this.searchText.toLowerCase()) )
      }
        

  }
  on_Selection_Change_User_Behaviour(event:any,dataItem){
   
  
    if(event.target.checked){
      this.selected_System_User_behaviour[dataItem.U_ID] = dataItem
    }else{
      delete this.selected_System_User_behaviour[dataItem.U_ID] 
    }
    this.bindData()
  

  }
  checkAllUsers(){
    return ( Object.keys(this.selected_System_User_behaviour).length == this.user_lists.length)
  }
  on_AllSelection_Change_User_Behaviour(event: any){
    if(event.target.checked){
      this.user_lists.forEach((user)=>{
        this.selected_System_User_behaviour[user.U_ID] = user
      })
      
    }
    else{
      this.selected_System_User_behaviour = {}
    }
    this.bindData()
   

  }
  
  selectedKeys = []

  bindData(){
    this.obj_configuration_setting.selected_user_behaviour_component = Object.values(this.selected_System_User_behaviour);
    if(Object.keys(this.selected_System_User_behaviour).length>0){
      this.obj_error.displayUserError=false;
    }
    else{
      this.obj_error.displayUserError=true;
    }
    this.selectedKeys = Object.keys(this.selected_System_User_behaviour);
  }
}
