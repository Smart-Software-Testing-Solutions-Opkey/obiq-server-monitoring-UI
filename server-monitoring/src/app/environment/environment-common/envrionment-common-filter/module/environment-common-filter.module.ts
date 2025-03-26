import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCalendarComponent } from '../filters/filter-calendar/filter-calendar.component';
import { EnvrionmentCommonFilterComponent } from '../envrionment-common-filter.component';
import { FormsModule } from '@angular/forms';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { ECommonFilterInnerComponent } from '../filter-inner/e-common-filter-inner.component';
import { FilterDatetimeComponent } from '../filters/filter-datetime/filter-datetime.component';
import { FilterErpApplicationComponent } from '../filters/filter-erp-application/filter-erp-application.component';
import { FilterErpEnvironmentComponent } from '../filters/filter-erp-environment/filter-erp-environment.component';
import { FilterSearchComponent } from '../filters/filter-search/filter-search.component';
import { FilterErpModuleComponent } from '../filters/filter-erp-module/filter-erp-module.component';
import { FilterErpProcessComponent } from '../filters/filter-erp-processes/filter-erp-process.component';
import { FilterUserComponent } from '../filters/filter-user/filter-user.component';
import { FilterStatusComponent } from '../filters/filter-status/filter-status.component';
import { SearchPipe } from 'src/app/pipes/search/search.pipe';
import { StringArrayCutterPipe } from 'src/app/pipes/string-array-cutter/string-array-cutter.pipe';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { NgbDatepickerModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from "@progress/kendo-angular-label";


@NgModule({
  declarations: [
    ECommonFilterInnerComponent,
    EnvrionmentCommonFilterComponent,
    FilterCalendarComponent,
    FilterDatetimeComponent,
    FilterErpApplicationComponent,
    FilterErpEnvironmentComponent,
    FilterErpModuleComponent,
    FilterErpProcessComponent,
    FilterSearchComponent,
    FilterUserComponent,
    FilterStatusComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    WindowModule,
    LabelModule,
    DropDownsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    DateInputsModule,
    NgbTooltipModule,
    SearchPipe,
    StringArrayCutterPipe,
  ],
  providers:[
    SearchPipe,
    StringArrayCutterPipe
  ],
  exports: [
    ECommonFilterInnerComponent,
    EnvrionmentCommonFilterComponent,
    FilterCalendarComponent,
    FilterDatetimeComponent,
    FilterErpApplicationComponent,
    FilterErpEnvironmentComponent,
    FilterErpModuleComponent,
    FilterErpProcessComponent,
    FilterSearchComponent,
    FilterUserComponent,
    FilterStatusComponent
  ]
})
export class EnvironmentCommonFilterModule { }
