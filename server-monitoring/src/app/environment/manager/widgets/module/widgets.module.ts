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
import { EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent } from '../environment-manager-widgets-total-errors-area-widget/environment-manager-widgets-total-errors-area-widget.component';
import { EMApiErrorWidgetComponent } from '../user-behaviour/e-m-api-error-widget/e-m-api-error-widget.component';
import { EMConsoleErrorWidgetComponent } from '../user-behaviour/e-m-console-error-widget/e-m-console-error-widget.component';
import { EMFunctionalErrorWidgetComponent } from '../user-behaviour/e-m-functional-error-widget/e-m-functional-error-widget.component';



@NgModule({
  declarations: [
    EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent,
    EnviornmentManagerTimeExplorerGraphComponent,
    EnvironmentManagerWidgetsGaugeMeterComponent,
    EnvironmentManagerWidgetsHealthBarsComponent,
    EnvironmentManagerWidgetsProgressBarsUserGuidesComponent,
    EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent,
    EMApiErrorWidgetComponent,
    EMConsoleErrorWidgetComponent,
    EMFunctionalErrorWidgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule,
    GridModule,
    NgApexchartsModule,
  ],
  exports :[
    EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent,
    EnviornmentManagerTimeExplorerGraphComponent,
    EnvironmentManagerWidgetsGaugeMeterComponent,
    EnvironmentManagerWidgetsHealthBarsComponent,
    EnvironmentManagerWidgetsProgressBarsUserGuidesComponent,
    EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent,
    EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent,
    EMApiErrorWidgetComponent,
    EMConsoleErrorWidgetComponent,
    EMFunctionalErrorWidgetComponent
  ]
})
export class WidgetsModule { }
