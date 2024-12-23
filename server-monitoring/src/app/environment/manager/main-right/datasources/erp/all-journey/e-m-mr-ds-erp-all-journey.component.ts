import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-e-m-mr-ds-erp-all-journey',
  templateUrl: './e-m-mr-ds-erp-all-journey.component.html',
  styleUrl: './e-m-mr-ds-erp-all-journey.component.scss'
})
export class EMMrDsErpAllJourneyComponent {
  constructor(  public app_service: AppService,
    private dataService:AppDataService){}

  ngOnInit(): void {
   
  }

  journeyDataSourceTemp: any[] = [];
  public pageSize = 20;
  journeyDataSource: GridDataResult;


  grid_load_more = false;
  getRecentSubActivityJourneyOfUser() {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/InsightWidgetController/getInsightWidgetData";

   

    let formData = {
      "appType": this.filterObj.modelApplication.toUpperCase(),
      "fromTimeInMillis": 1704047400000,
      "toTimeInMillis": 1734518432353,
      "modules": this.filterObj.modelStrModule?this.filterObj.modelStrModule:[],
      "process": this.filterObj.modelProcess?this.filterObj.modelProcess:[],
      "userNameList": this.filterObj.modelUser?this.filterObj.modelUser:[],
      "environments": this.filterObj.modelEnvironment?this.filterObj.modelEnvironment.map(ele=>ele.fullUrl):[],
      "browserList": this.filterObj.modelBrowserList?this.filterObj.modelBrowserList:[],
      "status": this.filterObj.modelStatus?this.filterObj.modelStatus.map(ele=>ele.value):[],
      "limitBy": this.pageSize,
      "offset": this.skip,
      "projectId": this.dataService?.UserDto?.ProjectDTO?.P_ID,
      "textToSearch": this.filterObj.modelSearch?this.filterObj.modelSearch:'',
      "widgetType": "GET_USERJOURNEY_LIST_WIDGET"
  }


    window.loadingStart("#alljourney", "Please wait");

    this.app_service.make_post_server_call(form_url, formData).subscribe(
      (result: any) => {
        this.journeyDataSourceTemp = [...this.journeyDataSourceTemp, ...result];

        this.grid_load_more = result.length >= this.pageSize;
        this.loadItems();
    
        window.loadingStop("#alljourney");

      },
      (error) => {
        window.loadingStop("#alljourney");
       
        this.loadItems()
        console.warn(error);

      }
    );
  }
  private loadItems(): void {
    this.journeyDataSource = {
      data: this.journeyDataSourceTemp,
      total: this.journeyDataSourceTemp.length,
    };
  }
  public skip = 0;
  load_more() {
    if (!this.grid_load_more) { return; }
    this.skip += this.pageSize;
    this.getRecentSubActivityJourneyOfUser()
  }
  openInNewTab(){
    
  }
  backtomenu(){
    this.app_service.routeTo('environment','summary')
  }
  filterObj:any = {}
  filterChanged(val){
    this.filterObj = val
    this.getRecentSubActivityJourneyOfUser()
  }
}
