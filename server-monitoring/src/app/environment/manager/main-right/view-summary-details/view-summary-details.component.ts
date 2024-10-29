import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-view-summary-details',
  templateUrl: './view-summary-details.component.html',
  styleUrl: './view-summary-details.component.scss'
})
export class ViewSummaryDetailsComponent implements OnInit ,AfterViewInit {
  constructor(
    public app_service: AppService,
    public dataService: AppDataService,
    private service_data: AppDataService) {
  }
  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    debugger
    this.obj_configuration_setting = obj_configuration_setting;
  }
  @Input() Settings_View_Selection:any
ngOnInit(): void {
  
}
ngOnChanges(changes: SimpleChanges) {
  if (changes['Settings_View_Selection'] && changes['Settings_View_Selection'].currentValue) {
    debugger
    this.get_All_Summary_of_Selected_View(this.Settings_View_Selection)
  }
}
get_All_Summary_of_Selected_View(view)
{
  debugger;
  //https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceLinkedServiceList
  let form_url = "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceLinkedServiceList";

  let form_data = {"viewId":view.viewId};

  this.app_service.make_post_server_call(form_url, form_data)
    .subscribe({
      next: (result: any) => {
        window.loadingStop("#div-datasource-slection");
        this.obj_configuration_setting.selected_erp_analytics = result;
        this.obj_configuration_setting.selected_view = view;
        this.obj_configuration_setting = JSON.parse(JSON.stringify(this.obj_configuration_setting))
      },
      error: (error: any) => {
        window.loadingStop("#div-datasource-slection");
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
}
ngAfterViewInit(): void {
  this.Settings_View_Selection

}


}
