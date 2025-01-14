
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
  selector: 'app-environment-manager-widgets-progress-bars-fastest-journeys',
  templateUrl: './environment-manager-widgets-progress-bars-fastest-journeys.component.html',
  styleUrl: './environment-manager-widgets-progress-bars-fastest-journeys.component.scss'
})
export class EnvironmentManagerWidgetsProgressBarsFastestJourneysComponent {
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
  title: any = null;
  widgetType = ''
  @Input('child_data') set child_data({view,title,widgetType}) {
   this.view = view;
   this.title=title;
   this.widgetType = widgetType
   console.log("thsssssssss    ",this.widgetType);
  }


  maxCount: number = 0;

  @Input() chartData: any;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(){
    if(this?.view?.viewId ){
      this.datasourceProgressBar = [];
      this.getWidgetData()
      this.createChart();
    }
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
      this.getWidgetData();
    }
  
  }


  getWidgetData(){
    window.loadingStart("#fastest-journey-"+this.widgetType, "Please wait");
    
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData`;
    const form_data = {
      "appType": "ORACLEFUSION",
      "viewId": this?.view?.viewId,
      // "projectId": this?.service_data?.UserDto?.ProjectDTO?.P_ID,
      "widgetType": "USER_JOURNEY_TOP_FAST_WIDGET",
    };
   
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
         if(result){
         
             if (typeof result == 'object') {
             
              this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
               
                const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
                return {
                  ...item,
                  calculatedTime 
                };
              });
            
            
          }
          window.loadingStop("#fastest-journey-"+this.widgetType);
          
          this.cdRef.detectChanges();
        }
       
      },
        error: (error: any) => {
          window.loadingStop("#fastest-journey-"+this.widgetType);
          console.error(error);
        }
      });
  }
//   calculateDuration(from: number, to: number): string {
    
//     const durationMillis = from - to;

    
//     if (durationMillis < 1000) {
//         return `${durationMillis} ms`;
//     }

    
//     const durationSeconds = Math.floor(durationMillis / 1000);
//     const minutes = Math.floor(durationSeconds / 60);
//     const seconds = durationSeconds % 60;

//     return `${minutes}min ${seconds}sec`;
// }

calculateDuration(from: number, to: number): string {
  const durationMillis = from - to;

  if (durationMillis < 1000) {
      return `${durationMillis} ms`;
  }

  const durationSeconds = Math.floor(durationMillis / 1000);
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = durationSeconds % 60;

  const formatWithLeadingZero = (value: number): string => value < 10 ? `0${value}` : `${value}`;
  let duration = '';
    if (hours > 0) {
        duration += `${formatWithLeadingZero(hours)} hr `;
    }
    if (minutes > 0 || hours > 0) {
        duration += `${formatWithLeadingZero(minutes)} min `;
    }
    duration += `${formatWithLeadingZero(seconds)} sec`;

    return duration;
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
@Input() Editable:boolean = false
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
openFullJourney(){
  if(this.widgetType == 'ERP'){
    this.app_service.routeTo('environment','erpjourney')
  }
  if(this.widgetType == 'userBehaviour'){
    this.app_service.routeTo('environment','ubjourney')
  }
}

}
