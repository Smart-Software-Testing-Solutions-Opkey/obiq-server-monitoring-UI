import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexLegend
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-environment-manager-widgets-health-bars',
  templateUrl: './environment-manager-widgets-health-bars.component.html',
  styleUrl: './environment-manager-widgets-health-bars.component.scss'
})
export class EnvironmentManagerWidgetsHealthBarsComponent  implements OnInit  {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public cpuUsage: number = Math.random() * 10;
  public ramUsage: number = Math.random() * 10;
  public overallHealth: string = "Good";
  constructor() {
 
}
ngOnInit(): void {
  this.CreateHealthChart()
}
  CreateHealthChart() {
    const data = Array.from({ length: 90 }, () =>
      Math.floor(Math.random() * 101)
    );
  
   
    const colors = data.map((value) => {
      if (value <= 59) return "#E00000"; // Red for errors (0-59)
      else if (value <= 79) return "#FFBF00"; // Yellow for warnings (60-79)
      else return "#268144"; // Green for success (80-100)
    });
  
    this.chartOptions = {
      series: [
        {
          name: "Uptime",
          data: Array(90).fill(100) 
        }
      ],
      chart: {
        type: "bar",
        height: 130, 
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
          columnWidth: "80%", 
          barHeight: "40%", 
          borderRadius: 3 
        }
      },
      xaxis: {
        labels: {
          show: false 
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        max: 100,
        show: false 
      },
      dataLabels: {
        enabled: false 
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (_, { dataPointIndex }) => `${data[dataPointIndex]}% uptime` 
        }
      },
      legend: {
        show: false, 
        showForSingleSeries: false,
        showForNullSeries: false,
        showForZeroSeries: false
      },
      colors: colors 
    };
    this.setOverallHealth();
  }
setOverallHealth() {
  const avgUsage = (this.cpuUsage + this.ramUsage) / 2;
  if (avgUsage < 30) {
    this.overallHealth = "Good";
  } else if (avgUsage < 60) {
    this.overallHealth = "Fair";
  } else {
    this.overallHealth = "Poor";
  }
}

}

