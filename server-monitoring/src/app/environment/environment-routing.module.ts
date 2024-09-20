import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./manager/module/environment-manager.module').then(m => m.EnvironmentManagerModule),
    data: { title: 'Manager' ,breadcrumb:'Manager'}
  },{
    path: 'configure',
    loadChildren: () => import('./configure/module/environment-configure.module').then(m => m.EnvironmentConfigureModule),
    data: { title: 'Configure Environment' ,breadcrumb:'Configure'}
  },{
    path: 'manager',
    loadChildren: () => import('./manager/module/environment-manager.module').then(m => m.EnvironmentManagerModule),
    data: { title: 'Manager' ,breadcrumb:'Manager'}
  },{
    path: ':id',
    loadChildren: () => import('./selected/module/environment-selected.module').then(m => m.EnvironmentSelectedModule),
    data: { title: 'Environment' ,breadcrumb:'Environment'}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentRoutingModule { }
