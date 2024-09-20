import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentManagerRoutingModule } from './environment-manager-routing.module';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { NavModule } from 'src/app/modules/nav.module';


@NgModule({
  declarations: [
    EnvironmentManagerComponent,
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentManagerRoutingModule
  ]
})
export class EnvironmentManagerModule { }
