import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { EMMrDsErpLogTabComponent } from '../main-right/datasources/erp/e-m-mr-ds-erp-log-tab/e-m-mr-ds-erp-log-tab.component';
import { ViewSummaryDetailsComponent } from '../main-right/view-summary-details/view-summary-details.component';
import { EnvironmentManagerMainRightComponent } from '../main-right/environment-manager-main-right.component';
import { EMMrDsErpAllJourneyComponent } from '../main-right/datasources/erp/all-journey/e-m-mr-ds-erp-all-journey.component';
import { EMMrDsUbAllJourneyComponent } from '../main-right/datasources/user-behaviour/all-journey/e-m-mr-ds-ub-all-journey.component';
import { EMMrDsUbAllApiErrorComponent } from '../main-right/datasources/user-behaviour/e-m-mr-ds-ub-all-api-error/e-m-mr-ds-ub-all-api-error.component';
import { EMMrDsUbAllConsoleErrorComponent } from '../main-right/datasources/user-behaviour/e-m-mr-ds-ub-all-console-error/e-m-mr-ds-ub-all-console-error.component';
import { EMMrDsUbAllFunctionalErrorComponent } from '../main-right/datasources/user-behaviour/e-m-mr-ds-ub-all-functional-error/e-m-mr-ds-ub-all-functional-error.component';
import { EMMrDsErpAllFunctionalErrorComponent } from '../main-right/datasources/erp/e-m-mr-ds-erp-all-functional-error/e-m-mr-ds-erp-all-functional-error.component';
import { ConfigureModalContainerComponent } from '../../configure/configure-modal-container/configure-modal-container.component';


const routes: Routes = [
  
   {
  path: '',
  component: EnvironmentManagerComponent,
  data: { title: 'Environment Manager' ,breadcrumb:'Manager'},
  children:[{
    path:'summary/:viewId',
    component:EnvironmentManagerMainRightComponent,
    // outlet:'rightSection'
  },
  {
    path:'settings/:viewId',
    component:ViewSummaryDetailsComponent,
    // outlet:'rightSection'
  },
  {
    path:'erpjourney',
    loadComponent: () => import('../main-right/datasources/erp/all-journey/e-m-mr-ds-erp-all-journey.component').then(m => m.EMMrDsErpAllJourneyComponent),
    // outlet:'rightSection'
  },
  {
    path :'ubjourney',
    loadComponent: () => import('../main-right/datasources/user-behaviour/all-journey/e-m-mr-ds-ub-all-journey.component').then(m => m.EMMrDsUbAllJourneyComponent),
    // outlet :'rightSection'
  },
  {
    path: 'ubApiError',
    loadComponent: () => import('../main-right/datasources/user-behaviour/e-m-mr-ds-ub-all-api-error/e-m-mr-ds-ub-all-api-error.component').then(m => m.EMMrDsUbAllApiErrorComponent),
    // outlet: 'rightSection'
  },
  {
    path: 'ubConsoleError',
    loadComponent: () => import('../main-right/datasources/user-behaviour/e-m-mr-ds-ub-all-console-error/e-m-mr-ds-ub-all-console-error.component').then(m => m.EMMrDsUbAllConsoleErrorComponent),
    // outlet: 'rightSection'
  },
  {
    path: 'ubFunctionalError',
    loadComponent: () => import('../main-right/datasources/user-behaviour/e-m-mr-ds-ub-all-functional-error/e-m-mr-ds-ub-all-functional-error.component').then(m => m.EMMrDsUbAllFunctionalErrorComponent),
    // outlet: 'rightSection'
  },
  {
    path:'erpFunctionalError',
    loadComponent: () => import('../main-right/datasources/erp/e-m-mr-ds-erp-all-functional-error/e-m-mr-ds-erp-all-functional-error.component').then(m => m.EMMrDsErpAllFunctionalErrorComponent),
    //  outlet: 'rightSection'
  }
]
},
{
  path: 'modal',
  // component : ConfigureModalContainerComponent,
  loadChildren: () => import('../../configure/module/environment-configure.module').then(m => m.EnvironmentConfigureModule),
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentManagerRoutingModule { }
