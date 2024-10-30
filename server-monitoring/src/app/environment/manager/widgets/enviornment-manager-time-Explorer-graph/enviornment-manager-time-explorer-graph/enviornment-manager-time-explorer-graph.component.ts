
import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexFill,
  ApexLegend, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexTooltip, ApexStroke
} from 'ng-apexcharts';
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
export class EnviornmentManagerTimeExplorerGraphComponent {
  constructor(
    public app_service: AppService,
    public service_data: AppDataService,

  ) {

  }
  @Input() chartData: any;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.getLogsChart()
    // this.createChart();
  }
  @Input() view: any

  getLogsChart() {
    window.loadingStart("#Env_manager_main_right", "Please wait");
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + "/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    this.app_service.make_post_server_call(ajax_url, {
      "timeSpanEnum": "LAST_7_DAYS",
      "viewId": this.view.viewId,
      "projectId": this.service_data.UserDto.ProjectDTO.P_ID,
      "limitBy": 20,
      "offset": 0,
      "widgetType": "ESS_LOG_TIMEGRAPH_WIDGET"
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
            legend: { position: "bottom", offsetX: -10, offsetY: 0 }
          }
        }
      ],
      plotOptions: { bar: { horizontal: false } },
      xaxis: { type: 'datetime', labels: { format: 'dd MMM' } },
      fill: { opacity: 1 },
      legend: { position: 'right' },
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
      case 'Success': return '#33c7ff';
      case 'Error': return '#ff4c33';
      case 'Warning': return '#ff6833';
      default: return '#ff3333';
    }
  }
}
