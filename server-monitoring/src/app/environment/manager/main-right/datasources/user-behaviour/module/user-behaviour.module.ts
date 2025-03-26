import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMDsUbFunctionalErrorTabComponent } from '../e-m-ds-ub-functional-error-tab/e-m-ds-ub-functional-error-tab.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EMDsUbFEPanelComponent } from '../e-m-ds-ub-functional-error-tab/e-m-ds-ub-f-e-panel/e-m-ds-ub-f-e-panel.component';
import { EMDsUbJourneyComponent } from '../e-m-ds-ub-Journey/e-m-ds-ub-journey/e-m-ds-ub-journey.component';
import { EMMrDsUbConsoleErrorTabComponent } from '../e-m-mr-ds-ub-console-error-tab/e-m-mr-ds-ub-console-error-tab.component';
import { EMMrDsUbApiErrorTabComponent } from '../e-m-mr-ds-ub-api-error-tab/e-m-mr-ds-ub-api-error-tab.component';
import { EMMrDsUbCEPanelComponent } from '../e-m-mr-ds-ub-console-error-tab/e-m-mr-ds-ub-c-e-panel/e-m-mr-ds-ub-c-e-panel.component';
import { EMMrDsUbAEPanelComponent } from '../e-m-mr-ds-ub-api-error-tab/e-m-mr-ds-ub-a-e-panel/e-m-mr-ds-ub-a-e-panel.component';
import { EMMrDsUbOverviewTabComponent } from '../e-m-mr-ds-ub-overview-tab/e-m-mr-ds-ub-overview-tab.component';
import { WidgetsModule } from 'src/app/environment/manager/widgets/module/widgets.module';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';



@NgModule({
  declarations: [
    EMDsUbFunctionalErrorTabComponent,
    EMDsUbFEPanelComponent,
    EMDsUbJourneyComponent,
    EMMrDsUbConsoleErrorTabComponent,
    EMMrDsUbApiErrorTabComponent,
    EMMrDsUbCEPanelComponent,
    EMMrDsUbAEPanelComponent,
    EMMrDsUbOverviewTabComponent

  ],
  imports: [
    CommonModule,
    GridModule,
    NgbTooltipModule,
    WidgetsModule,
    GridsterComponent,
    GridsterItemComponent,
  ],
  exports:[
    EMDsUbFunctionalErrorTabComponent,
    EMDsUbFEPanelComponent,
    EMDsUbJourneyComponent,
    EMMrDsUbConsoleErrorTabComponent,
    EMMrDsUbApiErrorTabComponent,
    EMMrDsUbCEPanelComponent,
    EMMrDsUbAEPanelComponent,
    EMMrDsUbOverviewTabComponent
  ]

})
export class UserBehaviourModule { }
