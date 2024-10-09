import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentConfigureRoutingModule } from './environment-configure-routing.module';
import { EnvironmentConfigureComponent } from '../environment-configure.component';
import { NavModule } from 'src/app/modules/nav.module';
import { ConfigurationSettingsComponent } from '../configuration-settings/configuration-settings.component';
import { ConfigurationDataSourceSelectionComponent } from '../configuration-settings/configuration-dataSource-selection/configuration-data-source-selection.component';
import { ConfigurationDatasourceErpAnalyticsComponent } from '../configuration-settings/configuration-datasource-Erp-Analytics/configuration-datasource-erp-analytics.component';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    EnvironmentConfigureComponent,
    ConfigurationSettingsComponent,
    ConfigurationDataSourceSelectionComponent,
    ConfigurationDatasourceErpAnalyticsComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentConfigureRoutingModule,
    GridModule
    
    
  ],
  
})
export class EnvironmentConfigureModule { }
