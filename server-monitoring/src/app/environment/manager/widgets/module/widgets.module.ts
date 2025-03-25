import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviornmentManagerTimeExplorerGraphComponent } from '../enviornment-manager-time-Explorer-graph/enviornment-manager-time-explorer-graph/enviornment-manager-time-explorer-graph.component';
import { EnvironmentManagerWidgetsGaugeMeterComponent } from '../environment-manager-widgets-gauge-meter/environment-manager-widgets-gauge-meter.component';
import { EnvironmentManagerWidgetsHealthBarsComponent } from '../environment-manager-widgets-health-bars/environment-manager-widgets-health-bars.component';
import { EnvironmentManagerWidgetsProgressBarsUserGuidesComponent } from '../environment-manager-widgets-progress-bars-user-guides/environment-manager-widgets-progress-bars-user-guides.component';
import { EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent } from '../environment-manager-widgets-progress-bars-fastest-journeys/environment-manager-widgets-progress-bars-fastest-journeys.component';
import { EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent } from '../environment-manager-widgets-progress-bars-slowest-journeys/environment-manager-widgets-progress-bars-slowest-journeys.component';
import { EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent } from '../environment-manager-widgets-progress-bars-common-journeys/environment-manager-widgets-progress-bars-common-journeys.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    EnviornmentManagerTimeExplorerGraphComponent,
    EnvironmentManagerWidgetsGaugeMeterComponent,
    EnvironmentManagerWidgetsHealthBarsComponent,
    EnvironmentManagerWidgetsProgressBarsUserGuidesComponent,
    EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule,
    GridModule,
    NgApexchartsModule,
  ],
  exports :[
    EnviornmentManagerTimeExplorerGraphComponent,
    EnvironmentManagerWidgetsGaugeMeterComponent,
    EnvironmentManagerWidgetsHealthBarsComponent,
    EnvironmentManagerWidgetsProgressBarsUserGuidesComponent,
    EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent,
  ]
})
export class WidgetsModule { }
