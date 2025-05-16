import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-erp-analytics',
  templateUrl: './configuration-settings-erp-analytics.component.html',
  styleUrl: './configuration-settings-erp-analytics.component.scss'
})
export class ConfigurationSettingsErpAnalyticsComponent {


  obj_configuration_setting: any;

  obj_error = {
    dispaly_Instances: false,
  }

  selected_erp_analytics: any = {};

  @Input('child_data') set child_data({ obj_configuration_setting, dispaly_Instances }) {

    
    this.obj_configuration_setting = obj_configuration_setting;
    if(this.obj_configuration_setting.selected_erp_analytics.length>0){

      this.obj_configuration_setting.selected_erp_analytics.map((ele)=>{
        this.selected_erp_analytics[ele.SystemIdentifier] = ele
      })
      this.obj_error.dispaly_Instances=false;
    } else{
      this.obj_error.dispaly_Instances = dispaly_Instances;
    }
     
    this.selectedKeys = Object.keys(this.selected_erp_analytics);
  
    // this.obj_error.dispaly_Instances = dispaly_Instances;
    // this.bindData()
  }

  constructor(
    public activeModal: NgbActiveModal,
    public app_service: AppService,
    private msgbox: MsgboxService,
    private service_data : AppDataService ) {

  }

  Instance_list: any[] = [];
  selectedRows: any[] = [];
  ngOnInit() {

    this.get_all_Instance()
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
        this.Instance_list = this.temp_Instance_list;
       
      }
      if( this.searchText ){
        this.Instance_list = this.temp_Instance_list.filter( (data)=>
          data?.SystemIdentifier.toLowerCase().includes(this.searchText.toLowerCase()) || data?.CreatedByName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ModifiedByName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ModifiedOn.toLowerCase().includes(this.searchText.toLowerCase())) 
       
      }
        

  }

  temp_Instance_list: any;
  get_all_Instance() {
   
    if(this.service_data?.selectedDataSourceData?.erpAnalyticsData.length != 0){
      this.Instance_list = this.service_data.selectedDataSourceData.erpAnalyticsData
      this.temp_Instance_list = JSON.parse(JSON.stringify(this.Instance_list))
      return
    }
    window.loadingStart("#erp-loader", "Please wait");
    let select_applicaton = this.obj_configuration_setting.selected_datasource.select_applicaton_item;

    let form_url = environment.BASE_OPKEY_URL + "ExternalApplicationSettings/GetAllSettingsByApplications";

    let form_data = { str_application : JSON.stringify(select_applicaton)}

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
       
          this.Instance_list = this.get_instance_item(result);
          this.temp_Instance_list = this.Instance_list
          this.service_data.selectedDataSourceData.erpAnalyticsData = this.Instance_list
        },
        error: (error: any) => {
          window.loadingStop("#erp-loader");
          this.msgbox.display_error_message(error);
          console.warn(error);
        },
        complete: () => {
          window.loadingStop("#erp-loader");
          console.log("Completed");
        }
      });


  }


  get_instance_item(object) {
   
    let incident = [];
    Object.keys(object).forEach(function (obj, ind) {
      object[obj].forEach(item => {
        incident.push(item);
      })
    })

    return incident;
}


  onSelectionChange(event: any, dataItem) {

    if(event.target.checked){
      this.selected_erp_analytics[dataItem.SystemIdentifier] = dataItem
    }else{
      delete this.selected_erp_analytics[dataItem.SystemIdentifier] 
    }
    this.bindData()

  }
  

  checkAllErp(){
    return ( Object.keys(this.selected_erp_analytics).length == this.Instance_list.length && this.Instance_list.length!=0)
  }
  on_allSelection_change_erp_behaviour(event: any){
    if(event.target.checked){
      this.Instance_list.forEach((user)=>{
        this.selected_erp_analytics[user.SystemIdentifier] = user
      })
      
    }
    else{
      this.selected_erp_analytics = {}
    }
    this.bindData()
  }
  
  selectedKeys = []

  bindData(){
    this.obj_configuration_setting.selected_erp_analytics = Object.values(this.selected_erp_analytics);
    if(Object.keys(this.selected_erp_analytics).length>0){
      this.obj_error.dispaly_Instances=false;
    }
    else{
      this.obj_error.dispaly_Instances=true;
    }
    this.selectedKeys = Object.keys(this.selected_erp_analytics);
  }
}




