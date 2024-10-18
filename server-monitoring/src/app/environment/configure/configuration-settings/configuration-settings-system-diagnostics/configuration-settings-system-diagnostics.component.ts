import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-configuration-settings-system-diagnostics',
  templateUrl: './configuration-settings-system-diagnostics.component.html',
  styleUrl: './configuration-settings-system-diagnostics.component.scss'
})
export class ConfigurationSettingsSystemDiagnosticsComponent {

  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    this.obj_configuration_setting = obj_configuration_setting;
    console.log("obj_configuration_setting===", obj_configuration_setting);
  }
  
}
