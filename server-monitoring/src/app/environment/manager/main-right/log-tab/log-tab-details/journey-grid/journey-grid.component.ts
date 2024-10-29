import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-journey-grid',
  templateUrl: './journey-grid.component.html',
  styleUrl: './journey-grid.component.scss'
})
export class JourneyGridComponent implements OnInit {

  constructor(
    public app_service: AppService
  ) { }

  selectedData = null;
  @Input('child_data') set child_data({ selectedData }) {
    debugger
    this.selectedData = selectedData
  }

  ngOnInit() {
    
    this.get_getInsightWidgetData()
  }


  datasource_grid_journey = [];

  get_getInsightWidgetData() {

    //let form_url = environment.BASE_OPKEY_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    let form_url = "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    let form_data = {
      appType: this.selectedData.appType,
      essLogId: this.selectedData.dataId,
      logToSearch:"",
      limitBy:20,
      offset:0,
      widgetType:"ESS_LOG_JOURNEY_LIST_WIDGET"
  }

    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          this.datasource_grid_journey = result;
        },
        error: (error: any) => {
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });

  }


  obj_selected_journey = {
    datasource: [],
    isDisplay_main: true 
  }

  onSelectionChange(e){
    debugger
   let dataItem = e.dataItem;
   this.obj_selected_journey.datasource = dataItem;
   this.obj_selected_journey.isDisplay_main = false;
  }

}
