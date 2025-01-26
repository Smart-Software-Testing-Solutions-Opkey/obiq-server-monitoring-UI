
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { MsgboxService } from 'src/app/services/msgbox.service';

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
export class EnvironmentManagerWidgetsProgressBarsSlowestJourneysComponent implements OnInit, OnDestroy {

  constructor(
    private app_service: AppService,
    private service_data: AppDataService,
    public dataService: AppDataService,
    private cdRef: ChangeDetectorRef,
    private msgbox: MsgboxService 
  ){

  }
  datasourceProgressBar: Array<any> = [
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    
  ]

  view: any = null;
  @Input()Editable:boolean = false
  
  title:string = ''
  maxCount: number = 0;
  widgetType =  "USER_JOURNEY_TOP_SLOW_WIDGET"
  @Input('child_data') set child_data({view,title,widgetType}) {
   this.view = view;
   this.title=title;
    this.widgetType = widgetType;
  }
  public chartOptions: Partial<ChartOptions>;

  searchText : any;
  tempdatasourceProgressBar : any = [];
  ngOnInit(){
    if(this?.view?.viewId && this.widgetType){
      this.datasourceProgressBar = [];
      this.getWidgetData()
      this.createChart();
    }
    this.startDataReceiving();
  }

  filterSearchResults(){
    this.datasourceProgressBar  = []
    this.datasourceProgressBar = this.tempdatasourceProgressBar.filter( (data)=>data?.subActivityName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.calculatedTime.toLowerCase().includes(this.searchText.toLowerCase())  )
    this.cdRef.detectChanges()

  }
ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
 
  subscriptions: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  isRefresh: boolean = false;
  startDataReceiving(){
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        
        if (data.callsource == 'OVERVIEW_TAB'){
          if( data.action == 'refresh'){
            this.getWidgetData()
          }
          else if (data.action == 'search'){
            this.searchText = data.data;
            this.filterSearchResults()
          }
        }
      }  
    });
    this.subscriptions.push(data_receiver);
  }
  // refreshPage(){
  //   if(this.isRefresh == true){
  //     this.getWidgetData();
  //   }
  
  // }

  getWidgetData(){
    window.loadingStart("#slowest-journey-"+this.widgetType, "Please wait");
    let ajax_url : any;
    let form_data : any ;
    if(this.widgetType == 'ERP'){
      ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData`;
      form_data = {
        "appType": "ORACLEFUSION",
        "viewId": this?.view?.viewId,
        "widgetType": "USER_JOURNEY_TOP_SLOW_WIDGET",
      };
    }
    else{
      ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData`;
      form_data = {
        "appType": "ORACLEFUSION",
        "viewId": this?.view?.viewId,
        "widgetType": "USER_JOURNEY_TOP_SLOW_WIDGET",
        "userId": this.service_data.UserDto.UserDTO.U_ID
      };

    }
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
         if(result){
         
            
             if ( typeof result == 'object') {
             { 
              this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
     
                const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
                return {
                  ...item,
                  calculatedTime 
                };
              });
            } 
            this.tempdatasourceProgressBar = this.datasourceProgressBar
            
          }
          else{
            // this.datasourceProgressBar = result.slice(0, 5);
            this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
              
              const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
              return {
                ...item,
                calculatedTime 
              };
            });
            this.tempdatasourceProgressBar = this.datasourceProgressBar
          }
          window.loadingStop("#slowest-journey-"+this.widgetType);
          this.cdRef.detectChanges();
        }
       
      },
        error: (error: any) => {
          window.loadingStop("#slowest-journey-"+this.widgetType);
          console.error(error);
          this.msgbox.display_error_message(error);
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
    this.app_service.routeTo('environment','erpjourney',`viewId=${this.view.viewId}`)
  }
  if(this.widgetType == 'userBehaviour'){
    this.app_service.routeTo('environment','ubjourney',`viewId=${this.view.viewId}`)
  }
}
}
