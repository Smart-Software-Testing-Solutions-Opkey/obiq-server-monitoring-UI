import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentManagerComponent } from '../environment-manager.component';

const routes: Routes = [
  
   {
  path: '',
  component: EnvironmentManagerComponent,
  data: { title: 'Environment Manager' ,breadcrumb:'Manager'}
},
{
  path: 'selected',
  loadChildren: () => import('../../selected/module/environment-selected.module').then(m => m.EnvironmentSelectedModule),
  data: { title: 'Environment' ,breadcrumb:'Monitoring'}
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentManagerRoutingModule { }
