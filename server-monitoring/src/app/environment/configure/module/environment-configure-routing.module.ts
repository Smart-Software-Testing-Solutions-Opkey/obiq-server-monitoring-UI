import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentConfigureComponent } from '../environment-configure.component';

const routes: Routes = [ {
  path: '',
  pathMatch: 'full',
  component: EnvironmentConfigureComponent, 
  data: { title: 'Configure Environment' ,breadcrumb:'Configure'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentConfigureRoutingModule { }
