import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentConfigureRoutingModule } from './environment-configure-routing.module';
import { EnvironmentConfigureComponent } from '../environment-configure.component';


@NgModule({
  declarations: [EnvironmentConfigureComponent],
  imports: [
    CommonModule,
    EnvironmentConfigureRoutingModule
  ]
})
export class EnvironmentConfigureModule { }
