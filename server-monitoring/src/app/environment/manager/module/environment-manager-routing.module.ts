import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentManagerComponent } from '../environment-manager.component';

const routes: Routes = [
  
   {
  path: '',
  component: EnvironmentManagerComponent,
  data: { title: 'Manager' ,breadcrumb:'Manager'}
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentManagerRoutingModule { }
