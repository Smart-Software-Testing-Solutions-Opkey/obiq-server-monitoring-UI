import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configuration-settings',
  templateUrl: './configuration-settings.component.html',
  styleUrl: './configuration-settings.component.scss'
})
export class ConfigurationSettingsComponent {

  constructor( public activeModal: NgbActiveModal,){
    
  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }

  showSelectionComponent = true;  
  passedData: any;  

 
  Navigate_Child_comp() {

    this.showSelectionComponent = false;
  }

 
  handleDataCompletion(data: any) {
    this.passedData = data;  
  }

  obj_configuration_setting = {
    tab: "datasource",
    title: "Add View",
    selected_datasource: [],
    selected_erp_analytics: []
  }

  next() {
    debugger;
    if (this.obj_configuration_setting.tab == "datasource") { 
      this.obj_configuration_setting.tab = "datasource_value";
      this.obj_configuration_setting.title = "Add ERP Analytics";
      console.log("selected_datasource===", this.obj_configuration_setting.selected_datasource);
    }
    else if (this.obj_configuration_setting.tab == "datasource_value") { 
      this.obj_configuration_setting.tab = "datasource_summary";
      this.obj_configuration_setting.title = "Create View";
    }
    else if (this.obj_configuration_setting.tab == "datasource_summary") { 
      alert("error"); 
    }

  }

  back() {

    if (this.obj_configuration_setting.tab == "datasource_value") { 
      this.obj_configuration_setting.tab = "datasource"; 
      this.obj_configuration_setting.title = "Add ERP Analytics";
    }
    else if (this.obj_configuration_setting.tab == "datasource_summary") { 
      this.obj_configuration_setting.tab = "datasource_value"; 
      this.obj_configuration_setting.title = "Create View";
    }
    else if (this.obj_configuration_setting.tab == "datasource") { 
      alert("error");
    }

  }

}
