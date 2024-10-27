import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-configuration-settings-test-automation',
  templateUrl: './configuration-settings-test-automation.component.html',
  styleUrl: './configuration-settings-test-automation.component.scss'
})
export class ConfigurationSettingsTestAutomationComponent {
  constructor(
    public activeModal: NgbActiveModal,
   private router: Router,
   private route: ActivatedRoute,
   public service_data: AppDataService,
   public app_service: AppService,){

 }
  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    this.obj_configuration_setting = obj_configuration_setting;
    console.log("in Test Automation", obj_configuration_setting);
  }
}
