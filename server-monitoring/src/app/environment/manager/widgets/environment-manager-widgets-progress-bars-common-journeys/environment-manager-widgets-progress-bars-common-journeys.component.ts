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
  ApexYAxis,
  ApexTooltip
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
  tooltip:ApexTooltip
};

@Component({
  selector: 'app-environment-manager-widgets-progress-bars-common-journeys',
  templateUrl: './environment-manager-widgets-progress-bars-common-journeys.component.html',
  styleUrl: './environment-manager-widgets-progress-bars-common-journeys.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvironmentManagerWidgetsProgressBarsCommonJourneysComponent implements OnInit, OnDestroy {

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
  @Input()Editable:boolean
   
  title:string
  maxCount: number = 0;

  widgetType = 'USER_JOURNEY_MOST_COMMON_WIDGET'
  obj_filter : any ;
  @Input('child_data') set child_data({view,title,widgetType,obj_filter}) {
   this.view = view;
   this.title=title;
   this.widgetType= widgetType;
   this.obj_filter= obj_filter
   if(this?.view?.viewId && this?.widgetType){
    this.datasourceProgressBar = [];
    this.getWidgetData(this.obj_filter)
    this.createChart();
  }
 
  }
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(){

    // this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
    //   if(data?.type == "getDataWithTime"){
    //     this.getWidgetData( data?.timeFilter)
    //   }
    // }))
    
    this.startDataReceiving();
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
  searchText : any;
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
  tempdatasourceProgressBar : any=[];
  filterSearchResults(){
  
    this.datasourceProgressBar = this.tempdatasourceProgressBar.filter( (data)=>data?.subActivityName?.toLowerCase().includes(this.searchText?.toLowerCase()) ||  data?.calculatedTime?.toLowerCase().includes(this.searchText?.toLowerCase()))
    this.cdRef.detectChanges()
  }
  // refreshPage(){
  //   if(this.isRefresh == true){
  //     this.getWidgetData();
  //   }
  
  // }

  getWidgetData(timeFilter?: any){
    window.loadingStart("#common-journey-"+this.widgetType, "Please wait");
   
    let ajax_url : any;
    let form_data : any ;
    if(this.widgetType == 'ERP'){

      ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ServerInsightWidgetrController/getInsightWidgetData`;
      form_data = {
        "appType": "ORACLEFUSION",
        "viewId": this?.view?.viewId,
        "widgetType": "USER_JOURNEY_MOST_COMMON_WIDGET",
        "projectId":this.service_data.UserDto.ProjectDTO.P_ID
      };
    }
    else{
      ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ServerInsightWidgetrController/getInsightWidgetData`;
      form_data = {
        "appType": "ORACLEFUSION",
        "viewId": this?.view?.viewId,
        "widgetType": "USER_JOURNEY_MOST_COMMON_WIDGET",
        "userId": this.service_data.UserDto.UserDTO.U_ID,
        "projectId":this.service_data.UserDto.ProjectDTO.P_ID
      };

    }
    if(timeFilter?.type == 'setEnum'){
      form_data.timeSpanEnum = timeFilter?.value;
     } else if(timeFilter?.type == "setCustom"){
      delete form_data?.timeSpanEnum;
      form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
      form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
    }
    else{
      let timeFilter={"type":"setEnum","value":"LAST_24_HOUR"}
      form_data["timeSpanEnum"] = timeFilter?.value;

    }
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
          result = {
            "Create Debit Memo From Spreadsheet": {
                "count": 12,
                "dataPlotList": [
                    {
                        "count": 3,
                        "percentDiff": 0.0,
                        "direction": "up"
                    },
                    {
                        "count": 9,
                        "percentDiff": 200.0,
                        "direction": "up"
                    }
                ]
            },
            "Create Invoice From Spreadsheet": {
                "count": 4,
                "dataPlotList": [
                    {
                        "count": 1,
                        "percentDiff": 0.0,
                        "direction": "up"
                    },
                    {
                        "count": 3,
                        "percentDiff": 200.0,
                        "direction": "up"
                    }
                ]
            }
        }
         if(result){
         
            // this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
             
            //   const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
            //   return {
            //     ...item,
            //     calculatedTime 
            //   };
            // });

            result = Object.fromEntries(Object.entries(result).slice(0, 5))
            this.datasourceProgressBar = Object.keys(result).map(item => {
              const count = result[item].count;
              let dataPlotList = result[item].dataPlotList

              return {
                subActivityName: item,
                count: count,
                dataPlotList: dataPlotList
              };
            })
          this.tempdatasourceProgressBar = this.datasourceProgressBar
          this.datasourceProgressBar.map(val => {
            val.dataPlotList = val.dataPlotList.map(item=>item.percentDiff)
            })
          window.loadingStop("#common-journey-"+this.widgetType);
          this.cdRef.detectChanges();
        }
       
      },
        error: (error: any) => {
          window.loadingStop("#common-journey-"+this.widgetType);
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

//     return `${minutes}m ${seconds}s`;
// }


createChart(): void {
  this.chartOptions = {
   
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
    tooltip:{
      marker:{
        fillColors: ['#268144'],
      }
    },
    stroke: {
      curve: "straight",
      width:2,
      colors: ['#268144']
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