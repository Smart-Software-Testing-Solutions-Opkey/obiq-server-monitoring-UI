import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentManagerRoutingModule } from './environment-manager-routing.module';
import { EnvironmentManagerComponent } from '../environment-manager.component';


@NgModule({
  declarations: [
    EnvironmentManagerComponent,
  ],
  imports: [
    CommonModule,
    EnvironmentManagerRoutingModule
  ]
})
export class EnvironmentManagerModule { }
