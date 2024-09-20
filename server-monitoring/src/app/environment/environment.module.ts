import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentRoutingModule } from './environment-routing.module';
import { EnvironmentSelectedComponent } from './selected/environment-selected.component';
import { EnvironmentManagerComponent } from './manager/environment-manager.component';


@NgModule({
  declarations: [    
    EnvironmentManagerComponent,
    EnvironmentSelectedComponent
  ],
  imports: [
    CommonModule,
    EnvironmentRoutingModule
  ]
})
export class EnvironmentModule { }
