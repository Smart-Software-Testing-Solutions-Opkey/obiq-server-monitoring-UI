import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";
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
};

@Component({
  selector: 'app-e-m-mr-ds-erp-o-v-f-p',
  templateUrl: './e-m-mr-ds-erp-o-v-f-p.component.html',
  styleUrl: './e-m-mr-ds-erp-o-v-f-p.component.scss'
})
export class EMMrDsErpOVFPComponent {
constructor(
    public activeModal: NgbActiveModal,
      private router: Router,
      private route: ActivatedRoute,
      public service_data: AppDataService,
      public app_service: AppService,
      private cdr: ChangeDetectorRef,
      private msgbox: MsgboxService 
){

}
  selectedData: any
  dataKeys: any = []
  dataValues: any = []
  receivedTimeRange: any
  maxCount: number = 0;
  datasourceProgressBar: Array<any> = [
  ]
  public chartOptions: Partial<ChartOptions>;
  widgetType: any;
  view : any;

  @Input('child_data') set child_data({ selectedData }) {
    
    this.selectedData = selectedData
    this.view = selectedData.view
    this.widgetType = selectedData.widgetType
    this.dataKeys = Object.keys(this.selectedData)
    this.dataValues = Object.values(this.selectedData);
    console.log(this.selectedData, "this is selected Data in Log tab details main right")

  }

  ngOnInit(): void {
    if(this?.view?.viewId ){
      this.datasourceProgressBar = [];
      this.getWidgetData()
      this.createChart();
    }
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        if(data.callsource == 'timeExplorerChart'){
          this.receivedTimeRange = data.data;
          // Manually trigger change detection
          this.cdr.detectChanges();
        }
      }
    });
    this.subscriptions.push(data_receiver);
    
  }


  getWidgetData(){
        window.loadingStart("#user-guides-"+this.widgetType, "Please wait");
        let ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData`;
        const form_data = {
          "appType": "ORACLEFUSION",
          "viewId": this?.view?.viewId,
          "widgetType": this.widgetType,
        };
       
        this.app_service.make_post_server_call(ajax_url, form_data)
          .subscribe({
            next: (result: any) => {
             if(result){
              if( typeof result == 'object'){
                this.maxCount = Math.max(...Object.values(result).map((item: any) => item.count));
  
                // result = Object.fromEntries(Object.entries(result).slice(0, 5))
                this.datasourceProgressBar = Object.keys(result).map(item => {
                  const count = result[item].count;
                  const passPercent = (count / this.maxCount) * 100;
                  const failPercent = 100 - passPercent;
                  return {
                    subActivityName: item, 
                    passPercent: passPercent, 
                    failPercent: failPercent,
                    count:count
                  };
                })
            
              }
              window.loadingStop("#user-guides-"+this.widgetType);
              this.cdr.detectChanges();
            }
           
          },
            error: (error: any) => {
              window.loadingStop("#user-guides-"+this.widgetType);
              console.error(error);
              this.msgbox.display_error_message(error);
            }
          });
      }

      
  createChart(): void {
    this.chartOptions = {
      series: [
        {
          data: [10, 41, 35, 51]
        }
      ],
      chart: {
        height: 35,
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
      
      stroke: {
        curve: "straight",
        width:2
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
    ngOnDestroy() {
      this.service_data.isEnablePersister = false
      this.disposeAllSubscriptions();
    }
   
    subscriptions: Subscription[] = [];
   
    disposeAllSubscriptions() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    
    
}
