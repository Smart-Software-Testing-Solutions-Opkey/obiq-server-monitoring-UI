import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentRoutingModule } from './environment-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConfigurationSettingsUserBehaviourComponent } from './configure/configuration-settings/configuration-settings-user-behaviour/configuration-settings-user-behaviour.component';
import { ConfigurationSettingsTestAutomationComponent } from './configure/configuration-settings/configuration-settings-test-automation/configuration-settings-test-automation.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentCommonModule } from './environment-common/environment-common.module';
import { EnvironmentManagerWidgetsProgressBarsUserGuidesComponent } from './manager/widgets/environment-manager-widgets-progress-bars-user-guides/environment-manager-widgets-progress-bars-user-guides.component';
import { EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent } from './manager/widgets/environment-manager-widgets-progress-bars-fastest-journeys/environment-manager-widgets-progress-bars-fastest-journeys.component';
import { EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent } from './manager/widgets/environment-manager-widgets-progress-bars-slowest-journeys/environment-manager-widgets-progress-bars-slowest-journeys.component';
import { EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent } from './manager/widgets/environment-manager-widgets-progress-bars-common-journeys/environment-manager-widgets-progress-bars-common-journeys.component';

@NgModule({
  declarations: [    
  
    
  
  
    EnvironmentManagerWidgetsProgressBarsUserGuidesComponent, EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent, EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent, EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent
  ],
  imports: [
    CommonModule,
    EnvironmentRoutingModule,
    NgApexchartsModule,
    NgbTooltipModule,
    EnvironmentCommonModule
  ]
})
export class EnvironmentModule { }
