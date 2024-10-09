import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentRoutingModule } from './environment-routing.module';
import { ConfigurationDatasourceErpAnalyticsComponent } from './configure/configuration-settings/configuration-datasource-Erp-Analytics/configuration-datasource-erp-analytics.component';


@NgModule({
  declarations: [    

  
    ConfigurationDatasourceErpAnalyticsComponent
  ],
  imports: [
    CommonModule,
    EnvironmentRoutingModule
  ]
})
export class EnvironmentModule { }
