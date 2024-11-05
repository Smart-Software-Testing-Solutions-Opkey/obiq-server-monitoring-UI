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
  subscriptions: Subscription[] = [];
  ngOnInit(): void {
    this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
      if(data?.type == "getDataWithTime"){
        this.getLogsChart(data?.timeFilter);
        this.getViewLogs(data?.timeFilter);
      }
    }))
    this.getLogsChart()
    this.getViewLogs()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  createChart(): void {
    debugger;
    const isHourly = this.chartData.groupedBy === 'Hour';
    const seriesData = this.getSeriesData(this.chartData.essServerLogUsageDtoList);

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


getSeriesData(dataList: any[]): ApexAxisChartSeries {
  debugger;
  const dataPoints = ['Success', 'Error', 'Warning', 'Blocked'];
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
              let timestamp;

              if (isHourly) {
                  // Parse hour, minute, and second from the time string in UTC
                  const [hours, minutes, seconds] = item.fromTimeInStr.split(':').map(Number);
                  timestamp = Date.UTC(1970, 0, 1, hours, minutes, seconds); 
              } else {
                  // Parse date for daily data
                  const [year, month, day] = item.fromTimeInStr.split('-').map(Number);
                  timestamp = Date.UTC(year, month - 1, day);
              }

              const pointData = item.dataPointList.find(d => d.name === point);
              return [
                  timestamp,
                  pointData ? pointData.value : 0
              ];
          }),
          color: color,
      };
  });
}




  




  displayTimeRange(): void {
    const formattedStartTime = this.datePipe.transform(this.startTime, 'MMM d, hh:mm a', '+0530');
    const formattedEndTime = this.datePipe.transform(this.endTime, 'MMM d, hh:mm a', '+0530');

    const timeRange = `${formattedStartTime} to ${formattedEndTime}`;
    console.log(timeRange);
    this.app_service.dataTransmitter(timeRange);
  }

  succes_error_switch(){
    
  }

  getLogsChart(timeFilter?: any) {


    window.loadingStart("#Env_manager_main_right", "Please wait");


    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    const form_data = {
      "timeSpanEnum": "LAST_7_DAYS",
      "viewId": this.view.viewId,
      "projectId": this.service_data.UserDto.ProjectDTO.P_ID,
      "limitBy": 0,
      "offset": 0,
      "widgetType": "ESS_LOG_TIMEGRAPH_WIDGET"
    };
    if(timeFilter?.type == 'setEnum'){
      form_data.timeSpanEnum = timeFilter?.value;
    } else if(timeFilter?.type == "setCustom"){
      delete form_data?.timeSpanEnum;
      form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
      form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
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
  getViewLogs(timeFilter?: any) {
    debugger;
    window.loadingStart("#Env_manager_main_right", "Please wait");

    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    const form_data =  { "timeSpanEnum": "LAST_7_DAYS", "viewId": this.view.viewId, "projectId": this.service_data.UserDto.ProjectDTO.P_ID, "logToSearch": "", "limitBy": 20, "offset": 0, "widgetType": "ESS_LOG_DATA_WIDGET" };
    if(timeFilter?.type == 'setEnum'){
     form_data.timeSpanEnum = timeFilter?.value;
    } else if(timeFilter?.type == "setCustom"){
      delete form_data?.timeSpanEnum;
      form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
      form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
    }
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
          debugger;
          window.loadingStop("#Env_manager_main_right");
          this.logDataSource = result.essLogsList
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
  onSelectionChange(e) {
    debugger
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


}
