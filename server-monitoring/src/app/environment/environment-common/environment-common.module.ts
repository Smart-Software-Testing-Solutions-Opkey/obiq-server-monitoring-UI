import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { PersisterModalComponent } from './persister-modal/persister-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from "../../pipes/search/search.pipe";
import { StringArrayCutterPipe } from 'src/app/pipes/string-array-cutter/string-array-cutter.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MsgboxDialogComponent } from './msgbox-dialog/msgbox-dialog.component';
import { CommonEmailComponent } from './common-email/common-email.component';

@NgModule({
  declarations: [
    // MsgboxDialogComponent,
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
  ],
  providers:[
    SearchPipe,
    StringArrayCutterPipe
  ]
})
export class EnvironmentCommonModule { }
