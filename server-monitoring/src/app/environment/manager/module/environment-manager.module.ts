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
import { ManagerRightPanelComponent } from '../right-panel/manager-right-panel.component';
import { ViewSummaryDetailsComponent } from '../main-right/view-summary-details/view-summary-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
// import { NavigatorLeftSettingsComponent } from '../../../navigator/left/navigator-left-settings/navigator-left-settings.component';
import { ManagerRightPannelWidjetComponent } from '../right-panel/manager-right-pannel-widjet/manager-right-pannel-widjet/manager-right-pannel-widjet.component';
import { EnvironmentManagerWidgetsStatWidgetComponent } from '../widgets/environment-manager-widgets-stat-widget/environment-manager-widgets-stat-widget.component';
import { LayoutModule } from "@progress/kendo-angular-layout";
// import { NavigatorLeftTreeViewComponent } from '../../../navigator/navigator-left-tree-view/navigator-left-tree-view.component';
import { ViewJourneySnapshotComponent } from '../main-right/log-tab/log-tab-details/selected-journey/selected-journey-inner/view-journey-snapshot/view-journey-snapshot.component';
import { ViewJourneyErrorComponent } from '../main-right/log-tab/log-tab-details/selected-journey/selected-journey-inner/view-journey-error/view-journey-error.component';
// import { ManagerMainRightLogTabDetailsInfoComponent } from '../main-right/log-tab/log-tab-details/info/manager-main-right-log-tab-details-info.component';
import { EnvironmentManagerWidgetsProgressBarsComponent } from '../widgets/progress-bars/environment-manager-widgets-progress-bars.component';
import { LabelModule } from "@progress/kendo-angular-label";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { EMMrDsErpOverviewTabComponent } from '../main-right/datasources/erp/e-m-mr-ds-erp-overview-tab/e-m-mr-ds-erp-overview-tab.component';
// import { EnvironmentCommonModule } from '../../environment-common/environment-common.module';
import { WidgetsModule } from '../widgets/module/widgets.module';
import { NavigatorModule } from 'src/app/navigator/module/navigator.module';
import { EnvironmentCommonFilterModule } from '../../environment-common/envrionment-common-filter/module/environment-common-filter.module';
import { UserBehaviourModule } from '../main-right/datasources/user-behaviour/module/user-behaviour.module';
import { ErpModule } from '../main-right/datasources/erp/module/erp.module';
import { RightPanelModule } from '../right-panel/module/right-panel.module';

@NgModule({
  declarations: [
    EnvironmentManagerComponent,
    EnvironmentManagerMainRightComponent,
    EnvironmentManagerMainRightOverviewTabComponent,
    EnvironmentManagerMainRightLogTabComponent,
    ManagerRightPanelComponent,
    ManagerRightPannelWidjetComponent,
    ViewSummaryDetailsComponent,   
    EnvironmentManagerWidgetsStatWidgetComponent,
    ViewJourneySnapshotComponent,
    ViewJourneyErrorComponent,
    EnvironmentManagerWidgetsProgressBarsComponent,
  
    
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
    LayoutModule,
    LabelModule,
    DateInputsModule,
    NgbTooltipModule,
    FormsModule,
    GridsterComponent,
    GridsterItemComponent,
    NgbModule,
    WidgetsModule,
    NavigatorModule,
    EnvironmentCommonFilterModule,
    UserBehaviourModule,
    ErpModule,
    RightPanelModule
  ],
  providers: [DatePipe],
  exports:[
    EnvironmentManagerComponent,
    EnvironmentManagerMainRightComponent,
    EnvironmentManagerMainRightOverviewTabComponent,
    EnvironmentManagerMainRightLogTabComponent,
    ManagerRightPanelComponent,
    ViewSummaryDetailsComponent,
    EnvironmentManagerWidgetsStatWidgetComponent,
    ViewJourneySnapshotComponent,
    ViewJourneyErrorComponent,
  ]
})
export class EnvironmentManagerModule { }
