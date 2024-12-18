import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentSelectedRoutingModule } from './environment-selected-routing.module';
import { EnvironmentSelectedComponent } from '../environment-selected.component';
import { NavModule } from 'src/app/modules/nav.module';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EMMrDsErpAllJourneyComponent } from '../../manager/main-right/datasources/erp/all-journey/e-m-mr-ds-erp-all-journey.component';
import { EnvironmentManagerModule } from '../../manager/module/environment-manager.module';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EnvironmentConfigureModule } from '../../configure/module/environment-configure.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
@NgModule({
  declarations: [
    EnvironmentSelectedComponent,
    EMMrDsErpAllJourneyComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentSelectedRoutingModule,
    NgbTooltipModule,
    EnvironmentManagerModule,
    LayoutModule,
      CommonModule,
        NavModule,
        FormsModule,
        DropDownsModule,
        EnvironmentConfigureModule,
        GridModule,
        NgApexchartsModule,
        LabelModule,
        DateInputsModule,
        GridsterComponent,
        GridsterItemComponent,
        NgbModule

  ]
})
export class EnvironmentSelectedModule { }
