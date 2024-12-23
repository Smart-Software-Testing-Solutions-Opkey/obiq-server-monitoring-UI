import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType,
  PushDirections,
  Resizable
} from 'angular-gridster2';
import { AppService } from 'src/app/services/app.service';
import { AppDataService } from 'src/app/services/app-data.service';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
@Component({
  selector: 'app-environment-manager-main-right-overview-tab',
  templateUrl: './environment-manager-main-right-overview-tab.component.html',
  styleUrl: './environment-manager-main-right-overview-tab.component.scss'
})
export class EnvironmentManagerMainRightOverviewTabComponent implements OnInit,OnDestroy {

  options: Safe;
  dashboard: any;
  analyticsTypes={ 
  display_user_behaviour: false,
  display_test_automation: false,
  display_system_diagnostics: false,
  display_erp: false
  }
  constructor(
     public app_service: AppService,
     private service_data: AppDataService,
  ){
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margins:  [20, 20],
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      useBodyForBreakpoint: false,
      minCols: 1,
      maxCols: 6,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 6,
      minItemCols: 1,
      maxItemRows: 12,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: this.Editable,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: true,
        dragHandleClass: 'drag-handler',
        // stop: this.eventStop,
      },
      resizable: {
        enabled: this.Editable
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0 ,widId:'total_errors_Error'},
      { cols: 2, rows: 1, y: 0, x: 2 ,widId:'total_errors_Warning'},
      { cols: 2, rows: 1, y: 0, x: 4 ,widId:'total_errors_Success'},
      { cols: 1, rows: 1, y: 1, x: 0 ,widId:'TELEMETRY_REDIS_CPU_USAGE_WIDGET' },
      { cols: 1, rows: 1, y: 1, x: 1.6 ,widId:'TELEMETRY_REDIS_MEMORY_USAGE_WIDGET'},
      { cols: 1, rows: 1, y: 1, x: 3.3 ,widId:'TELEMETRY_VM_CPU_USAGE_WIDGET'},
      { cols: 1, rows: 1, y: 1, x: 5 ,widId:'TELEMETRY_VM_MEMORY_USAGE_WIDGET'},
      { cols: 3, rows: 2, y: 2, x: 0 ,widId:'USER_GUIDE_LIST_PER_PROCESS_WIDGET'},
      { cols: 3, rows: 2, y: 2, x: 2 ,widId:'USER_JOURNEY_TOP_FAST_WIDGET'},
      { cols: 3, rows: 2, y: 3, x: 0 ,widId:'USER_JOURNEY_TOP_SLOW_WIDGET'},
      { cols: 3, rows: 2, y: 3, x: 2 ,widId:'USER_JOURNEY_MOST_COMMON_WIDGET'},
      { cols: 6, rows: 2, y: 4, x: 0 ,widId:'Weekly_Log_Trends'},
     
      // { cols: 1, rows: 1, y: 0, x: 0 },
      // { cols: 1, rows: 1, y: 2, x: 5 },
      // { cols: 1, rows: 1, y: 1, x: 0 },
      // { cols: 1, rows: 1, y: 1, x: 0 },
      // {
      //   cols: 2,
      //   rows: 2,
      //   y: 3,
      //   x: 5,
      //   minItemRows: 2,
      //   minItemCols: 2,
      //   label: 'Min rows & cols = 2'
      // },
      // {
      //   cols: 2,
      //   rows: 2,
      //   y: 2,
      //   x: 0,
      //   maxItemRows: 2,
      //   maxItemCols: 2,
      //   label: 'Max rows & cols = 2'
      // },
      // {
      //   cols: 2,
      //   rows: 1,
      //   y: 2,
      //   x: 2,
      //   dragEnabled: true,
      //   resizeEnabled: true,
      //   label: 'Drag&Resize Enabled'
      // },
      // {
      //   cols: 1,
      //   rows: 1,
      //   y: 2,
      //   x: 4,
      //   dragEnabled: false,
      //   resizeEnabled: false,
      //   label: 'Drag&Resize Disabled'
      // },
      // { cols: 1, rows: 1, y: 2, x: 6 }
    ];
  }
  allSelectedAnalytics:any
  ngOnInit(): void {

    // this.selectedAnalytics=this.service_data.selectedArtifactData.selectedAnalyticsType
    // console.log("selected=============",JSON.stringify(this.selectedAnalytics))
    // this.selectedAnalytics.forEach(item=>{
    //   if(item['name']=='User Behavior Analytics') this.analyticsTypes.display_user_behaviour=true
    //   else if(item['name']=='Test Automation Analytics')this.analyticsTypes.display_test_automation=true
    //   else if(item['name']=='System Diagnostics Analytics')this.analyticsTypes.display_system_diagnostics=true
    //   else if(item['name']=='ERP Analytics')this.analyticsTypes.display_erp=true
    // })
  }
  ngOnDestroy(): void {
    
  }
  view:any
  reset_analytics(){
    
     this.analyticsTypes.display_user_behaviour= false
     this.analyticsTypes.display_test_automation= false
     this.analyticsTypes.display_system_diagnostics= false
     this.analyticsTypes.display_erp= false
      
  }
  @Input ('child_data') set child_data({ view, allSelectedAnalytics }) {
   this.view=view
   this.allSelectedAnalytics=allSelectedAnalytics
   this.reset_analytics()
   this.allSelectedAnalytics?.forEach(item=>{
    if(item['name']=='User Behavior Analytics')  this.analyticsTypes.display_user_behaviour=true
    else if(item['name']=='Test Automation Analytics')this.analyticsTypes.display_test_automation=true
    else if(item['name']=='System Diagnostics Analytics')this.analyticsTypes.display_system_diagnostics=true
    else if(item['name']=='ERP Analytics')this.analyticsTypes.display_erp=true
  })
  }

  applicationTotalData:any = [{
    applicationName : 'Oracle Fusion',
    cpu:'02.68',
    ram:'08.89',
    health:'good',
  },
  {
    applicationName : 'Sap',
    cpu:'09.68',
    ram:'80.89',
    health:'good',
  }
];
 
 progressBarArray: Array<{heading: string, widgetType: string}> = [
  {heading: "User Guides Per Process", widgetType: "USER_GUIDE_LIST_PER_PROCESS_WIDGET"},
  {heading: "Top 5 Fastest Journeys", widgetType: "USER_JOURNEY_TOP_FAST_WIDGET"},
  {heading: "5 Slowest Journeys", widgetType: "USER_JOURNEY_TOP_SLOW_WIDGET"},
  {heading: "5 Most Common Journeys", widgetType: "USER_JOURNEY_MOST_COMMON_WIDGET"},
 ]

 changedOptions(): void {
  if (this.options.api && this.options.api.optionsChanged) {
    this.options.api.optionsChanged();
  }
}

removeItem($event: MouseEvent | TouchEvent, item): void {
  $event.preventDefault();
  $event.stopPropagation();
  this.dashboard.splice(this.dashboard.indexOf(item), 1);
}

addItem(): void {
  this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
}
Editable = false

@Input('Editable') set setEditable(edit) {
this.Editable = edit
if(this.options && this.options.api){

  this.options.draggable.enabled = this.Editable
  this.options.resizable.enabled = this.Editable  
  this.options.api.optionsChanged();
}


}
  // set_Selected_View_DataSource(selectedVIew) {
  //   let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceListByViewId";

  //   let form_data = { viewId: selectedVIew.viewId };

  //   this.app_service.make_post_server_call(form_url, form_data)
  //     .subscribe({
  //       next: (result: any) => {
         

  //         result.forEach((item, index) => {
  //           item.display = index === 0
  //         })
          
          
  //         result.forEach(item=>{
  //           if(item['name']=='User Behavior Analytics') this.analyticsTypes.display_user_behaviour=true
  //           else if(item['name']=='Test Automation Analytics')this.analyticsTypes.display_test_automation=true
  //           else if(item['name']=='System Diagnostics Analytics')this.analyticsTypes.display_system_diagnostics=true
  //           else if(item['name']=='ERP Analytics')this.analyticsTypes.display_erp=true
  //         })
         

  //       },
  //       error: (error: any) => {
  //         window.loadingStop("#navigator-left");
  //         console.warn(error);
  //       },
  //       complete: () => {
  //         console.log("Completed");
  //       }
  //     });
  // }

}
