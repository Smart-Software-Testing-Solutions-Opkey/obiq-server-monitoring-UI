
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
    debugger
   this.title = title
   this.data = parseFloat(data) || 0;
   this.view = view;
   this.widgetType = widgetType;
  }
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.get_Redis_Cpu_Usage(this.view,this.widgetType)
  
  }
  ngAfterViewInit(): void {
    
  }
  get_Redis_Cpu_Usage(view,widgetType){
    debugger;
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";

    let form_data = { viewId: view.viewId,projectId:this.dataService.UserDto.ProjectDTO.P_ID,widgetType:widgetType };

    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
        window.loadingStop("#Env_manager_main_right");
        this.gaugeChart(result.percent)
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
  gaugeChart(percent) {
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
                        color: "#268144", 
                        fontSize: "22px",
                        show: true
                    }
                }
            }
        },
        fill: {
            colors: ["#268144"],  
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
