import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentManagerRoutingModule } from './environment-manager-routing.module';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { NavModule } from 'src/app/modules/nav.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnvironmentManagerComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentManagerRoutingModule,
    FormsModule,
  ]
})
export class EnvironmentManagerModule { }
