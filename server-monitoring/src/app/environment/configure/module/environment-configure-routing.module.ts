import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentConfigureComponent } from '../environment-configure.component';
import { ConfigureModalContainerComponent } from '../configure-modal-container/configure-modal-container.component';

const routes: Routes = [ {
  path: '',
  pathMatch: 'full',
  component: ConfigureModalContainerComponent, 
  //data: { title: 'Configure Environment' ,breadcrumb:'Configure'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentConfigureRoutingModule { }
