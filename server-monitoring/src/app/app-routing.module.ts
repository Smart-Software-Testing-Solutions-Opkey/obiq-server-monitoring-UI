import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [

  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },{
    path: 'environment',
    loadChildren: () => import('./environment/environment.module').then(m => m.EnvironmentModule)
  },
  {
     path: '',
     pathMatch: 'full',
     component: LoadingComponent
  },
  // {
  //   path: '**', // route every undefined route to the root of this feature
  //   redirectTo: ''
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
