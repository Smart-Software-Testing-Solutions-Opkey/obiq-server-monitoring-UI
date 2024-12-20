import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-e-m-mr-ds-erp-all-journey',
  templateUrl: './e-m-mr-ds-erp-all-journey.component.html',
  styleUrl: './e-m-mr-ds-erp-all-journey.component.scss'
})
export class EMMrDsErpAllJourneyComponent {
  constructor(  public app_service: AppService,){}

  ngOnInit(): void {
    this.getRecentSubActivityJourneyOfUser()
  }

  journeyDataSourceTemp: any[] = [];
  public pageSize = 20;
  journeyDataSource: GridDataResult;


  grid_load_more = false;
  getRecentSubActivityJourneyOfUser() {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/InsightWidgetController/getInsightWidgetData";

   

    let formData = {
      "appType": "ORACLEFUSION",
      "fromTimeInMillis": 1704047400000,
      "toTimeInMillis": 1734518432353,
      "modules": [],
      "process": [],
      "userNameList": [],
      "environments": [],
      "browserList": [],
      "status": [],
      "limitBy": this.pageSize,
      "offset": 0,
      "projectId": "3f0e8a1d-f215-4f3e-90bc-b52911482520",
      "textToSearch": "",
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
}
