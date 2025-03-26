import { Component, Input, OnInit, output, Output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-erp-application',
  templateUrl: './filter-erp-application.component.html',
  styleUrl: './filter-erp-application.component.scss'
})
export class FilterErpApplicationComponent implements OnInit {

  constructor(
    public app_service : AppService,
    private msgbox: MsgboxService 
  ){
  }

  @Input('child_data') set child_data({ selectedApplication }) {
    if(selectedApplication){
      this.selectedApplication = selectedApplication;
    }
  }
  filterApplications : any= []
  tempfilterApplications = []
  selectedApplication :any =null
  onSelectedApplicationChange = output<any>();

  ngOnInit(): void {
    this.get_application();
  }
 
  get_application() {
    var ajax_url = environment.BASE_OPKEY_URL + "ExternalApplicationSettings/GetApplications";
      this.app_service.make_get_server_call(ajax_url, {})
      .subscribe({
        next: (result: any) => {
          if(result && result.length){
            // console.log("-----result",JSON.stringify(result))
            this.filterApplications = result; 
            this.tempfilterApplications = result; 
            this.selectedApplication = result[0]
        }},
        error: (error: any) => {
          this.msgbox.display_error_message(error);
          console.warn(error);
        }
     });
    }

    ApplicationChange(data){
      this.selectedApplication = data;
      console.log("selected app:==========>",this.selectedApplication)
      this.onSelectedApplicationChange.emit(this.selectedApplication);
    }

    handleFilter(data){

      this.filterApplications = this.tempfilterApplications.filter(
        (s) => s.toLowerCase().indexOf(data.toLowerCase()) !== -1
      );
    }



}
