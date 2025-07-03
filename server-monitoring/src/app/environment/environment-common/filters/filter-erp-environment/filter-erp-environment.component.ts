import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-erp-environment',
  templateUrl: './filter-erp-environment.component.html',
  styleUrl: './filter-erp-environment.component.scss',
  changeDetection:ChangeDetectionStrategy.Default
})
export class FilterErpEnvironmentComponent implements OnInit {
  constructor(
    public app_service: AppService,
    private msgbox: MsgboxService 
  ) {
  }

  selectedEnvironment: any = []
 
  appType : any= "OracleFusion";
  @Input('child_data') set child_data({ selectedEnvironment , appType}) {
    if(selectedEnvironment){
      this.selectedEnvironment = JSON.parse(JSON.stringify(selectedEnvironment))
    
    }
    if(appType){
      this.appType = JSON.parse(JSON.stringify(appType)) ;
    }
    this.get_application();
  }

  filterEnvironments: any = []
  tempfilterEnvironments = []
  
  onSelectedEnvironmentChange = output<any>();
  search_filter: string = '';

  obj_env = {}
  


  ngOnInit(): void {
   
  }

  get_application() {
    var ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/UserJourneyController/getEnvironmentNamesByApplication";
    let formData = { appType: this.appType.toUpperCase() }
    this.app_service.make_post_server_call(ajax_url, formData)
      .subscribe({
        next: (result: any) => {
          if (result && result.length) {
            console.log("-----result", JSON.stringify(result))
            this.filterEnvironments = result;
            this.tempfilterEnvironments = result;
            this.filterEnvironments.forEach(val => {
              this.obj_env[val.envName] = val;
            })

            this.selectedEnvironment = JSON.parse(JSON.stringify(this.selectedEnvironment))
          }
        },
        error: (error: any) => {
          this.msgbox.display_error_message(error);
          console.warn(error);
        }
      });
  }

  clear_search() {
    this.search_filter = '';

  }

 
  
  select_Environment(e, item,ind) {
    if (e.target.checked) {
      this.selectedEnvironment.push(item); 
    }
    else {
      
     this.selectedEnvironment = this.selectedEnvironment.filter(ele=>ele.envName != item.envName)
    }
    
    
    this.onSelectedEnvironmentChange.emit(this.selectedEnvironment);

    
  }

  clear_filter() {
    this.selectedEnvironment = [];
  
   
    this.onSelectedEnvironmentChange.emit(this.selectedEnvironment);

    
  }
  showSelected(item){
    return this.selectedEnvironment.findIndex((ele)=>ele.envName == item.envName) > -1
  }
 
}
