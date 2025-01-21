import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-journey-grid',
  templateUrl: './journey-grid.component.html',
  styleUrl: './journey-grid.component.scss'
})
export class JourneyGridComponent implements OnInit {

  constructor(
    public app_service: AppService
  ) { }

  calsource = null;
  selectedData = null;
  noDataMsg: string = "Please wait fetching data...";
  @Input('child_data') set child_data({ selectedData }) {
    
    this.selectedData = selectedData
  }

  ngOnInit() {

    this.get_getInsightWidgetData()
  }


  datasource_grid_journey = [];

  get_getInsightWidgetData() {
    window.loadingStart("#div-journey", "Please wait");
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData";
    let form_data = {
      appType: this.selectedData.appType,
      essLogId: this.selectedData.dataId,
      logToSearch: "",
      limitBy: 20,
      offset: 0,
      widgetType: "ESS_LOG_JOURNEY_LIST_WIDGET"
    }

    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          window.loadingStop("#div-journey");
          this.journey_state(result);
        },
        error: (error: any) => {
          window.loadingStop("#div-journey");
          console.warn(error);
        },
        complete: () => {
          window.loadingStop("#div-journey");
          console.log("Completed");
        }
      });

  }


  journey_state(result) {
    if (result.length == 1) {
      this.obj_selected_journey.datasource = result[0];
      this.obj_selected_journey.isDisplay_main = false;
      this.calsource = 'single_journey';
    } else {
      this.datasource_grid_journey = result;
      this.obj_selected_journey.isDisplay_main = true;
      this.calsource = 'multiple_journey';
      this.noDataMsg = "No Journey available";
    }

  }

  obj_selected_journey = {
    datasource: [],
    isDisplay_main: true
  }

  onSelectionChange(e) {
    
    let dataItem = e.dataItem;
    this.obj_selected_journey.datasource = dataItem;
    this.obj_selected_journey.isDisplay_main = false;
  }

}
