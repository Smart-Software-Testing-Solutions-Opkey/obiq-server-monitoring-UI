import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
@Component({
  selector: 'app-e-m-mr-ds-ub-overview-tab',
  templateUrl: './e-m-mr-ds-ub-overview-tab.component.html',
  styleUrl: './e-m-mr-ds-ub-overview-tab.component.scss'
})
export class EMMrDsUbOverviewTabComponent {
  options: Safe;
  dashboard: any;
  constructor(){
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margins:  [15, 15],
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
      maxRows: 20,
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
      { cols: 3, rows: 2, y: 0, x: 0 ,widId:'total_errors_Error'},
      { cols: 3, rows: 2, y: 0, x: 2 ,widId:'USER_JOURNEY_TOP_SLOW_WIDGET'},
      { cols: 3, rows: 2, y: 1, x: 0 ,widId:'USER_JOURNEY_TOP_FAST_WIDGET'},
      { cols: 3, rows: 2, y: 1, x: 2 ,widId:'USER_JOURNEY_MOST_COMMON_WIDGET'},
      //<!-- hidded weekly log -->
      //{ cols: 6, rows: 2, y: 2, x: 0 ,widId:'Weekly_Log_Trends'},
      { cols: 3, rows: 2, y: 2, x: 0 ,widId:'TOP_API_ERRORS_WIDGET'},
      { cols: 3, rows: 2, y: 2, x: 2 ,widId:'TOP_CONSOLE_ERRORS_WIDGET'},
      { cols: 3, rows: 2, y: 2, x: 0 ,widId:'TOP_FUNCTIONAL_ERRORS_WIDGET'}
    ];
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }
  @Input() view:any
  obj_filter : any;
  selectedAnalyticsType : any ="";
  @Input ('child_data') set child_data({ obj_filter,selectedAnalyticsType }) {
    this.obj_filter= obj_filter
    if(selectedAnalyticsType){
      this.selectedAnalyticsType = selectedAnalyticsType;
    }
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
}
