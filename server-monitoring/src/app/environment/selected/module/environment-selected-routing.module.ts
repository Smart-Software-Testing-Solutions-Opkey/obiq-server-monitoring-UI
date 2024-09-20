import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentSelectedComponent } from '../environment-selected.component';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentSelectedComponent,
    data: { title: 'Selected Environment' ,breadcrumb:'Selected'}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentSelectedRoutingModule { }
