import { Component, ViewChild } from "@angular/core";

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
  errorObj = {
    totalerrors : 4,
    errorPercentage:90,
    interval:'Last day'
  }
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "",
          data: [
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
        }
      ],
      chart: {
        height:111,
        width:180,
        type: "area",
        toolbar:{
          show:false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
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
        opacity: 0.5,
        type: 'gradient',
        gradient: {
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
       
        },
        colors:['#F44336', '#E91E63', '#9C27B0']
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
}
