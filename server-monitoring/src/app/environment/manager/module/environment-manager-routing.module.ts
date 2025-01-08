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

const routes: Routes = [
  
   {
  path: '',
  component: EnvironmentManagerComponent,
  data: { title: 'Environment Manager' ,breadcrumb:'Manager'},
  children:[{
    path:'summary',
    component:EnvironmentManagerMainRightComponent,
    outlet:'rightSection'
  },
  {
    path:'settings',
    component:ViewSummaryDetailsComponent,
    outlet:'rightSection'
  },
  {
    path:'erpjourney',
    component:EMMrDsErpAllJourneyComponent,
    outlet:'rightSection'
  },
  {
    path :'ubjourney',
    component: EMMrDsUbAllJourneyComponent,
    outlet :'rightSection'
  },
  {
    path: 'ubApiError',
    component:  EMMrDsUbAllApiErrorComponent,
    outlet: 'rightSection'
  },
  {
    path: 'ubConsoleError',
    component:  EMMrDsUbAllConsoleErrorComponent,
    outlet: 'rightSection'
  },
  {
    path: 'ubFunctionalError',
    component:  EMMrDsUbAllFunctionalErrorComponent,
    outlet: 'rightSection'
  }
]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentManagerRoutingModule { }
