import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
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
  ) {
  }

  selectedEnvironment: any = []
  tempSelected = []
  appType : any= "OracleFusion";
  @Input('child_data') set child_data({ selectedEnvironment , appType}) {
    if(selectedEnvironment){
      this.tempSelected = JSON.parse(JSON.stringify(selectedEnvironment))
    
    }
    if(appType){
      this.appType = JSON.parse(JSON.stringify(appType)) ;
    }
  }

  filterEnvironments: any = []
  tempfilterEnvironments = []
  
  onSelectedEnvironmentChange = output<any>();
  search_filter: string = '';
  selectedCheckboxes: any = {};
  obj_env = {}
  


  ngOnInit(): void {
    this.get_application();
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

            if(this.tempSelected.length>0){
              this.selectedEnvironment = this.tempSelected
              this.selectedEnvironment.forEach(item => {
                this.selectedCheckboxes[item.envName] = true;
              });
            }
          }
        },
        error: (error: any) => {
          console.warn(error);
        }
      });
  }

  clear_search() {
    this.search_filter = '';

  }

  tempSelectedEnvString : any;
  convert_to_string(selectedEnvironment){
    this.tempSelectedEnvString = this.selectedEnvironment.map( item => item.envName);
    return this.tempSelectedEnvString;
  }
  
  select_Environment(e, item,ind) {
    if (e.target.checked) {
      this.selectedEnvironment.push(item); 
    }
    else {
      this.selectedEnvironment.splice(ind,1);
    }
    
    let a = this.selectedEnvironment
    // this.selectedEnvironment = JSON.parse(JSON.stringify(this.selectedEnvironment));
    this.onSelectedEnvironmentChange.emit([...this.selectedEnvironment]);

    
  }

  clear_filter() {
    this.selectedEnvironment = [];
    this.filterEnvironments.forEach(item => {
      this.selectedCheckboxes[item.envName] = false;
    });

   
    this.onSelectedEnvironmentChange.emit(this.selectedEnvironment);

    
  }
 
}
