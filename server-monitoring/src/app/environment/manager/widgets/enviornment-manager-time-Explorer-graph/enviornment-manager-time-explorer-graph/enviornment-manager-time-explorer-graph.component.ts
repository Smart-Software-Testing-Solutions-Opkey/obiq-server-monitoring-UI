
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexFill,
  ApexLegend, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexTooltip, ApexStroke
} from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};
@Component({
  selector: 'app-enviornment-manager-time-explorer-graph',
  templateUrl: './enviornment-manager-time-explorer-graph.component.html',
  styleUrl: './enviornment-manager-time-explorer-graph.component.scss'
})
export class EnviornmentManagerTimeExplorerGraphComponent implements OnInit, OnDestroy {
  constructor(
    public app_service: AppService,
    public service_data: AppDataService,

  ) {

  }
  @Input() chartData: any;
  @Input() Editable : boolean = false
  title :any;
  widgetType = ''
  @Input('child_data') set child_data({view,title,widgetType}) {
   this.view = view;
   this.title=title;
   this.widgetType = widgetType
  }
  public chartOptions: Partial<ChartOptions>;
  subscriptions: Subscription[] = [];
  ngOnInit(): void {
    this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
      if(data?.type == "getDataWithTime"){
        this.getLogsChart(data?.timeFilter)
      }
    }))
    this.getLogsChart()
    // this.createChart();
    this.startDataReceiving();
  }

  isRefresh: boolean = false;
  startDataReceiving(){
    this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        if(data.callsource == 'widgetOperation'){ 
          this.isRefresh = data.data;
          this.refreshPage();  
        }
      } 
    });
  }
  refreshPage(){
    if(this.isRefresh == true){
      this.getLogsChart();
    }
  
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  view: any

  getLogsChart(timeFilter?: any) {
    window.loadingStart("#maintimeexplorer"+this.widgetType, "Please wait..");
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    const form_data = {
      "timeSpanEnum": "LAST_7_DAYS",
      "viewId": this.view.viewId,
      "projectId": this.service_data.UserDto.ProjectDTO.P_ID,
      "limitBy": 20,
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
          window.loadingStop("#maintimeexplorer"+this.widgetType);
          this.chartData = result
          this.createChart();
        },
        error: (error: any) => {
          window.loadingStop("#maintimeexplorer"+this.widgetType);
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }
  createChart(): void {
    this.chartOptions = {
      series: this.getSeriesData(this.chartData.essServerLogUsageDtoList),
      chart: {
        type: 'bar',
        height: 200,
        stacked: true,
        toolbar: {
          show: true,
          tools: { download: true, selection: true, zoom: true }
        },
        zoom: { enabled: true }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false, 
            }
          }
        }
      ],
      plotOptions: { bar: { horizontal: false } },
      xaxis: { type: 'datetime', labels: { format: 'dd MMM' } },
      fill: { opacity: 1 },
      legend: {
        show: false, 
      },
      dataLabels: { enabled: false },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        x: { formatter: (value) => new Date(value).toLocaleDateString() }
      },
      yaxis: { labels: { formatter: (value) => value.toFixed(0) } }
    };
  }

  getSeriesData(dataList: any[]): ApexAxisChartSeries {
    const dataPoints = ['Success', 'Error', 'Warning', 'Blocked'];
    return dataPoints.map(point => ({
      name: point,
      data: dataList.map(item => {
        const [year, month, day] = item.fromTimeInStr.split('-').map(Number);
        const pointData = item.dataPointList.find(d => d.name === point);
        return [Date.UTC(year, month - 1, day), pointData ? pointData.value : 0];
      }),
      color: this.getColor(point)
    }));
  }

  getColor(point: string): string {
    switch (point) {
      case 'Success': return '#268144';
      case 'Error': return '#ff4c33';
      case 'Warning': return '#ff6833';
      default: return '#ff3333';
    }
  }
  isRename : boolean = false;
  renameWidget(){
      this.isRename = true;
      setTimeout(() => {
        let ele = document.getElementById('renameInput')
        ele.focus()
      }, 0);

  }
  renaming(){
    this.isRename = false;
  }
}
