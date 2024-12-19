import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentSelectedRoutingModule } from './environment-selected-routing.module';
import { EnvironmentSelectedComponent } from '../environment-selected.component';
import { NavModule } from 'src/app/modules/nav.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    EnvironmentSelectedComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentSelectedRoutingModule,
    NgbTooltipModule
  ]
})
export class EnvironmentSelectedModule { }
