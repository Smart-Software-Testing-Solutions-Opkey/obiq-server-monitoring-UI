import { Component, Input, output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-filter-status',
  templateUrl: './filter-status.component.html',
  styleUrl: './filter-status.component.scss'
})
export class FilterStatusComponent {

 constructor(
    public app_service: AppService,
    private msgbox: MsgboxService 
  ) {
  }

  selectedStatus: any = []
  tempSelected = []

  @Input('child_data') set child_data({ selectedStatus }) {
    if(selectedStatus){
      this.tempSelected = JSON.parse(JSON.stringify(selectedStatus))
    
    }
    
  }

  filterStatus: any = []
  tempfilterStatus = []
  
  onSelectedStatusChange = output<any>();
  search_filter: string = '';
  selectedCheckboxes: any = {};
  obj_display = {}
  
  ngOnInit(): void {
    this.get_status();
  }

  get_status() {
    var ajax_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ActivityTrackerController/getAllActivityStatusList";
   
    this.app_service.make_get_server_call(ajax_url,{})
      .subscribe({
        next: (result: any) => {
          if (result && result.length) {
            console.log("-----result", JSON.stringify(result))
            this.filterStatus = result;
            this.tempfilterStatus = result;
            this.filterStatus.forEach(val => {
              this.obj_display[val.displayName] = val;
            })

            if(this.tempSelected.length>0){
              this.selectedStatus = this.tempSelected
              this.selectedStatus.forEach(item => {
                this.selectedCheckboxes[item.displayName] = true;
              });
            }
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

  tempSelectedEnvString : any;
  convert_to_string(selectedStatus){
    this.tempSelectedEnvString = this.selectedStatus.map( item => item.displayName);
    return this.tempSelectedEnvString;
  }
  
  select_Status(e, item,ind) {
    if (e.target.checked) {
      this.selectedStatus.push(item); 
    }
    else {
      this.selectedStatus.splice(ind,1);
    }
    
    let a = this.selectedStatus
    // this.selectedStatus = JSON.parse(JSON.stringify(this.selectedStatus));
    this.onSelectedStatusChange.emit([...this.selectedStatus]);

    
  }

  clear_filter() {
    this.selectedStatus = [];
    this.filterStatus.forEach(item => {
      this.selectedCheckboxes[item.displayName] = false;
    });

   
    this.onSelectedStatusChange.emit(this.selectedStatus);

    
  }
 
}

