import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LayoutModule } from "@progress/kendo-angular-layout";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { PersisterModalComponent } from './persister-modal/persister-modal.component';
import { FilterErpApplicationComponent } from './filters/filter-erp-application/filter-erp-application.component';
import { FormsModule } from '@angular/forms';
import { FilterErpEnvironmentComponent } from './filters/filter-erp-environment/filter-erp-environment.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from "../../pipes/search/search.pipe";
import { StringArrayCutterPipe } from 'src/app/pipes/string-array-cutter/string-array-cutter.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EnvrionmentCommonFilterComponent } from './envrionment-common-filter/envrionment-common-filter.component';
import { FilterSearchComponent } from './filters/filter-search/filter-search.component';
import { FilterErpProcessComponent } from './filters/filter-erp-processes/filter-erp-process.component';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { FilterErpModuleComponent } from './filters/filter-erp-module/filter-erp-module.component';
import { FilterUserComponent } from './filters/filter-user/filter-user.component';
import { FilterStatusComponent } from './filters/filter-status/filter-status.component';
import { ECommonFilterInnerComponent } from './envrionment-common-filter/filter-inner/e-common-filter-inner.component';
import { FilterCalendarComponent } from './filters/filter-calendar/filter-calendar.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { FilterDatetimeComponent } from './filters/filter-datetime/filter-datetime.component';
import { MsgboxDialogComponent } from './msgbox-dialog/msgbox-dialog.component';
import { CommonEmailComponent } from './common-email/common-email.component';

@NgModule({
  declarations: [
    PersisterModalComponent,
    FilterErpApplicationComponent,
    FilterErpEnvironmentComponent,
    EnvrionmentCommonFilterComponent,
    FilterSearchComponent,
    FilterErpProcessComponent,
    FilterErpModuleComponent,
    FilterUserComponent,
    FilterStatusComponent,
    ECommonFilterInnerComponent,
    FilterCalendarComponent,
    FilterDatetimeComponent,
    MsgboxDialogComponent,
    CommonEmailComponent

  ],
  imports: [
    CommonModule,
    DropDownsModule,
    LabelModule,
    FormsModule,
    NgbDropdownModule,
    SearchPipe,
    StringArrayCutterPipe,
    NgbTooltipModule,
    WindowModule,
    NgbDatepickerModule,
    DateInputsModule,

   
],
  exports:[
    PersisterModalComponent,
    FilterErpApplicationComponent,
    FilterErpEnvironmentComponent,
    EnvrionmentCommonFilterComponent,
    FilterSearchComponent,
    FilterErpProcessComponent
  ],
  providers:[
    SearchPipe,
    StringArrayCutterPipe
  ]
})
export class EnvironmentCommonModule { }
