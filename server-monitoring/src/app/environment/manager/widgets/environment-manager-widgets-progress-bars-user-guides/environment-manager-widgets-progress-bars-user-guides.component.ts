import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
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
import { ManagerRightPanelComponent } from '../../right-panel/manager-right-panel.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

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
  selector: 'app-environment-manager-widgets-progress-bars-user-guides',
  templateUrl: './environment-manager-widgets-progress-bars-user-guides.component.html',
  styleUrl: './environment-manager-widgets-progress-bars-user-guides.component.scss'
})
export class EnvironmentManagerWidgetsProgressBarsUserGuidesComponent implements OnDestroy{
  constructor(
      private app_service: AppService,
      private service_data: AppDataService,
      public dataService: AppDataService,
      private cdRef: ChangeDetectorRef,
      private modalService: NgbModal,
    ){
  
    }
    datasourceProgressBar: Array<any> = [
    ]
    view: any = null;
    title: any = null;
    widgetType: any ="USER_GUIDE_LIST_PER_PROCESS_WIDGET";
    @Input('child_data') set child_data({view,title}) {
     this.view = view;
     this.title=title;
    }
    @Input() Editable:boolean
  
    maxCount: number = 0;
  
    @Input() chartData: any;
    public chartOptions: Partial<ChartOptions>;
  
    ngOnInit(){
     
      if(this?.view?.viewId ){
        this.datasourceProgressBar = [];
        this.getWidgetData()
        this.createChart();
      }
      this.startDataReceiving();
    }

ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
 
  subscriptions: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

    isRefresh: boolean = false;
    searchText : any = [];
  startDataReceiving(){
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        if (data.callsource == 'OVERVIEW_TAB'){
          if( data.action == 'refresh'){
            this.getWidgetData()
          }
          else if (data.action == 'search'){
            this.searchText = data.data;
            this.filterSearchResults()
          }
        }
      }
    });
    this.subscriptions.push(data_receiver);
  }
  tempdatasourceProgressBar : any;
  filterSearchResults(){
    this.datasourceProgressBar= []
    this.datasourceProgressBar = this.tempdatasourceProgressBar.filter( (data)=>data?.subActivityName.toLowerCase().includes(this.searchText.toLowerCase())  || data?.calculatedTime.toLowerCase().includes(this.searchText.toLowerCase()))
    this.cdRef.detectChanges()
  }
  // refreshPage(){
  //   if(this.isRefresh == true){
  //     this.getWidgetData();
  //   }
  
  // }
  
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
            console.log("result -------------",result);
            if( typeof result == 'object'){
              this.maxCount = Math.max(...Object.values(result).map((item: any) => item.count));

              result = Object.fromEntries(Object.entries(result).slice(0, 5))
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
              this.tempdatasourceProgressBar = this.datasourceProgressBar
            }
            window.loadingStop("#user-guides-"+this.widgetType);
            this.cdRef.detectChanges();
          }
         
        },
          error: (error: any) => {
            window.loadingStop("#user-guides-"+this.widgetType);
            console.error(error);
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
  
onViewAllProcess(event: Event): void {
  event.preventDefault();
  console.log('View All Process clicked');
   const modalRef = this.modalService.open(ManagerRightPanelComponent, {
     backdrop: 'static',
     keyboard: false,
     size: 'full',
     centered: true,
     windowClass: 'layout-modal-right panel-end w-75'
   });
   modalRef.result.then((result) => {
   }, (response) => {
     if (response == 'close modal') {
       return;
     }
   });
   modalRef.componentInstance.selectedItem = { callsource: 'Erp_View_All_process_', data: "ErpViewAllProcess" };
 
}
}
