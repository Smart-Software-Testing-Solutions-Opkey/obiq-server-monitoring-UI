import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-environment-manager-widgets-progress-bars',
  templateUrl: './environment-manager-widgets-progress-bars.component.html',
  styleUrl: './environment-manager-widgets-progress-bars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvironmentManagerWidgetsProgressBarsComponent implements OnInit {

  constructor(
    private app_service: AppService,
    private service_data: AppDataService,
    private cdRef: ChangeDetectorRef
  ){

  }
  datasourceProgressBar: Array<any> = [
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    // { Name: "GuideName01", passpercent: 30, failpercent: 70 },
  ]

  @Input() view: any = null;
  @Input() widgetData: any = null;
  maxCount: number = 0;

  ngOnInit(){
    if(this?.view?.viewId && this?.widgetData?.widgetType){
      this.datasourceProgressBar = [];
      this.getWidgetData()
    }
  }

  getWidgetData(){
    let ajax_url = environment.BASE_OBIQ_SERVER_URL + `OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi//ServerInsightWidgetrController/getInsightWidgetData`;
    const form_data = {
      "appType": "ORACLEFUSION",
      "viewId": this?.view?.viewId,
      // "projectId": this?.service_data?.UserDto?.ProjectDTO?.P_ID,
      "widgetType": this.widgetData?.widgetType,
    };
   
    this.app_service.make_post_server_call(ajax_url, form_data)
      .subscribe({
        next: (result: any) => {
         if(result){
          if(this?.widgetData?.widgetType == "USER_GUIDE_LIST_PER_PROCESS_WIDGET" && typeof result == 'object'){
            this.maxCount = Math.max(...Object.values(result).map((item: any) => item.count));
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
            else 
             if ((this?.widgetData?.widgetType == "USER_JOURNEY_TOP_SLOW_WIDGET" || this?.widgetData?.widgetType == "USER_JOURNEY_TOP_FAST_WIDGET") && typeof result == 'object') {
             { debugger;
              this.datasourceProgressBar = result.slice(0, 5).map((item: any) => {
                if(this?.widgetData?.widgetType == "USER_JOURNEY_TOP_SLOW_WIDGET"){}
                const calculatedTime = this.calculateDuration(item.journeyFromTimeInMillis, item.journeyToTimeInMillis);
                return {
                  ...item,
                  calculatedTime 
                };
              });
            } 
            
          }
          this.cdRef.detectChanges();
        }
        else{
          this.datasourceProgressBar = result.slice(0, 5);
        }
      },
        error: (error: any) => {
          // window.loadingStop("#Env_manager_main_right");
          console.error(error);
        }
      });
  }
  calculateDuration(from: number, to: number): string {
    debugger;
    const durationMillis = from - to;

    
    if (durationMillis < 1000) {
        return `${durationMillis} ms`;
    }

    
    const durationSeconds = Math.floor(durationMillis / 1000);
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;

    return `${minutes}m ${seconds}s`;
}
}
