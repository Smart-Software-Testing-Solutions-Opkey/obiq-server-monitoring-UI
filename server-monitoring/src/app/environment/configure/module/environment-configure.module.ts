import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentConfigureRoutingModule } from './environment-configure-routing.module';
import { EnvironmentConfigureComponent } from '../environment-configure.component';
import { NavModule } from 'src/app/modules/nav.module';


@NgModule({
  declarations: [EnvironmentConfigureComponent],
  imports: [
    CommonModule,
    NavModule,
    EnvironmentConfigureRoutingModule
  ]
})
export class EnvironmentConfigureModule { }
