import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersisterModalComponent } from './persister-modal/persister-modal.component';
import { FilterErpApplicationComponent } from './filters/filter-erp-application/filter-erp-application.component';



@NgModule({
  declarations: [
    PersisterModalComponent,
    FilterErpApplicationComponent

  ],
  imports: [
    CommonModule
  ],
  exports:[
    PersisterModalComponent
  ]
})
export class EnvironmentCommonModule { }
