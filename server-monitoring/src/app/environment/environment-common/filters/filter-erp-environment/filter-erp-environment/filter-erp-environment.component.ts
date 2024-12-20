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
     private cdr: ChangeDetectorRef
  ) {
  }

  filterEnvironments: any = []
  tempfilterEnvironments = []
  selectedEnvironment: any = []
  onSelectedEnvironmentChange = output<any>();
  search_filter: string = '';
  selectedCheckboxes: any = {};
  obj_env = {}

  @Input()
  ngOnInit(): void {
    this.get_application();
  }

  get_application() {
    var ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/UserJourneyController/getEnvironmentNamesByApplication";
    let formData = { appType: "ORACLEFUSION" }
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

            console.log(this.obj_env)


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

  select_Environment(e, item,ind) {
    if (e.target.checked) {
      this.selectedEnvironment.push(item);
      this.onSelectedEnvironmentChange.emit(item);
    }
    else {
      this.selectedEnvironment.splice(ind,1);
    }
    
    let a = this.selectedEnvironment
    this.selectedEnvironment = JSON.parse(JSON.stringify(this.selectedEnvironment));

    
  }

  clear_filter() {
    this.selectedEnvironment = [];
    this.filterEnvironments.forEach(item => {
      this.selectedCheckboxes[item.envName] = false;
    });

   

  }
 
}
