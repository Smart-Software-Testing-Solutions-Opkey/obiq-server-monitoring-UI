import { Component, ElementRef, Input, ViewChild } from "@angular/core";

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
  dataObj = {
    totalerrors : 4,
    errorPercentage:90,
    interval:'Last day'
  }
  constructor() {
    
  }
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
        height:111,
        width:this.width,
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
  @Input('child_data') set child_data({ typeEnum }) {
    debugger
   this.typeEnum = typeEnum
  
 

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
    }
  }
  @ViewChild('resizableDiv', { static: true }) resizableDiv: ElementRef<any>;
  ngAfterViewInit(): void {
    if (this.typeEnum == 'Error') {
      this.chartColor = '#B42318'
      this.bindChartData('Error')
    }
    else if(this.typeEnum == 'Success'){
      this.chartColor = '#268144'
      this.bindChartData('Success')
  
    }
    else if(this.typeEnum == 'Warning'){
      this.chartColor = '#FFBF00'
      this.bindChartData('Warning')
  
    }
    this.checkStyling();
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
