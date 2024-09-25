import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [


  {
    path: 'environment',
    loadChildren: () => import('./environment/environment.module').then(m => m.EnvironmentModule),
    data: { title: 'Environment' ,breadcrumb:'Environment'}
  },
  {
     path: '',
     pathMatch: 'full',
     component: LoadingComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
