
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

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
  selector: 'app-e-m-functional-error-widget',
  templateUrl: './e-m-functional-error-widget.component.html',
  styleUrl: './e-m-functional-error-widget.component.scss'
})
export class EMFunctionalErrorWidgetComponent implements OnInit {

  constructor(
    private app_service: AppService,
    private service_data: AppDataService,
    private cdRef: ChangeDetectorRef
  ){

  }
  datasourceProgressBar: Array<any> = [
    {  subActivityName:'Assertion Error', count:20 },
    {  subActivityName:'Assertion Error', count:25},
    { subActivityName:'Assertion Error', count:30 },
    {  subActivityName:'Assertion Error',count:35  },
  ]

  view: any = null;
  @Input()Editable:boolean
  
    widgetType: "TOP_API_ERRORS_WIDGET"
   
   title:string
  @Input('child_data') set child_data({ view,title }) {
    
   
   this.view = view
   this.title =title
  
   }
  maxCount: number = 0;

  @Input() chartData: any;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(){
    if(this?.view?.viewId ){
      // this.datasourceProgressBar = [];
      // this.getWidgetData()
      this.createChart();
    }
  }

//   getWidgetData(){
//     let ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData`;
//     const form_data = {
//       "appType": "ORACLEFUSION",
//       "viewId": this?.view?.viewId,
      
//       "widgetType": this.widgetData?.widgetType,
//     };
   
//     this.app_service.make_post_server_call(ajax_url, form_data)
//       .subscribe({
//         next: (result: any) => {
//          if(result){
//           if(this?.widgetData?.widgetType == "USER_GUIDE_LIST_PER_PROCESS_WIDGET" && typeof result == 'object'){
//             this.maxCount = Math.max(...Object.values(result).map((item: any) => item.count));
//             this.datasourceProgressBar = Object.keys(result).map(item => {
//               const count = result[item].count;
//               const passPercent = (count / this.maxCount) * 100;
//               const failPercent = 100 - passPercent;
//               return {
//                 subActivityName: item, 
//                 passPercent: passPercent, 
//                 failPercent: failPercent,
//                 count:count
//               };
//             })
//           }
//             else 
//              if ((this?.widgetData?.widgetType == "USER_JOURNEY_TOP_SLOW_WIDGET" || this?.widgetData?.widgetType == "USER_JOURNEY_TOP_FAST_WIDGET") && typeof result == 'object') {
//              { 
//               this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
//                 if(this?.widgetData?.widgetType == "USER_JOURNEY_TOP_SLOW_WIDGET"){}
//                 const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
//                 return {
//                   ...item,
//                   calculatedTime 
//                 };
//               });
//             } 
            
//           }
//           else{
//             // this.datasourceProgressBar = result.slice(0, 5);
//             this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
//               if(this?.widgetData?.widgetType == "USER_JOURNEY_MOST_COMMON_WIDGET"){}
//               const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
//               return {
//                 ...item,
//                 calculatedTime 
//               };
//             });
//           }
//           this.cdRef.detectChanges();
//         }
       
//       },
//         error: (error: any) => {
//           // window.loadingStop("#Env_manager_main_right");
//           console.error(error);
//         }
//       });
//   }
//   calculateDuration(from: number, to: number): string {
    
//     const durationMillis = from - to;

    
//     if (durationMillis < 1000) {
//         return `${durationMillis} ms`;
//     }

    
//     const durationSeconds = Math.floor(durationMillis / 1000);
//     const minutes = Math.floor(durationSeconds / 60);
//     const seconds = durationSeconds % 60;

//     return `${minutes}m ${seconds}s`;
// }


createChart(): void {
  this.chartOptions = {
    series: [
      {
        data: [10, 35, 40, 65]
      }
    ],
    chart: {
      height: 35,
      width:100,
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
