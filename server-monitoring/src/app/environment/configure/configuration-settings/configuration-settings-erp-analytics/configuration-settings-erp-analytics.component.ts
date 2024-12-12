import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
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

  @Input('child_data') set child_data({ obj_configuration_setting, dispaly_Instances }) {
    this.obj_configuration_setting = obj_configuration_setting;
    this.obj_error.dispaly_Instances = dispaly_Instances;
    this.bindData()
  }

  constructor(
    public activeModal: NgbActiveModal,
    public app_service: AppService) {

  }

  Instance_list: any[] = [];
  selectedRows: any[] = [];
  ngOnInit() {

    this.get_all_Instance()
  }

  get_all_Instance() {
   
    let select_applicaton = this.obj_configuration_setting.selected_datasource.select_applicaton_item;

    let form_url = environment.BASE_OPKEY_URL + "ExternalApplicationSettings/GetAllSettingsByApplications";

    let form_data = { str_application: JSON.stringify(select_applicaton) };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          this.Instance_list = this.get_instance_item(result);
        },
        error: (error: any) => {
          console.warn(error);
        },
        complete: () => {
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


  onCellClick(event: any) {
 
    const clickedRowData = event.dataItem;
    console.log(clickedRowData);
    
  }

  onSelectionChange(event: any) {
  

    const selectedRow = event.selectedRows;
    const deselectedRow = event.deselectedRows;

    selectedRow.forEach((row: any) => {
      this.selectedRows.push(row.dataItem);
    });

    deselectedRow.forEach((row: any) => {
      const index = this.selectedRows.findIndex(item => item.SystemIdentifier === row.dataItem.SystemIdentifier);
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      }
    });


    console.log('Selected Rows:', this.selectedRows);

    this.obj_configuration_setting.selected_erp_analytics = this.selectedRows;
  
    if(this.obj_configuration_setting.selected_erp_analytics.length>0)this.obj_error.dispaly_Instances = false;

  }
  selectedKeys = []

  bindData(){
    this.selectedKeys = []
    this.selectedRows =  []
    this.obj_configuration_setting?.selected_erp_analytics?.forEach((ele) =>{
      this.selectedKeys.push(ele.SettingsID)
      this.selectedRows.push(ele)
    });
  }


}
