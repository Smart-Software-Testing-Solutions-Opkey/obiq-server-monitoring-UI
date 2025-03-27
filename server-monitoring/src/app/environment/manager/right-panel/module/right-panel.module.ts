import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentManagerMainRightLogTabDetailsComponent } from '../../main-right/log-tab/log-tab-details/environment-manager-main-right-log-tab-details.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectedTraceInnerComponent } from '../../main-right/log-tab/log-tab-details/selected-trace/selected-trace-inner/selected-trace-inner.component';
import { JourneyGridComponent } from '../../main-right/log-tab/log-tab-details/journey-grid/journey-grid.component';
import { SelectedJourneyComponent } from '../../main-right/log-tab/log-tab-details/selected-journey/selected-journey.component';
import { SelectedJourneyInnerComponent } from '../../main-right/log-tab/log-tab-details/selected-journey/selected-journey-inner/selected-journey-inner.component';
import { ManagerMainRightLogTabDetailsInfoComponent } from '../../main-right/log-tab/log-tab-details/info/manager-main-right-log-tab-details-info.component';



@NgModule({
  declarations: [
    EnvironmentManagerMainRightLogTabDetailsComponent,
    SelectedTraceInnerComponent,
    JourneyGridComponent,
    SelectedJourneyComponent,
    SelectedJourneyInnerComponent, 
    ManagerMainRightLogTabDetailsInfoComponent 

  ],
  imports: [
    CommonModule,
    GridModule,
    NgbTooltipModule,
  ],
  exports :[
    EnvironmentManagerMainRightLogTabDetailsComponent,
    SelectedTraceInnerComponent,
    JourneyGridComponent,
    SelectedJourneyComponent,
    SelectedJourneyInnerComponent, 
    ManagerMainRightLogTabDetailsInfoComponent 
  ]
})
export class RightPanelModule {
  
 }
