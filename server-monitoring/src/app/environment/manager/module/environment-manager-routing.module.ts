import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { EnvironmentManagerSettingsComponent } from '../environment-manager-settings/environment-manager-settings.component';

const routes: Routes = [
  
   {
  path: '',
  component: EnvironmentManagerComponent,
  data: { title: 'Environment Manager' ,breadcrumb:'Manager'}
},
{
  path:'settings',
  component:EnvironmentManagerSettingsComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentManagerRoutingModule { }
