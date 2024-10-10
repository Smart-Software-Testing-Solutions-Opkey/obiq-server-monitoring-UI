import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-configuration-settings',
  templateUrl: './configuration-settings.component.html',
  styleUrl: './configuration-settings.component.scss'
})
export class ConfigurationSettingsComponent {

  constructor( 
    public activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService
  ) {}
  close_model() {
    this.activeModal.dismiss('close modal');
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
      this.obj_configuration_setting.tab = "ERP_Analytics";
      this.obj_configuration_setting.title = "Add ERP Analytics";
      console.log("selected_datasource===", this.obj_configuration_setting.selected_datasource);
    }
    else if (this.obj_configuration_setting.tab == "ERP_Analytics") { 
      this.obj_configuration_setting.tab = "view_summary";
      this.obj_configuration_setting.title = "Create View";
      console.log("selected_erp_analytics===", this.obj_configuration_setting.selected_erp_analytics);
    }
    else if (this.obj_configuration_setting.tab == "view_summary") { 
      alert("error"); 
      
    }

  }

  back() {

    if (this.obj_configuration_setting.tab == "ERP_Analytics") { 
      this.obj_configuration_setting.tab = "datasource"; 
      this.obj_configuration_setting.title = "Create View";
    }
    else if (this.obj_configuration_setting.tab == "view_summary") { 
      this.obj_configuration_setting.tab = "ERP_Analytics"; 
      this.obj_configuration_setting.title = "Add ERP Analytics";
    }
    else if (this.obj_configuration_setting.tab == "datasource") { 
      alert("error");
    }

  }

  finish() {
    debugger;
    this.service_data.is_env_configure = true;
    this.close_model();
    this.router.navigate(['/environment']);
  }

}
