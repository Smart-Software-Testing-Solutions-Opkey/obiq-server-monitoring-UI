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
import { JourneyGridComponent } from '../../../log-tab/log-tab-details/journey-grid/journey-grid.component';
import { SelectedJourneyComponent } from '../../../log-tab/log-tab-details/selected-journey/selected-journey.component';
import { SelectedJourneyInnerComponent } from '../../../log-tab/log-tab-details/selected-journey/selected-journey-inner/selected-journey-inner.component';



@NgModule({
  declarations: [
    EMMrDsErpOverviewTabComponent,
    EMMrDsErpOVFPComponent,
    EMMrDsErpFunctionalErrorTabComponent,
    EMMrDsEFEJourneyComponent,
    EMMrDsErpLogTabComponent,
    EMMrDsERPDComponent,
    JourneyGridComponent,
    SelectedJourneyComponent,
    SelectedJourneyInnerComponent,    
  ],
  imports: [
    CommonModule,
    GridModule,
    NgbTooltipModule,
    WidgetsModule,
    GridsterComponent,
    GridsterItemComponent,
  ],
  exports :[
    EMMrDsErpOverviewTabComponent,
    EMMrDsErpOVFPComponent,
    EMMrDsErpFunctionalErrorTabComponent,
    EMMrDsEFEJourneyComponent,
    EMMrDsErpLogTabComponent,
    EMMrDsERPDComponent,
    JourneyGridComponent,
    SelectedJourneyComponent,
    SelectedJourneyInnerComponent
    
  ]
})
export class ErpModule { }
