
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";
import { environment } from "src/environments/environment";
import { Subscription } from "rxjs";
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
@Component({
  selector: 'app-environment-manager-widgets-gauge-meter',
  templateUrl: './environment-manager-widgets-gauge-meter.component.html',
  styleUrl: './environment-manager-widgets-gauge-meter.component.scss'
})

export class EnvironmentManagerWidgetsGaugeMeterComponent implements OnInit,OnDestroy,AfterViewInit {
  constructor(    
    public dataService: AppDataService,
     public app_service: AppService,
  ) { }
  title:string = ''
  public data: number = 0;
  view:any;
  widgetType:any;
  @Input('child_data') set child_data({ title,data,view,widgetType}) {
    
   this.title = title
   this.data = parseFloat(data) || 0;
   this.view = view;
   this.widgetType = widgetType;
  }
  @Input() Editable:boolean
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
      if(data?.type == "getDataWithTime"){
        this.get_Redis_Cpu_Usage(this.view, this.widgetType, data?.timeFilter)
      }
    }))
    this.get_Redis_Cpu_Usage(this.view,this.widgetType)
  
  }
  ngAfterViewInit(): void {
    
  }
  get_Redis_Cpu_Usage(view,widgetType, timeFilter?: any){
    
    window.loadingStart("#gauge-div-" + widgetType, "Please wait");
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";

    let form_data = { viewId: view.viewId,projectId:this.dataService.UserDto.ProjectDTO.P_ID,widgetType:widgetType };
    if(timeFilter?.type == 'setEnum'){
      form_data["timeSpanEnum"] = timeFilter?.value;
     } else if(timeFilter?.type == "setCustom"){
      form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
      form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
    }
    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
      
        this.gaugeChart(result.percent)
       window.loadingStop("#gauge-div-"+widgetType);
      },
      error: (error: any) => {
       window.loadingStop("#gauge-div-"+widgetType);
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  gaugeChart(percent) {
    const color = percent > 75 ? "#B42318" : percent > 50 ? "#FFBF00" : "#268144"; 
    this.chartOptions = {
        series: [percent],
        chart: {
            height: 200,
            type: "radialBar",
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    margin: 0,
                    size: "70%",  
                    background: "transparent"
                },
                track: {
                    background: "#e0e0e0",  
                    strokeWidth: "100%",
                    margin: 0
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: false  
                    },
                    value: {
                        offsetY: 5,
                        formatter: function (val) {
                            return parseFloat(val.toString()).toFixed(2) + "%";
                        },
                        color: color, 
                        fontSize: "22px",
                        show: true
                    }
                }
            }
        },
        fill: {
            colors: [color],  
            type: "solid"  
        },
        stroke: {
            lineCap: "butt",  
            width: 10  
        },
        labels: [""]  
    };
    
}




 
}
