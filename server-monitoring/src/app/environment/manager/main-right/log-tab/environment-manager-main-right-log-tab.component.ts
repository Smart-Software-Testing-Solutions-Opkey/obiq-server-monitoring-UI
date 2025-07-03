import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRightPanelComponent } from '../../right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { DatePipe } from '@angular/common';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexFill, ApexLegend,
  ChartComponent,
  ApexPlotOptions,
  ApexResponsive,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { MsgboxService } from 'src/app/services/msgbox.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
  labels: any;
};

@Component({
  selector: 'app-environment-manager-main-right-log-tab',
  templateUrl: './environment-manager-main-right-log-tab.component.html',
  styleUrl: './environment-manager-main-right-log-tab.component.scss'
})
export class EnvironmentManagerMainRightLogTabComponent implements OnInit, OnDestroy {


  constructor(
    private modalService: NgbModal,
    public service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    private datePipe: DatePipe,
    private msgbox: MsgboxService, 
    private cdr : ChangeDetectorRef,
    private elRef: ElementRef
  ) { }
  @Input() analyticsType: any;
  @Input() view: any;

  
  @Input('dataTimeData') set dataTimeData({obj_filter}){
      

    let gridContent = this.elRef.nativeElement.getElementsByClassName('k-grid-content')[0];
    if (gridContent) {
      gridContent.scrollTop = 0;
    }
      this.selectedTime=obj_filter
      this.getLogsChart(this.selectedTime);
      this.offset = 0;
      this.logDataSource= []
      this.getViewLogs(this.selectedTime);
  }
  startTime: Date | null = null;
  endTime: Date | null = null;
  public chartOptions: Partial<ChartOptions>;
  chartData: any;
  selectedKeys = []
  logDataSource = []
  limit: number = 20;
  offset: number = 0;
  allDataLoaded: boolean = false;
  subscriptions: Subscription[] = [];
  // logTypes: string[] = ['All', 'Success', 'Error', 'Warning'];
  selectedLogType: string = 'Error';  // Default selection
  selectedTime:any;
  logToSearch : any = "";
  logHeight : string =''

  ngOnInit(): void {
   
    if(this.analyticsType.type == 'ERP_ANALYTICS_DATASOURCE'){
      this.logHeight = 'calc(100vh - 9rem)' 
    }
    else{
      this.logHeight = 'calc(100vh - 25rem)'
    }
    
    // this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {

    //   if( data != null){
    //     if(data?.type == "getDataWithTime"){
    //       this.selectedTime = data?.timeFilter
    //       this.getLogsChart(data?.timeFilter);
    //       this.getViewLogs(data?.timeFilter);
    //     }
    //     else{
         
    //     }
       
    //   }
      
    // }))

  
    
    
    this.startDataReceiving();
  }

  

  ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
 
  subscriptions1: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions1.forEach((subscription) => subscription.unsubscribe());
  }

  startDataReceiving(){
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      
      if (data !== null) {
      
        if (data.callsource == 'LOG_TAB'){
          this.logToSearch = '';
          this.offset = 0;
          this.allDataLoaded= false;

          if( data.action == 'refresh'){
            this.getViewLogs()
          }
          else if(data.action == 'search'){
            this.logToSearch = data.data;
            this.offset = 0;
            this.allDataLoaded = false;
            this.getViewLogs(this.selectedTime)
          }
          // else if ( data.action == 'filterChange'){
          //   this.appType = data.objFilter.modelApplication.toUpperCase()
          //   this.getViewLogs()

          // }

        }
      }  
    });
    this.subscriptions1.push(data_receiver);
  }
 
  dateTimeFormat(val){
    
      if(val && this.chartData.groupedBy == 'Hour'){
        const [hours, minutes] = val.split(":");
        return `${hours}:${minutes}`;
      }
      else if(val && this.chartData.groupedBy =="Days"){
        // let date= new Date(val)
        // return this.datePipe.transform(date, 'd MMM'); 
        return val;

      }
      return val;
    
  }
  // getMaxTimestamp(timeduration,maxTimestamp){
  //   let currentDateObj = new Date();
  //   var minTimestamp;
  
  //   if(timeduration == 'LAST_30_MINUTES')
  //     minTimestamp  = maxTimestamp - (30*60*1000);
  //   else if(timeduration == 'LAST_60_MINUTES')
  //     minTimestamp  = maxTimestamp - (60*60*1000);
  //   else if(timeduration == 'LAST_3_HOUR')
  //     minTimestamp  = maxTimestamp - (3*60*60*1000);
  //   else if(timeduration == 'LAST_6_HOUR')
  //     minTimestamp  = maxTimestamp - (6*60*60*1000);
  //   else if(timeduration == 'LAST_12_HOUR')
  //     minTimestamp  = maxTimestamp - (12*60*60*1000);
  //   else if(timeduration == 'LAST_24_HOUR')
  //     minTimestamp  = maxTimestamp - (24*60*60*1000);
  //   else if(timeduration == 'LAST_3_DAYS')
  //     minTimestamp  = maxTimestamp - (3*24*60*60*1000);
  //   else if(timeduration == 'LAST_7_DAYS')
  //     minTimestamp  = maxTimestamp - (7*24*60*60*1000)
  //   else if(timeduration == 'LAST_1_MONTH')
  //     minTimestamp= new Date(currentDateObj.setMonth(currentDateObj.getMonth()-1)).getTime()
  //   else if(timeduration == 'LAST_3_MONTH')
  //     minTimestamp= new Date(currentDateObj.setMonth(currentDateObj.getMonth()-3)).getTime()

  //   return minTimestamp;
  // }
  createChart(timeduration?: any): void {
      
      const isHourly = this.chartData.groupedBy === 'Hour';
      const isTimely = this.chartData.groupedBy;

      
      let chartObj =this.getSeriesData(this.chartData.essServerLogUsageDtoList, this.selectedLogType, this.chartData.groupedBy);
      
      this.chartOptions = {
          series: chartObj.arraySeries,
          colors :['#ff4c33'],
          chart: {
              type: 'bar',
              height: 200,
              stacked: true,
              toolbar: {
                  show: true,
                  tools: {
                      download: true,
                      selection: true,
                      zoom: true,
                      zoomin: true,
                      
                  },
                  offsetX: 0,
                  offsetY: 0
              },
              zoom: {
                  enabled: true,
              },
              events: {
                  selection: (chartContext, { xaxis }) => {
                      const startTime = xaxis?.min;
                      const endTime = xaxis?.max;
                      if (startTime && endTime) {
                          this.startTime = new Date(startTime);
                          this.endTime = new Date(endTime);
                      }
                  },
                  zoomed: (chartContext, { xaxis }) => {
                      this.startTime = xaxis?.min ? new Date(xaxis.min) : null;
                      this.endTime = xaxis?.max ? new Date(xaxis.max) : null;
                      this.displayTimeRange();
                  },
              }
          },
          responsive: [
              {
                  breakpoint: 480,
                  options: {
                      legend: {
                          position: "bottom",
                          offsetX: -10,
                          offsetY: 0
                      }
                  }
              }
          ],
          plotOptions: {
              bar: {
                  horizontal: false,
              }
          },
   
          // labels: chartObj.arrayCategory,
          xaxis: {
            categories: chartObj.arrayCategory,
            labels: {
              formatter: (val) => this.dateTimeFormat(val)
            },
            tickAmount: chartObj.arrayCategory.length, 
            tickPlacement : 'on',
          },
          fill: {
              opacity: 1,
          },
          legend: {
              show: false,
              position: 'right',
              offsetX: 0,
              offsetY: 50,
          },
          dataLabels: {
              enabled: false,
          },
          tooltip: {
              enabled: true,
              shared: false,
              intersect: true,
              x: {
                formatter: (val,{ series, seriesIndex, dataPointIndex, w }) => {       
                return  w.globals.categoryLabels[dataPointIndex]
                }
              }
          },
          yaxis: {
              labels: {
                  formatter: function (value) {
                      return value.toFixed(0);
                  }
              },
          }
      };
  
    }
  
  // getXaxisdivision(timeduration? :any){
  //   let tickAmount;
  //   if(timeduration == 'LAST_30_MINUTES')
  //     tickAmount = 30
  //   else if(timeduration == 'LAST_60_MINUTES')
  //     tickAmount = 60
  //   else if(timeduration == 'LAST_3_HOUR')
  //     tickAmount = 3
  //   else if(timeduration == 'LAST_6_HOUR')
  //     tickAmount = 6
  //   else if(timeduration == 'LAST_12_HOUR')
  //     tickAmount = 12
  //   else if(timeduration == 'LAST_24_HOUR')
  //     tickAmount = 24
  //   else if(timeduration == 'LAST_3_DAYS')
  //     tickAmount = 3
  //   else if(timeduration == 'LAST_7_DAYS')
  //     tickAmount = 7
  //   else if(timeduration == 'LAST_1_MONTH')
  //     tickAmount = 30
  //   else if(timeduration == 'LAST_3_MONTH')
  //     tickAmount = 90
  //   else
  //     tickAmount = undefined
  //    return tickAmount;
  // }

  // getXaxisFormat(isTimely){
  //   let format ='' 
  //   if(isTimely == 'Minute'){
  //     format = 'mm:ss'
  //   }
  //   else if(isTimely == 'Hour'){
  //     format = 'HH:mm:ss'
  //   }
  //   else if(isTimely == 'Days'){
  //     format = 'dd MMM'
  //   }
  //   else if(isTimely == 'Month'){
  //     format = "MMM 'yy"
  //   }
  //   else{
  //     format = 'dd MMM'
  //   }
  //   return format;
  // }

  getSeriesDataTime(dataList: any[], selectedLogType: string): ApexAxisChartSeries {

    const dataPoints = selectedLogType === 'All' ? ['Success', 'Error', 'Warning'] : [selectedLogType];
    // const isHourly = this.chartData.groupedBy === 'Hour';
    const isTimely = this.chartData.groupedBy;

    return dataPoints.map(point => {
      let color;
      switch (point) {
          case 'Success':
              color = '#268144';
              break;
          case 'Error':
              color = '#ff4c33';
              break;
          case 'Warning':
              color = '#ff6833';
              break;
          // case 'Blocked':
              // color = '#ff3333';
              // break;
      }

      return {
        name: point,
        data: dataList.map(item => {
            const pointData = item.dataPointList.find(d => d.name === point);
            return {  

              x: item.fromTimeInStr, 
              y: pointData ? pointData.value : 0

            };
        }).filter(dataPoint => dataPoint[0] !== null),
        color: color,
    };
  });
    
  }
  getSeriesDataCategory(dataList: any[], selectedLogType: string): ApexAxisChartSeries {

    const dataPoints = selectedLogType === 'All' ? ['Success', 'Error', 'Warning'] : [selectedLogType];
    // const isHourly = this.chartData.groupedBy === 'Hour';
    const isTimely = this.chartData.groupedBy;

    return dataPoints.map(point => {
      let color;
      switch (point) {
          case 'Success':
              color = '#268144';
              break;
          case 'Error':
              color = '#ff4c33';
              break;
          case 'Warning':
              color = '#ff6833';
              break;
          // case 'Blocked':
              // color = '#ff3333';
              // break;
      }

      return {
        name: point,
        data: dataList.map(item => {
            const pointData = item.dataPointList.find(d => d.name === point);
            return {  

              x: item.displayText, 
              y: pointData ? pointData.value : 0

            };
        }).filter(dataPoint => dataPoint[0] !== null),
        color: color,
    };
  });
    
  }
  getSeriesData(dataList: any[], selectedLogType: string, groupedBy: string) : any{
      
    const array_category = [];
    const obj_series = {};
    const array_series = [];
    
    dataList.forEach(item => {

      let myTime ;
      if(item.fromTimeInMillis != 0){
        let itemDate = new Date(item.fromTimeInMillis);
        if(groupedBy == "Days"){
          myTime = itemDate.toLocaleString().split(",")[0];
        }
        else{
          // myTime = String(itemDate.getHours()) + ":" + String(itemDate.getMinutes());
          myTime = itemDate.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: true })
        }
       
      }
      
      
      let val =  myTime || item.displayText
      array_category.push(val)
    
      item.dataPointList.forEach(series => {
          let array_s = obj_series[series.name]?.data || [];
          array_s.push(series.value);
          obj_series[series.name] = { name: series.name, data: array_s };
      });
    });
    
    
    // Object.keys(obj_series).forEach(key => {
    //   const value = obj_series[key];
    //   array_series.push(value);
    // });

    

    return {'arrayCategory':array_category , 'arraySeries': [obj_series["Error"]]};
    
  }
  
  updateChart() {
      this.createChart();
  }
  

  displayTimeRange(): void {
    const formattedStartTime = this.datePipe.transform(this.startTime, 'MMM d, hh:mm a', '+0530');
    const formattedEndTime = this.datePipe.transform(this.endTime, 'MMM d, hh:mm a', '+0530');

    const timeRange = `${formattedStartTime} to ${formattedEndTime}`;
    console.log(timeRange);
    this.app_service.dataTransmitter({callsource:'timeExplorerChart',data:timeRange});
  }



  getLogsChart(timeFilter?: any) {
    this.allDataLoaded = false;
    window.loadingStart("#Env_manager_main_right", "Please wait");
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    const form_data = {
      "timeSpanEnum": "LAST_24_HOUR",
      "viewId": this.view.viewId,
      "projectId":this.service_data.UserDto.ProjectDTO.P_ID,
      "limitBy": 0,
      "offset": 0,
      "widgetType": "ESS_LOG_TIMEGRAPH_WIDGET"
    };
    if(this.selectedTime?.type == 'setEnum'){
      form_data.timeSpanEnum = timeFilter?.value;
     } else if(this.selectedTime?.type == "setCustom"){
       delete form_data?.timeSpanEnum;
       form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
       form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
     }
    //  else{
    //    this.selectedTime={"type":"setEnum","value":"LAST_24_HOUR"}
    //     form_data.timeSpanEnum = timeFilter?.value;
    //  }
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
      
        
          window.loadingStop("#Env_manager_main_right");
           
          this.chartData = result
          if(this.selectedTime?.type == 'setEnum'){
            this.createChart(timeFilter?.value);
          }
          else{
            this.createChart();
          }
          
        },
        error: (error: any) => {
          window.loadingStop("#Env_manager_main_right");
          console.warn(error);
          this.msgbox.display_error_message(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }
  templogDataSource : any = [];
  appType : string = 'ORACLEFUSION'
  getViewLogs(timeFilter?: any, appendData: boolean = false ) {
   
    if (this.allDataLoaded) return;
    window.loadingStart("#Env_manager_main_right", "Please wait");

    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    const form_data =  { "timeSpanEnum": "LAST_24_HOUR", 
      "viewId": this.view.viewId, 
      "projectId": this.service_data.UserDto.ProjectDTO.P_ID,
       "logToSearch": this.logToSearch, 
       "limitBy": this.limit, 
       "offset": this.offset, 
       "widgetType": "ESS_LOG_DATA_WIDGET","appType":this.appType };
    if(this.selectedTime?.type == 'setEnum'){
     form_data.timeSpanEnum = timeFilter?.value;
    } else if(this.selectedTime?.type == "setCustom"){
      delete form_data?.timeSpanEnum;
      form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
      form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
    }
    // else{
    //   this.selectedTime={"type":"setEnum","value":"LAST_24_HOUR"}
    //    form_data.timeSpanEnum = timeFilter?.value;
    // }
   
    this.app_service.make_post_server_call(ajax_url, form_data)
    .subscribe({
      next: (result: any) => {
          window.loadingStop("#Env_manager_main_right");

          result.essLogsList = result.essLogsList.map((log) => {

            const date = new Date(log.timestamp);
            return {
              ...log,
              timeString: date.toLocaleString()
            };
          });
          if (result.essLogsList.length < this.limit) {
              this.allDataLoaded = true;
          } 

          if (appendData) {
              this.logDataSource = [...this.logDataSource, ...result.essLogsList];
          } else {
              this.logDataSource = result.essLogsList;
          }
        
      },
        error: (error: any) => {
          window.loadingStop("#Env_manager_main_right");
          console.warn(error);
          this.msgbox.display_error_message(error);
        },
        complete: () => {
          console.log("Completed");
          return;
        }
      });
    }
  onScroll() {
     this.offset += this.limit;
    this.getViewLogs(this.selectedTime, true ); // Load more data and append it
}


get isSelectedAnalyticsTypeEmpty(): boolean {
  return Object.keys(this.analyticsType).length === 0;
}
  onSelectionChange(e) {
   console.log(this.analyticsType,"this is analytics type");
   console.log(this.view,"this is the view")
   if(this.isSelectedAnalyticsTypeEmpty){
    let dataItem = e.dataItem
    const modalRef = this.modalService.open(ManagerRightPanelComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'full',
      centered: true,
      windowClass: 'layout-modal-right panel-end w-50'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
    });
    modalRef.componentInstance.selectedItem = { callsource: 'environmentManagerLogDetails', data: dataItem };
  }
  else{
    let dataItem = e.dataItem
    const modalRef = this.modalService.open(ManagerRightPanelComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'full',
      centered: true,
      windowClass: 'layout-modal-right panel-end'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
    });
    modalRef.componentInstance.selectedItem = { callsource: 'ErpDataSourceLogDetails', data: dataItem };
  }
   }
  
   


}
