import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration-datasource-erp-analytics',
  templateUrl: './configuration-datasource-erp-analytics.component.html',
  styleUrl: './configuration-datasource-erp-analytics.component.scss'
})
export class ConfigurationDatasourceErpAnalyticsComponent implements OnInit {

  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    this.obj_configuration_setting = obj_configuration_setting;
  }


  ngOnInit() {
  
   }

}
