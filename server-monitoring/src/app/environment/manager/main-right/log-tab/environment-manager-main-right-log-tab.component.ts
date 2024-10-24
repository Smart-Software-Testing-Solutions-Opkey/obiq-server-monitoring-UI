import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRightPanelComponent } from '../../right-panel/manager-right-panel.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
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
    public dataService:AppDataService
  ){}
  @Input() analyticsType: any;
  @Input() view: any;
  startTime:any;
  endTime :any;
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
    debugger;
    // Process result data to create series and xaxis categories
    const categories = this.chartData.essServerLogUsageDtoList.map(item => item.fromTimeInStr);
    const seriesData = this.getSeriesData(this.chartData.essServerLogUsageDtoList);

    this.chartOptions = {
      series: seriesData,
      chart: {
        type: 'bar',
        height: 200,
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: true,
          tools: {
            download: true, 
            selection: true, 
            zoom: true, 
          },
        },
        zoom: {
          enabled: true
        },
        events: {
          selection: (chartContext, { xaxis }) => {
            const startTime = xaxis.min;
            const endTime = xaxis.max;
            console.log('Start Time:', new Date(startTime));
            console.log('End Time:', new Date(endTime));
            
            this.startTime = new Date(startTime);
            this.endTime = new Date(endTime);
          }
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
          horizontal: false
        }
      },
      xaxis: {
        categories: categories,
        type:"datetime"
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },
    };
  }

  getSeriesData(dataList: any[]): ApexAxisChartSeries {
    const dataPoints = ['Success', 'Error', 'Warning', 'Blocked'];
    return dataPoints.map(point => {
      let color;
    
      if (point === 'Success') {
        color = '#568ee7'; 
      } else if (point === 'Error') {
        color = '#f21c1c';
      } else {
        color = '#f85353'; 
      }
  
      return {
        name: point,
        data: dataList.map(item => {
          const pointData = item.dataPointList.find(d => d.name === point);
          return pointData ? pointData.value : 0;
        }),
        color: color, // Set the color for the series
      };
    });
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
