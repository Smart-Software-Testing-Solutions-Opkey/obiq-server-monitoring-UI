import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LayoutModule } from "@progress/kendo-angular-layout";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { PersisterModalComponent } from './persister-modal/persister-modal.component';
import { FilterErpApplicationComponent } from './filters/filter-erp-application/filter-erp-application.component';
import { FormsModule } from '@angular/forms';
import { FilterErpEnvironmentComponent } from './filters/filter-erp-environment/filter-erp-environment/filter-erp-environment.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from "../../pipes/search/search.pipe";
import { StringArrayCutterPipe } from 'src/app/pipes/string-array-cutter/string-array-cutter.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PersisterModalComponent,
    FilterErpApplicationComponent,
    FilterErpEnvironmentComponent,

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
   
],
  exports:[
    PersisterModalComponent,
    FilterErpApplicationComponent,
    FilterErpEnvironmentComponent
  ],
  providers:[
    SearchPipe,
    StringArrayCutterPipe
  ]
})
export class EnvironmentCommonModule { }
