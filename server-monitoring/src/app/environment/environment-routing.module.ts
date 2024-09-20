import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentSelectedComponent } from './selected/environment-selected.component';
import { EnvironmentManagerComponent } from './manager/environment-manager.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: EnvironmentManagerComponent
  },{
    path: ':id',
    component: EnvironmentSelectedComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentRoutingModule { }
