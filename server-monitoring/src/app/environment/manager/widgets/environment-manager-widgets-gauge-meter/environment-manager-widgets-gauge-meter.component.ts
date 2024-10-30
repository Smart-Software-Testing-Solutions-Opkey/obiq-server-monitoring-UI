
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
  @Input('child_data') set child_data({ title,data }) {
    debugger
   this.title = title
   this.data = parseFloat(data) || 0;
  }
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.gaugeChart()
  }
  ngAfterViewInit(): void {
    
  }
  gaugeChart(){
    this.chartOptions = {
      series: [this.data], // Adjust this value to set the percentage
      chart: {
        height: 350,
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
            background: "#e7e7e7",
            strokeWidth: "100%",
            margin: 0 // Removes extra space around the track
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "16px"
            },
            value: {
              offsetY: 5,
              formatter: function (val) {
                return parseFloat(val.toString()).toFixed(2) + "%";
              },
              color: "#111",
              fontSize: "22px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#00E396"], // Progress bar color
          inverseColors: false,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: "#00E396",
              opacity: 1
            }
          ]
        }
      },
      stroke: {
        lineCap: "butt", // Makes the ends of the gauge round
        colors: ["#00E396"]
      },
      labels: ["Progress"]
    };
  
  }
 
}
