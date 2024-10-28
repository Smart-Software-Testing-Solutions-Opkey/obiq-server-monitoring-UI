import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRightPanelComponent } from '../../right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { DatePipe } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexFill, ApexLegend,
  ChartComponent,
  ApexPlotOptions,
  ApexResponsive,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexStroke, } from 'ng-apexcharts';

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
export class EnvironmentManagerMainRightLogTabComponent implements OnInit,OnDestroy {


  constructor(
    private modalService: NgbModal,
    public service_data: AppDataService,
    public app_service:AppService,
    private datePipe: DatePipe
  ){}
  @Input() analyticsType: any;
  @Input() view: any;
  startTime: Date | null = null;
  endTime: Date | null = null;
  public chartOptions: Partial<ChartOptions>;
  chartData:any;
  selectedKeys = []
  logDataSource = []
  ngOnInit(): void {
    this.getLogsChart()
    this.getViewLogs()
  }
  ngOnDestroy(): void {
    
  }
createChart(): void {
  const seriesData = this.getSeriesData(this.chartData.essServerLogUsageDtoList);

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
          console.log('Selection event triggered'); 
          
          const startTime = xaxis?.min;
          const endTime = xaxis?.max;
          if (startTime && endTime) {
            this.startTime = new Date(startTime);
            this.endTime = new Date(endTime);
            console.log('Start Time:', this.startTime);
            console.log('End Time:', this.endTime);
          }
        },
        zoomed: (chartContext, { xaxis }) => {
          this.startTime = xaxis?.min ? new Date(xaxis.min) : null;
          this.endTime = xaxis?.max ? new Date(xaxis.max) : null;

          this.displayTimeRange();
        },
        mouseMove: (event) => {
          const rect = event.target.getBoundingClientRect();
          const offsetX = event.clientX - rect.left;
          console.log('Mouse X:', offsetX);
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
      tickAmount: 'dataPoints',
      labels: {
        format: 'dd MMM',
        show: true,
      rotate: 0,
      },
      min: undefined, 
      max: undefined
    },
    fill: {
      opacity: 1,
    },
    legend: {
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
          return date.toLocaleDateString();
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
  const dataPoints = ['Success', 'Error', 'Warning', 'Blocked'];
  return dataPoints.map(point => {
    let color;

    switch (point) {
      case 'Success':
        color = '#33c7ff';
        break;
      case 'Error':
        color = '#ff4c33';
        break;
      case 'Warning':
        color = '#ff6833';
        break;
      default:
        color = '#ff3333';
    }

    return {
      name: point,
      data: dataList.map(item => {
        const dateParts = item.fromTimeInStr.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);

        const pointData = item.dataPointList.find(d => d.name === point);
        return [
          Date.UTC(year, month, day), 
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
  


  getLogsChart(){
    window.loadingStart("#Env_manager_main_right", "Please wait");
    //let ajax_url =   environment.BASE_OPKEY_URL+"/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceTabControlList";
    let ajax_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    this.app_service.make_post_server_call(ajax_url, {
      "timeSpanEnum":"LAST_7_DAYS",
      "viewId":this.view.viewId,
      "projectId":this.service_data.UserDto.ProjectDTO.P_ID,
      "limitBy":20,
      "offset":0,
      "widgetType":"ESS_LOG_TIMEGRAPH_WIDGET"
  })
    .subscribe({
      next: (result: any) => {
      window.loadingStop("#Env_manager_main_right");
      result = {
        "groupedBy": "Days",
        "essServerLogUsageDtoList": [
            {
                "fromTimeInStr": "2024-10-22",
                "toTimeInStr": "2024-10-22",
                "totalLogCount": 120,
                "dataPointList": [
                    { "name": "Success", "value": 60 },
                    { "name": "Error", "value": 30 },
                    { "name": "Warning", "value": 15 },
                    { "name": "Blocked", "value": 15 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-23",
                "toTimeInStr": "2024-10-23",
                "totalLogCount": 90,
                "dataPointList": [
                    { "name": "Success", "value": 50 },
                    { "name": "Error", "value": 10 },
                    { "name": "Warning", "value": 20 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-24",
                "toTimeInStr": "2024-10-24",
                "totalLogCount": 150,
                "dataPointList": [
                    { "name": "Success", "value": 100 },
                    { "name": "Error", "value": 20 },
                    { "name": "Warning", "value": 10 },
                    { "name": "Blocked", "value": 20 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-25",
                "toTimeInStr": "2024-10-25",
                "totalLogCount": 110,
                "dataPointList": [
                    { "name": "Success", "value": 60 },
                    { "name": "Error", "value": 30 },
                    { "name": "Warning", "value": 10 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-26",
                "toTimeInStr": "2024-10-26",
                "totalLogCount": 200,
                "dataPointList": [
                    { "name": "Success", "value": 140 },
                    { "name": "Error", "value": 30 },
                    { "name": "Warning", "value": 20 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-27",
                "toTimeInStr": "2024-10-27",
                "totalLogCount": 80,
                "dataPointList": [
                    { "name": "Success", "value": 40 },
                    { "name": "Error", "value": 20 },
                    { "name": "Warning", "value": 10 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-28",
                "toTimeInStr": "2024-10-28",
                "totalLogCount": 95,
                "dataPointList": [
                    { "name": "Success", "value": 45 },
                    { "name": "Error", "value": 25 },
                    { "name": "Warning", "value": 15 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-29",
                "toTimeInStr": "2024-10-29",
                "totalLogCount": 130,
                "dataPointList": [
                    { "name": "Success", "value": 70 },
                    { "name": "Error", "value": 30 },
                    { "name": "Warning", "value": 20 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-30",
                "toTimeInStr": "2024-10-30",
                "totalLogCount": 60,
                "dataPointList": [
                    { "name": "Success", "value": 20 },
                    { "name": "Error", "value": 10 },
                    { "name": "Warning", "value": 20 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-10-31",
                "toTimeInStr": "2024-10-31",
                "totalLogCount": 170,
                "dataPointList": [
                    { "name": "Success", "value": 90 },
                    { "name": "Error", "value": 40 },
                    { "name": "Warning", "value": 20 },
                    { "name": "Blocked", "value": 20 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-01",
                "toTimeInStr": "2024-11-01",
                "totalLogCount": 200,
                "dataPointList": [
                    { "name": "Success", "value": 80 },
                    { "name": "Error", "value": 20 },
                    { "name": "Warning", "value": 80 },
                    { "name": "Blocked", "value": 20 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-02",
                "toTimeInStr": "2024-11-02",
                "totalLogCount": 110,
                "dataPointList": [
                    { "name": "Success", "value": 80 },
                    { "name": "Error", "value": 10 },
                    { "name": "Warning", "value": 10 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-03",
                "toTimeInStr": "2024-11-03",
                "totalLogCount": 190,
                "dataPointList": [
                    { "name": "Success", "value": 120 },
                    { "name": "Error", "value": 30 },
                    { "name": "Warning", "value": 20 },
                    { "name": "Blocked", "value": 20 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-04",
                "toTimeInStr": "2024-11-04",
                "totalLogCount": 160,
                "dataPointList": [
                    { "name": "Success", "value": 100 },
                    { "name": "Error", "value": 30 },
                    { "name": "Warning", "value": 10 },
                    { "name": "Blocked", "value": 20 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-05",
                "toTimeInStr": "2024-11-05",
                "totalLogCount": 210,
                "dataPointList": [
                    { "name": "Success", "value": 150 },
                    { "name": "Error", "value": 20 },
                    { "name": "Warning", "value": 30 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-06",
                "toTimeInStr": "2024-11-06",
                "totalLogCount": 100,
                "dataPointList": [
                    { "name": "Success", "value": 70 },
                    { "name": "Error", "value": 10 },
                    { "name": "Warning", "value": 10 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-07",
                "toTimeInStr": "2024-11-07",
                "totalLogCount": 135,
                "dataPointList": [
                    { "name": "Success", "value": 85 },
                    { "name": "Error", "value": 25 },
                    { "name": "Warning", "value": 15 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
                "fromTimeInStr": "2024-11-08",
                "toTimeInStr": "2024-11-08",
                "totalLogCount": 95,
                "dataPointList": [
                    { "name": "Success", "value": 55 },
                    { "name": "Error", "value": 20 },
                    { "name": "Warning", "value": 10 },
                    { "name": "Blocked", "value": 10 }
                ]
            },
            {
              "fromTimeInStr": "2024-11-09",
              "toTimeInStr": "2024-11-09",
              "totalLogCount": 50,
              "dataPointList": [
                  { "name": "Success", "value": 55 },
                  { "name": "Error", "value": 20 },
                  { "name": "Warning", "value": 10 },
                  { "name": "Blocked", "value": 10 }
              ]
          },
          {
            "fromTimeInStr": "2024-11-10",
            "toTimeInStr": "2024-11-10",
            "totalLogCount": 95,
            "dataPointList": [
                { "name": "Success", "value": 55 },
                { "name": "Error", "value": 20 },
                { "name": "Warning", "value": 10 },
                { "name": "Blocked", "value": 10 }
            ]
        },
        ]
    }
    
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
  getViewLogs(){
    debugger;
    window.loadingStart("#Env_manager_main_right", "Please wait");
    //let ajax_url =   environment.BASE_OPKEY_URL+"/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceTabControlList";
    let ajax_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    this.app_service.make_post_server_call(ajax_url, {"timeSpanEnum":"LAST_7_DAYS","viewId":this.view.viewId,"projectId":this.service_data.UserDto.ProjectDTO.P_ID,"logToSearch":"","limitBy":20,"offset":0, "widgetType":"ESS_LOG_DATA_WIDGET"})
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
  onSelectionChange(e){
    debugger
   let dataItem = e.selectedRows[0].dataItem
   const modalRef = this.modalService.open( ManagerRightPanelComponent,{
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
  modalRef.componentInstance.selectedItem = {callsource:'environmentManager',data:dataItem};
  }

    
}
