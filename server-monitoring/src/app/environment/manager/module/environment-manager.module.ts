import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentManagerRoutingModule } from './environment-manager-routing.module';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { NavModule } from 'src/app/modules/nav.module';
import { FormsModule } from '@angular/forms';
import { NavigatorLeftComponent } from 'src/app/navigator/left/navigator-left.component';
import { EnvironmentManagerMainRightComponent } from '../main-right/environment-manager-main-right.component';
import { EnvironmentManagerMainRightOverviewTabComponent } from '../main-right/overview-tab/environment-manager-main-right-overview-tab.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EnvironmentConfigureModule } from '../../configure/module/environment-configure.module';
import { EnvironmentManagerMainRightLogTabComponent } from '../main-right/log-tab/environment-manager-main-right-log-tab.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { EnvironmentManagerMainRightLogTabDetailsComponent } from '../main-right/log-tab/log-tab-details/environment-manager-main-right-log-tab-details.component';
import { ManagerRightPanelComponent } from '../right-panel/manager-right-panel.component';
import { ViewSummaryDetailsComponent } from '../main-right/view-summary-details/view-summary-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { NavigatorLeftSettingsComponent } from '../../../navigator/left/navigator-left-settings/navigator-left-settings.component';
import { ManagerRightPannelWidjetComponent } from '../right-panel/manager-right-pannel-widjet/manager-right-pannel-widjet/manager-right-pannel-widjet.component';
import { EnvironmentManagerWidgetsStatWidgetComponent } from '../widgets/environment-manager-widgets-stat-widget/environment-manager-widgets-stat-widget.component';
import { EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent } from '../widgets/environment-manager-widgets-total-errors-area-widget/environment-manager-widgets-total-errors-area-widget.component';
import { EnviornmentManagerTimeExplorerGraphComponent } from '../widgets/enviornment-manager-time-Explorer-graph/enviornment-manager-time-explorer-graph/enviornment-manager-time-explorer-graph.component';
import { LayoutModule } from "@progress/kendo-angular-layout";

@NgModule({
  declarations: [
    EnvironmentManagerComponent,
    NavigatorLeftComponent,
    EnvironmentManagerMainRightComponent,
    EnvironmentManagerMainRightOverviewTabComponent,
    EnvironmentManagerMainRightLogTabComponent,
    EnvironmentManagerMainRightLogTabDetailsComponent,
    ManagerRightPanelComponent,
    ManagerRightPannelWidjetComponent,
    ViewSummaryDetailsComponent,
    NavigatorLeftSettingsComponent,
    EnvironmentManagerWidgetsStatWidgetComponent,
    EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent,
    EnviornmentManagerTimeExplorerGraphComponent,

  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentManagerRoutingModule,
    FormsModule,
    DropDownsModule,
    EnvironmentConfigureModule,
    GridModule,
    NgApexchartsModule,
    LayoutModule
  
  ],
  providers: [DatePipe],
  exports:[
    EnvironmentManagerComponent,
    NavigatorLeftComponent,
    EnvironmentManagerMainRightComponent,
    EnvironmentManagerMainRightOverviewTabComponent,
    EnvironmentManagerMainRightLogTabComponent,
    EnvironmentManagerMainRightLogTabDetailsComponent,
    ManagerRightPanelComponent,
    ViewSummaryDetailsComponent,
    NavigatorLeftSettingsComponent,
    EnvironmentManagerWidgetsStatWidgetComponent,
    EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent,
  ]
})
export class EnvironmentManagerModule { }
