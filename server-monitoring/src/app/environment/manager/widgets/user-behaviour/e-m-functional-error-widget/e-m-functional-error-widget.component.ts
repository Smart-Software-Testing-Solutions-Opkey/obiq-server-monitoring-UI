
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  ApexYAxis,
  ApexTooltip
} from "ng-apexcharts";
import { environment } from 'src/environments/environment';
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
  selector: 'app-e-m-functional-error-widget',
  templateUrl: './e-m-functional-error-widget.component.html',
  styleUrl: './e-m-functional-error-widget.component.scss'
})
export class EMFunctionalErrorWidgetComponent implements OnInit, OnDestroy {

  constructor(
    private app_service: AppService,
    private service_data: AppDataService,
    public dataService : AppDataService,
    private cdRef: ChangeDetectorRef,
    private msgbox: MsgboxService 
  ){

  }
  datasourceProgressBar: Array<any> = []
  // datasourceProgressBar: Array<any> = [
  //   {  subActivityName:'Assertion Error', count:20 },
  //   {  subActivityName:'Assertion Error', count:25},
  //   { subActivityName:'Assertion Error', count:30 },
  //   {  subActivityName:'Assertion Error',count:35  },
  // ]

  view: any = null;
  @Input()Editable:boolean
  
   widgetType: string
   title:string
  
  @Input('child_data') set child_data({ view,title,widgetType }) {
    
   
   this.view = view
   this.title =title
   this.widgetType=widgetType
   }
  maxCount: number = 0;

  @Input() chartData: any;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(){
    if(this?.view?.viewId ){
      // this.datasourceProgressBar = [];
      this.getWidgetData();
      this.createChart();
      this.startDataReceiving();
    }
  }

  ngOnDestroy() {
      this.dataService.isEnablePersister = false
      this.disposeAllSubscriptions();
    }
   
    subscriptions: Subscription[] = [];
   
    disposeAllSubscriptions() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

  
  searchText  : any ;
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
   tempdatasourceProgressBar: any = []
    filterSearchResults(){
      this.datasourceProgressBar  = []
      this.datasourceProgressBar = this.tempdatasourceProgressBar.filter( (data)=>data?.subActivityName.toLowerCase().includes(this.searchText.toLowerCase()) )
      this.cdRef.detectChanges()
  
    }
  
  
  getWidgetData() {
      let ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getTopFunctionalErrorByFilter`;
      let form_data : any;
      if(this.widgetType=='USER BEHAVIOR'){
        form_data ={
          "timeSpanEnum":"LAST_7_DAYS",
          "appType":"ORACLEFUSION",
          "limitBy":50,
          "userId":this.service_data.UserDto.UserDTO.U_ID,
          "viewId": this?.view?.viewId,
          // "userId":"2170f924-6ab5-4d91-b9cf-232a27cd08dc",
          "offset":0
          }
      }
      else if(this.widgetType=='ERP'){
        form_data ={
          "timeSpanEnum":"LAST_7_DAYS",
          "appType":"ORACLEFUSION",
          "limitBy":50,
          "viewId": this?.view?.viewId,
          "offset":0
          }

      }
      
      this.app_service.make_post_server_call(ajax_url, form_data)
        .subscribe({
          next: (result: any) => {           
            if (result) {
  
              result = Object.fromEntries(Object.entries(result).slice(0, 10))
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
              val.dataPlotList = val.dataPlotList.map(item=>item.percentdiff)
              })
              
              this.cdRef.detectChanges();
            }

          },
          error: (error: any) => {
            console.error(error);
            this.msgbox.display_error_message(error);
          }
        });
    }



createChart(): void {
  this.chartOptions = {
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
    tooltip:{
      marker:{
      
        fillColors: ['#B42318'],
        
      }
    },
    
    stroke: {
      curve: "straight",
      width:2,
      colors: ['#B42318']
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

openAllFunctionalErrors(){
  if(this.widgetType=='USER BEHAVIOR')this.app_service.routeTo('environment','ubFunctionalError',`viewId=${this.view.viewId}`)
  else if(this.widgetType=='ERP')this.app_service.routeTo('environment','erpFunctionalError',`viewId=${this.view.viewId}`)
}

}
