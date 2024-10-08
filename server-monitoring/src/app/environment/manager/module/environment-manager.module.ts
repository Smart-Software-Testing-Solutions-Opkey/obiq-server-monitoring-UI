import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentManagerRoutingModule } from './environment-manager-routing.module';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { NavModule } from 'src/app/modules/nav.module';
import { FormsModule } from '@angular/forms';
import { EnvironmentManagerLeftMenuComponent } from '../navigator/environment-manager-left-menu.component';
import { SeletedViewComponent } from '../view/selected-view.component';
import { EnvironmentManagerRightSectionComponent } from '../view-right-section/environment-manager-right-section.component';


@NgModule({
  declarations: [
    EnvironmentManagerComponent,
    EnvironmentManagerLeftMenuComponent,
    EnvironmentManagerRightSectionComponent,
    SeletedViewComponent,
  ],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentManagerRoutingModule,
    FormsModule,
  ]
})
export class EnvironmentManagerModule { }
