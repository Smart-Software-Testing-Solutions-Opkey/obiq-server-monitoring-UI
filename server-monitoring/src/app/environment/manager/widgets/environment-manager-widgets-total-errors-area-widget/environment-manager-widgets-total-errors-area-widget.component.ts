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

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "",
          data: [
            {
              x: 1996,
              y: 162
            },
            {
              x: 1997,
              y: 90
            },
            {
              x: 1998,
              y: 50
            },
            {
              x: 1999,
              y: 77
            },
            {
              x: 2000,
              y: 35
            },
           
          ]
        }
      ],
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false
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
        text: "",
        align: "left",
        style: {
          fontSize: "14px",
        },
        
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
          style: {
            colors: "red"
          },
          offsetY: -7,
          offsetX: 0,
          show:false
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
        colors:['red']
      },
      tooltip: {
        x: {
          format: "yyyy"
        },
        fixed: {
          enabled: false,
          position: "topRight"
        },
        enabled:false
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      }
    };
  }
  errorObj = {
    totalerrors : 4,
    errorPercentage:90,
    interval:'Last day'
  }

}
