// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-environment-manager-widgets-progress-bars-slowest-journeys',
//   templateUrl: './environment-manager-widgets-progress-bars-slowest-journeys.component.html',
//   styleUrl: './environment-manager-widgets-progress-bars-slowest-journeys.component.scss'
// })
// export class EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent {

// }
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-environment-manager-widgets-progress-bars-slowest-journeys',
  templateUrl: './environment-manager-widgets-progress-bars-slowest-journeys.component.html',
  styleUrl: './environment-manager-widgets-progress-bars-slowest-journeys.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent implements OnInit {

  constructor(
    private app_service: AppService,
    private service_data: AppDataService,
    private cdRef: ChangeDetectorRef
  ){

  }
  datasourceProgressBar: Array<any> = [
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
  ]

  view: any = null;
  @Input()Editable:boolean = false
   widgetData={
    widgetType: "USER_JOURNEY_TOP_SLOW_WIDGET"
   }
  title:string = ''
  maxCount: number = 0;
  widgetType = ''
  @Input('child_data') set child_data({view,title,widgetType}) {
   this.view = view;
   this.title=title;
   this.widgetType = widgetType
  }
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(){
    if(this?.view?.viewId && this?.widgetData?.widgetType){
      this.datasourceProgressBar = [];
      this.getWidgetData()
      this.createChart();
    }
  }

  getWidgetData(){
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData`;
    const form_data = {
      "appType": "ORACLEFUSION",
      "viewId": this?.view?.viewId,
      // "projectId": this?.service_data?.UserDto?.ProjectDTO?.P_ID,
      "widgetType": this.widgetData?.widgetType,
    };
   
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
         if(result){
          if(this?.widgetData?.widgetType == "USER_GUIDE_LIST_PER_PROCESS_WIDGET" && typeof result == 'object'){
            this.maxCount = Math.max(...Object.values(result).map((item: any) => item.count));
            this.datasourceProgressBar = Object.keys(result).map(item => {
              const count = result[item].count;
              const passPercent = (count / this.maxCount) * 100;
              const failPercent = 100 - passPercent;
              return {
                subActivityName: item, 
                passPercent: passPercent, 
                failPercent: failPercent,
                count:count
              };
            })
          }
            else 
             if ((this?.widgetData?.widgetType == "USER_JOURNEY_TOP_SLOW_WIDGET" || this?.widgetData?.widgetType == "USER_JOURNEY_TOP_FAST_WIDGET") && typeof result == 'object') {
             { 
              this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
                if(this?.widgetData?.widgetType == "USER_JOURNEY_TOP_SLOW_WIDGET"){}
                const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
                return {
                  ...item,
                  calculatedTime 
                };
              });
            } 
            
          }
          else{
            // this.datasourceProgressBar = result.slice(0, 5);
            this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
              if(this?.widgetData?.widgetType == "USER_JOURNEY_MOST_COMMON_WIDGET"){}
              const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
              return {
                ...item,
                calculatedTime 
              };
            });
          }
          this.cdRef.detectChanges();
        }
       
      },
        error: (error: any) => {
          // window.loadingStop("#Env_manager_main_right");
          console.error(error);
        }
      });
  }
  calculateDuration(from: number, to: number): string {
    
    const durationMillis = from - to;

    
    if (durationMillis < 1000) {
        return `${durationMillis} ms`;
    }

    
    const durationSeconds = Math.floor(durationMillis / 1000);
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;

    return `${minutes}m ${seconds}s`;
}


createChart(): void {
  this.chartOptions = {
    series: [
      {
        data: [10, 41, 35, 51]
      }
    ],
    chart: {
      height: 35,
      type: "line",
      zoom: {
        enabled: false
      },
      toolbar:{
        show: false
      },
      sparkline: {
        enabled: true
      },
    },
    dataLabels: {
      enabled: false
    },
    
    stroke: {
      curve: "straight",
      width:2
    },
    title: {
      text: "Product Trends by Month",
      align: "left"
    },
    grid: {
      show: false,
      padding : {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    },
   
    xaxis: {
      
      labels:{
        show:false
      },
      axisBorder: {
        show: false 
      },
      axisTicks: {
        show: false 
      }
    },
    yaxis:{
      labels:{
        show:false
      }
    }
  };
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
