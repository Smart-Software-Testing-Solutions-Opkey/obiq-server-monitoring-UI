import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentSelectedRoutingModule } from './environment-selected-routing.module';
import { EnvironmentSelectedComponent } from '../environment-selected.component';
import { NavModule } from 'src/app/modules/nav.module';


@NgModule({
  declarations: [
    EnvironmentSelectedComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentSelectedRoutingModule
  ]
})
export class EnvironmentSelectedModule { }
