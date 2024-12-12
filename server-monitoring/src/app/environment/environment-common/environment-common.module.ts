import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersisterModalComponent } from './persister-modal/persister-modal.component';



@NgModule({
  declarations: [
    PersisterModalComponent

  ],
  imports: [
    CommonModule
  ],
  exports:[
    PersisterModalComponent
  ]
})
export class EnvironmentCommonModule { }
