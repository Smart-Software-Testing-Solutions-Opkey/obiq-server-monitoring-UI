import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentSelectedRoutingModule } from './environment-selected-routing.module';
import { EnvironmentSelectedComponent } from '../environment-selected.component';


@NgModule({
  declarations: [
    EnvironmentSelectedComponent
  ],
  imports: [
    CommonModule,
    EnvironmentSelectedRoutingModule
  ]
})
export class EnvironmentSelectedModule { }
