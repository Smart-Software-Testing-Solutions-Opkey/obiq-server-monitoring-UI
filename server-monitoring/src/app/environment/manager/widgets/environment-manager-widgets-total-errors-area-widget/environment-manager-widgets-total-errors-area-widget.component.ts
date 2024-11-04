import { Component, ElementRef, Input, ViewChild } from "@angular/core";
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
export class EnvironmentManagerWidgetsTotalErrorsAreaWidgetComponent {
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


  ) {
    
  }
  dataSet = []
  bindChart(){
    debugger
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
          type: "vertical",
          shadeIntensity: 0.9,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: false,
       
        },
        colors:[this.chartColor,this.secColor,'#FFFFFF']
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
  secColor:string = ''

  view:any
  @Input('child_data') set child_data({ typeEnum,view }) {
    debugger
   this.typeEnum = typeEnum
   this.view = view
  
 

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
  getChartData(type){
   
      debugger;
    
  
      let ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
      this.app_service.make_post_server_call(ajax_url, { "timeSpanEnum": "LAST_7_DAYS", "viewId": this.view.viewId, "projectId": this.service_data.UserDto.ProjectDTO.P_ID, "logToSearch": "", "limitBy": 20, "offset": 0, "widgetType": type,"appType":"ORACLEFUSION" })
        .subscribe({
          next: (result: any) => {
            debugger;
            if(result){

              this.dataObj.total = result.count
              this.dataObj.percentage = result.percentdiff
              this.dataDir = result.direction
              this.dataSet = []
              if(result.dataPlotList.length>0){

                result.dataPlotList.forEach((ele,ind) => {
                  let obj = {
                    x:ind,
                    y:ele.percentdiff
                  }
                  this.dataSet.push(obj)
                });
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

            }

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
  @ViewChild('resizableDiv', { static: true }) resizableDiv: ElementRef<any>;
  ngAfterViewInit(): void {
    if (this.typeEnum == 'Error') {
      this.chartColor = '#B42318'
      this.secColor = '#FEF3F2'
      this.bindChartData('Error')
    }
    else if(this.typeEnum == 'Success'){
      this.chartColor = '#268144'
      this.secColor = '#F6FEFF'

      this.bindChartData('Success')
  
    }
    else if(this.typeEnum == 'Warning'){
      this.chartColor = '#FFBF00'
      this.secColor = '#FFF7DE'
      this.bindChartData('Warning')
  
    }
   
  }
  width = 0
  height = 0
  checkStyling() {
    debugger
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
}
