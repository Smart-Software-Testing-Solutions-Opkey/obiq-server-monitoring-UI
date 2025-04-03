import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

  {
    path: 'manager',
    loadChildren: () => import('./manager/module/environment-manager.module').then(m => m.EnvironmentManagerModule),
  },{
    path: 'configure',
    loadComponent: () => import('./configure/environment-configure.component').then(m => m.EnvironmentConfigureComponent),
    // loadChildren: () => import('./configure/module/environment-configure.module').then(m => m.EnvironmentConfigureModule),
    data: { title: 'Configure Environment' ,breadcrumb:'Configure'}
  },{
    path: 'managermodule',
    loadChildren: () => import('./manager/module/environment-manager.module').then(m => m.EnvironmentManagerModule),
   
  },{
    path: 'selected',
    loadChildren: () => import('./selected/module/environment-selected.module').then(m => m.EnvironmentSelectedModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentRoutingModule { }
