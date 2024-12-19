import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentManagerComponent } from '../environment-manager.component';
import { EMMrDsErpLogTabComponent } from '../main-right/datasources/erp/e-m-mr-ds-erp-log-tab/e-m-mr-ds-erp-log-tab.component';
import { ViewSummaryDetailsComponent } from '../main-right/view-summary-details/view-summary-details.component';
import { EnvironmentManagerMainRightComponent } from '../main-right/environment-manager-main-right.component';
import { EMMrDsErpAllJourneyComponent } from '../main-right/datasources/erp/all-journey/e-m-mr-ds-erp-all-journey.component';

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
  }
]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentManagerRoutingModule { }
