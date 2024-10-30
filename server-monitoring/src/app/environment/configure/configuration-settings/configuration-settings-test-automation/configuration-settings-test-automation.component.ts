import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-test-automation',
  templateUrl: './configuration-settings-test-automation.component.html',
  styleUrl: './configuration-settings-test-automation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationSettingsTestAutomationComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
   private router: Router,
   private route: ActivatedRoute,
   public service_data: AppDataService,
   public app_service: AppService,
   private cdRef: ChangeDetectorRef
  ){

 }
  obj_configuration_setting:any;

  datasource_agents: Array<any> = [];
  obj_error = {
    displayTestError: false,
  }

  @Input('child_data') set child_data({ obj_configuration_setting,displayTestError }) {
    this.obj_configuration_setting = obj_configuration_setting;
    this.obj_error.displayTestError = displayTestError
    console.log("in Test Automation", obj_configuration_setting);
  }

  ngOnInit(){
    this.get_agents();
    if(!this.obj_configuration_setting["selected_test_automation_analysis"]){
      this.obj_configuration_setting["selected_test_automation_analysis"] = [];
    }
  }

  get_agents() {


    var ajax_url = environment.BASE_OPKEY_URL + "Execution/getAllAgents";

    this.app_service.make_get_server_call(ajax_url, {})
    .subscribe({
      next: (result: any) => {
        if(result && result.length){
          this.datasource_agents = result;
          this.cdRef.detectChanges();
        }
      },
      error: (error: any) => {
        console.warn(error);
      }
    });
  }

  onSelectionChange(event){
    
    if(event){
      if(event.selectedRows && event.selectedRows.length){
        event.selectedRows.forEach((item) => {
          this.obj_configuration_setting["selected_test_automation_analysis"].push(item.dataItem);
        })
      } else if(event.deselectedRows && event.deselectedRows.length){
        event.deselectedRows.forEach((item) => {
          const index = this.obj_configuration_setting["selected_test_automation_analysis"].findIndex((selectedItem) => selectedItem.AgentID == item.dataItem.AgentID);
          if(index > -1){
            this.obj_configuration_setting["selected_test_automation_analysis"].splice(index, 1);
          }
        })
      }
    }

  }
}
