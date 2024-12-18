import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
    private datePipe: DatePipe
  ) { }
  @Input() analyticsType: any;
  @Input() view: any;
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
  logTypes: string[] = ['All', 'Success', 'Error', 'Warning', 'Blocked'];
  selectedLogType: string = 'All';  // Default selection
  selectedTime:any;
  ngOnInit(): void {
    console.log(this.analyticsType,"this is selected analytics type")
    this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
      if(data?.type == "getDataWithTime"){
        this.selectedTime = data?.timeFilter
        this.getLogsChart();
        this.getViewLogs();
      }
    }))
    this.getLogsChart()
    this.getViewLogs()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  createChart(): void {
      
      const isHourly = this.chartData.groupedBy === 'Hour';
      const seriesData = this.getSeriesData(this.chartData.essServerLogUsageDtoList, this.selectedLogType);
  
      const timestamps = seriesData.flatMap(series => series.data.map(point => point[0]));
      const minTimestamp = Math.min(...timestamps);
      const maxTimestamp = Math.max(...timestamps);
  
      this.chartOptions = {
          series: seriesData,
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
          xaxis: {
              type: 'datetime',
              min: minTimestamp,
              max: maxTimestamp,
              tickAmount: isHourly ? 24 : undefined,
              labels: {
                  format: isHourly ? 'HH:mm' : 'dd MMM',
                  show: true,
                  rotate: 0,
              },
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
                  formatter: (value) => {
                      const date = new Date(value);
                      return isHourly ? date.toISOString().substr(11, 5) : date.toLocaleDateString();
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
  
  getSeriesData(dataList: any[], selectedLogType: string): ApexAxisChartSeries {
      
      const dataPoints = selectedLogType === 'All' ? ['Success', 'Error', 'Warning', 'Blocked'] : [selectedLogType];
      const isHourly = this.chartData.groupedBy === 'Hour';
  
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
              case 'Blocked':
                  color = '#ff3333';
                  break;
          }
  
          return {
            name: point,
            data: dataList.map(item => {
                if (!item.fromTimeInStr) {
               
                    return [null, 0];
                }

                let timestamp;
                if (isHourly) {
                    const [hours, minutes, seconds] = item.fromTimeInStr.split(':').map(Number);
                    timestamp = Date.UTC(1970, 0, 1, hours, minutes, seconds);
                } else {
                    const [year, month, day] = item.fromTimeInStr.split('-').map(Number);
                    timestamp = Date.UTC(year, month - 1, day);
                }

                const pointData = item.dataPointList.find(d => d.name === point);
                return [
                    timestamp,
                    pointData ? pointData.value : 0
                ];
            }).filter(dataPoint => dataPoint[0] !== null),
            color: color,
        };
      });
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



  getLogsChart() {
    debugger;
    this.allDataLoaded = false;
    window.loadingStart("#Env_manager_main_right", "Please wait");
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    const form_data = {
      "timeSpanEnum": "LAST_24_HOUR",
      "viewId": this.view.viewId,
      "projectId": this.service_data.UserDto.ProjectDTO.P_ID,
      "limitBy": 0,
      "offset": 0,
      "widgetType": "ESS_LOG_TIMEGRAPH_WIDGET"
    };
    if(this.selectedTime?.type == 'setEnum'){
      form_data.timeSpanEnum = this.selectedTime?.value;
    } else if(this.selectedTime?.type == "setCustom"){
      delete form_data?.timeSpanEnum;
      form_data["fromTimeInMillis"] = this.selectedTime?.fromTimeInMillis;
      form_data["toTimeInMillis"] = this.selectedTime?.toTimeInMillis;
    }
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
          window.loadingStop("#Env_manager_main_right");
       
          this.chartData = result
          this.createChart();
        },
        error: (error: any) => {
          window.loadingStop("#Env_manager_main_right");
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }
  getViewLogs(timeFilter?: any, appendData: boolean = false) {
   
    if (this.allDataLoaded) return;
    window.loadingStart("#Env_manager_main_right", "Please wait");

    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    const form_data =  { "timeSpanEnum": "LAST_7_DAYS", "viewId": this.view.viewId, "projectId": this.service_data.UserDto.ProjectDTO.P_ID, "logToSearch": "", "limitBy": this.limit, "offset": this.offset, "widgetType": "ESS_LOG_DATA_WIDGET" };
    if(this.selectedTime?.type == 'setEnum'){
     form_data.timeSpanEnum = timeFilter?.value;
    } else if(this.selectedTime?.type == "setCustom"){
      delete form_data?.timeSpanEnum;
      form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
      form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
    }
    this.app_service.make_post_server_call(ajax_url, form_data)
    .subscribe({
      next: (result: any) => {
          window.loadingStop("#Env_manager_main_right");

          if (result.essLogsList.length < this.limit) {
              this.allDataLoaded = true;
          }

          if (appendData) {
              this.logDataSource = [...this.logDataSource, ...result.essLogsList];
          } else {
              this.logDataSource = result.essLogsList;
          }
          this.offset += this.limit;
      },
        error: (error: any) => {
          window.loadingStop("#Env_manager_main_right");
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }
  onScroll() {
    this.getViewLogs(null, true); // Load more data and append it
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
      windowClass: 'layout-modal-right panel-end w-75'
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
      windowClass: 'layout-modal-right panel-end w-75'
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
