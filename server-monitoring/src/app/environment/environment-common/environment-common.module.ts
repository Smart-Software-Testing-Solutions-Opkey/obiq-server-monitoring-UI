import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LayoutModule } from "@progress/kendo-angular-layout";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { PersisterModalComponent } from './persister-modal/persister-modal.component';
import { FilterErpApplicationComponent } from './filters/filter-erp-application/filter-erp-application.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersisterModalComponent,
    FilterErpApplicationComponent

  ],
  imports: [
    CommonModule,
    DropDownsModule,
    LabelModule,
    FormsModule
    // LayoutModule
  ],
  exports:[
    PersisterModalComponent,
    FilterErpApplicationComponent
  ]
})
export class EnvironmentCommonModule { }
