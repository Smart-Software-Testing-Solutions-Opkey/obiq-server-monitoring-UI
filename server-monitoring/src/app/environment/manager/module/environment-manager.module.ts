import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentManagerRoutingModule } from './environment-manager-routing.module';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { NavModule } from 'src/app/modules/nav.module';
import { NavigatorLeftComponent } from 'src/app/navigator/left/navigator-left.component';


@NgModule({
  declarations: [
    EnvironmentManagerComponent,
    NavigatorLeftComponent,  
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentManagerRoutingModule
  ]
})
export class EnvironmentManagerModule { }
