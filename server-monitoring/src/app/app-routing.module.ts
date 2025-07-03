import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [


  {
    path: 'environment',
    loadChildren: () => import('./environment/environment.module').then(m => m.EnvironmentModule),
    data: { title: 'Environment' ,breadcrumb:'Monitoring'}
  },
  {
     path: '',
     pathMatch: 'full',
     component: LoadingComponent
  },{
    path:'**',
    loadChildren: () => import('./environment/environment.module').then(m => m.EnvironmentModule),
    data: { title: 'Environment' ,breadcrumb:'Monitoring'}
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ bindToComponentInputs: true })],
  exports: [RouterModule],
  
})




export class AppRoutingModule { }
