import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { environment } from 'src/environments/environment';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexFill,
  ApexGrid
} from "ng-apexcharts";
import { AppDataService } from "src/app/services/app-data.service";
import { AppService } from "src/app/services/app.service";
import { Subscription } from "rxjs";
import { MsgboxService } from 'src/app/services/msgbox.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};


@Component({
  selector: 'app-environment-manager-widgets-total-errors-area-widget',
  templateUrl: './environment-manager-widgets-total-errors-area-widget.component.html',
  styleUrl: './environment-manager-widgets-total-errors-area-widget.component.scss'
})
export class EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  dataObj = {
    total : 0,
    percentage:0,
    msg:'Last day'
  }
  constructor(
    public service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    private msgbox: MsgboxService 
    
  ) {
    
  }
@Input()Editable:boolean = false
widgetType=''
  ngOnInit(){
    // this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
    //   if(data?.type == "getDataWithTime"){
    //     this.getChartData('ESS_LOG_ERROR_WIDGET', data?.timeFilter)
    //   }
    // }))
    this.startDataReceiving();
    
  }

  ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
 
  subscriptions1: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions1.forEach((subscription) => subscription.unsubscribe());
  }

  isRefresh: boolean = false;
  startDataReceiving(){
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
         if (data.callsource == 'OVERVIEW_TAB'){
          if( data.action == 'refresh'){
            if(this.typeEnum == 'Error'){
              this.getChartData('ESS_LOG_ERROR_WIDGET');
            }
            else if(this.typeEnum == 'Warning'){
              this.getChartData('ESS_LOG_WARNING_WIDGET')
            }
            else if(this.typeEnum == 'Success'){
              this.getChartData('ESS_LOG_SUCESS_WIDGET');
            }
          }
        }
      } 
    });
    this.subscriptions1.push(data_receiver);
  }
  // refreshPage(){
  //   if(this.isRefresh == true){
  //     if(this.typeEnum == 'Error'){
  //       this.getChartData('ESS_LOG_ERROR_WIDGET');
  //     }
  //     else if(this.typeEnum == 'Warning'){
  //       this.getChartData('ESS_LOG_WARNING_WIDGET')
  //     }
  //     else if(this.typeEnum == 'Success'){
  //       this.getChartData('ESS_LOG_SUCESS_WIDGET');
  //     }
  //   }
  
  // }

  subscriptions: Subscription[] = [];
  dataSet = []
  
  bindChart(){
    
    this.chartOptions = {
      series: [
        {
          name: "",
          data: this.dataSet
        }
      ],
      chart: {
        height:this.height,
        width:this.width,
        type: "area",
        toolbar:{
          show:false
        },
        sparkline: {
          enabled: true
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
        width:2
      },

      title: {
        text: "Area with Negative Values",
        align: "left",
        style: {
          fontSize: "14px"
        }
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 4,
        floating: false,

        labels: {
          show:false,
        
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      fill: {
        opacity: 0.8,
        type: 'gradient',
        gradient: {
          shade:'light',
          type: "vertical",
          shadeIntensity: 0.9,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: this.inverseColors,
       
        },
        colors:[this.chartColor]
      },
      tooltip: {
        enabled:false,
      },
      grid: {
        show:false,
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };
  }
  typeEnum:string = ''
  chartColor:string = ''
  inverseColors = false
  view:any
  title = ''
  obj_filter: any;
  selectedAnalyticsType: any ='';
  @Input('child_data') set child_data({ typeEnum,view,title,widgetType ,obj_filter,selectedAnalyticsType}) {
    
   this.typeEnum = typeEnum
   this.view = view
  this.title =title
  this.widgetType = widgetType
  this.obj_filter = obj_filter
  if(selectedAnalyticsType){
    this.selectedAnalyticsType = selectedAnalyticsType;
  }
  if(this.typeEnum == 'Error'){
    this.getChartData('ESS_LOG_ERROR_WIDGET',this.obj_filter);
  }
  else if(this.typeEnum == 'Warning'){
    this.getChartData('ESS_LOG_WARNING_WIDGET',this.obj_filter)
  }
  else if(this.typeEnum == 'Success'){
    this.getChartData('ESS_LOG_SUCESS_WIDGET',this.obj_filter);
  }
  

  }

  bindChartData(type){
    if(type == 'Error'){
      this.dataSet =  [
        {
          x: 1996,
          y: 500
        },
        {
          x: 1997,
          y: 300
        },
        {
          x: 1998,
          y: 400
        },
        {
          x: 1999,
          y: 200
        },
       
      ]
      this.getChartData('ESS_LOG_ERROR_WIDGET')

    }
    else if(type == 'Success'){
      this.dataSet =  [
        {
          x: 1996,
          y: 200
        },
        {
          x: 1997,
          y: 300
        },
        {
          x: 1998,
          y: 100
        },
        {
          x: 1999,
          y: 500
        },
       
      ]

     this.getChartData('ESS_LOG_SUCESS_WIDGET')

    }
    else if(type == 'Warning'){
      this.dataSet =  [
        {
          x: 1996,
          y: 500
        },
        {
          x: 1997,
          y: 400
        },
        {
          x: 1998,
          y: 400
        },
        {
          x: 1999,
          y: 500
        },
       
      ]
      this.getChartData('ESS_LOG_WARNING_WIDGET')
    }
    
  }
dataDir = ''
  getChartData(type, timeFilter?: any){

    let ajax_url : any;
    let form_data : any ;
    form_data = { 
      "timeSpanEnum": "LAST_7_DAYS" , 
      "appType": "ORACLEFUSION", 
      "limitBy": 50,
      "offset": 0, 
      "viewId": this?.view?.viewId,
      "projectId":this.service_data.UserDto.ProjectDTO.P_ID
    }
    
    if(this.widgetType == 'ERP'){
      // ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
      // form_data = { "timeSpanEnum": "LAST_7_DAYS", "viewId": this.view.viewId, "projectId": this.service_data.UserDto.ProjectDTO.P_ID, "logToSearch": "", "limitBy": 20, "offset": 0, "widgetType": type,"appType":"ORACLEFUSION" };
      if(type == "ESS_LOG_ERROR_WIDGET"){
        ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ServerSideLogController/sendEssLogsUsageErrorCount";
      }
      else if(type == 'ESS_LOG_WARNING_WIDGET'){
        ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ServerSideLogController/sendEssLogsUsageWarningCount";

      }
      else{
        ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ServerSideLogController/sendEssLogsUsageSuccessCount";
      }
      
    }

    if( this.widgetType == 'userBehaviour'){
          ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ErrorDataAnalyticController/getAllTotalErrorByFilter";
          form_data["userId"] = this.service_data.UserDto.UserDTO.U_ID
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
      window.loadingStart("#stats-div-"+this.typeEnum+this.widgetType+this.selectedAnalyticsType, "Please wait");
      this.app_service.make_post_server_call(ajax_url,form_data)
        .subscribe({
          next: (result: any) => {
            
            if(result){
              if(type == "ESS_LOG_ERROR_WIDGET"){
               
                this.dataObj.total = result.count
                this.dataDir = result.percentdiff < 0 ? 'up' : 'down';
                this.dataObj.percentage =Math.abs(result.percentdiff) 
               // this.dataDir = result.direction
              }
              else if(type == 'ESS_LOG_WARNING_WIDGET'){
                this.dataObj.total = result.count
                this.dataDir = result.percentdiff < 0 ? 'up' : 'down';
                this.dataObj.percentage =Math.abs(result.percentdiff) 
              }
              else{
                this.dataObj.total = result.count
                this.dataDir = result.percentdiff > 0 ? 'up' : 'down';
                this.dataObj.percentage =Math.abs(result.percentdiff) 
              }
           
              this.dataSet = []
              if(result?.dataPlotList?.length>0){
                let totalVal = 0
                result.dataPlotList.forEach((ele,ind) => {
                  totalVal += ele.percentdiff
                  let obj = {
                    x:ind+1,
                    y:ele.percentdiff
                  }
                  this.dataSet.push(obj)
                });
                if(totalVal/result.dataPlotList.length < 0){
                  this.inverseColors = true
                }else{
                  this.inverseColors = false
                }
              }else{
            
                  this.dataSet =  [
                    {
                      x: 1,
                      y: 0
                    },
                    {
                      x: 2,
                      y: 0
                    },
                    {
                      x: 3,
                      y: 0
                    },
                   
                  ]
                
              }

              this.checkStyling();
              this.bind_chart();
              this.bindChart();
              window.loadingStop("#stats-div-"+this.typeEnum+this.widgetType+this.selectedAnalyticsType);

            }

          },
          error: (error: any) => {
            window.loadingStop("#stats-div-"+this.typeEnum+this.widgetType+this.selectedAnalyticsType);
            this.msgbox.display_error_message(error);
            console.warn(error);
          },
          complete: () => {
            console.log("Completed");
          }
        });
    
  }
  @ViewChild('resizableDiv', { static: true }) resizableDiv: ElementRef<any>;
  ngAfterViewInit(): void {
 
   
  }
  bind_chart(){
    if (this.typeEnum == 'Error') {
      this.chartColor = '#B42318'
     
      // this.bindChartData('Error')
    }
    else if(this.typeEnum == 'Success'){
      this.chartColor = '#268144'
   

      // this.bindChartData('Success')
  
    }
    else if(this.typeEnum == 'Warning'){
      this.chartColor = '#FFBF00'
   
      // this.bindChartData('Warning')
  
    }
  }
  width = 0
  height = 0
  checkStyling() {
    let ele = this.resizableDiv.nativeElement;
    let width = ele.getBoundingClientRect().width;
    if (width) {
      this.width = width;
      this.height = ele.getBoundingClientRect().height;
   
      this.bindChart()
    
    
    }
    if (!this.width) {
      setTimeout(() => {
        this.checkStyling();
      }, 10);
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
