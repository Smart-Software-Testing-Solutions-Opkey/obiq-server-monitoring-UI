import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMMrDsErpOverviewTabComponent } from '../e-m-mr-ds-erp-overview-tab/e-m-mr-ds-erp-overview-tab.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsModule } from 'src/app/environment/manager/widgets/module/widgets.module';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { EMMrDsErpOVFPComponent } from '../e-m-mr-ds-erp-overview-tab/e-m-mr-ds-erp-o-v-f-p/e-m-mr-ds-erp-o-v-f-p/e-m-mr-ds-erp-o-v-f-p.component';
import { EMMrDsErpFunctionalErrorTabComponent } from '../e-m-mr-ds-erp-functional-error-tab/e-m-mr-ds-erp-functional-error-tab.component';
import { EMMrDsEFEJourneyComponent } from '../e-m-mr-ds-erp-functional-error-tab/e-m-mr-ds-e-f-e-journey/e-m-mr-ds-e-f-e-journey/e-m-mr-ds-e-f-e-journey.component';
import { EMMrDsErpLogTabComponent } from '../e-m-mr-ds-erp-log-tab/e-m-mr-ds-erp-log-tab.component';
import { EMMrDsERPDComponent } from '../e-m-mr-ds-erp-log-tab/e-m-mr-ds-e-r-p-d/e-m-mr-ds-e-r-p-d/e-m-mr-ds-e-r-p-d.component';
import { RightPanelModule } from 'src/app/environment/manager/right-panel/module/right-panel.module';



@NgModule({
  declarations: [
    EMMrDsErpOverviewTabComponent,
    EMMrDsErpOVFPComponent,
    EMMrDsErpFunctionalErrorTabComponent,
    EMMrDsEFEJourneyComponent,
    EMMrDsErpLogTabComponent,
    EMMrDsERPDComponent,
   
  ],
  imports: [
    CommonModule,
    GridModule,
    NgbTooltipModule,
    WidgetsModule,
    GridsterComponent,
    GridsterItemComponent,
    RightPanelModule
  ],
  exports :[
    EMMrDsErpOverviewTabComponent,
    EMMrDsErpOVFPComponent,
    EMMrDsErpFunctionalErrorTabComponent,
    EMMrDsEFEJourneyComponent,
    EMMrDsErpLogTabComponent,
    EMMrDsERPDComponent,
  ]
})
export class ErpModule { }
