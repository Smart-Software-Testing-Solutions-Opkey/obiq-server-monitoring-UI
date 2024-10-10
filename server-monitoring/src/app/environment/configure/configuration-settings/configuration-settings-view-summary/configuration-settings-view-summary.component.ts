import { Component, Input ,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-settings-view-summary',
  templateUrl: './configuration-settings-view-summary.component.html',
  styleUrl: './configuration-settings-view-summary.component.scss'
})
export class ConfigurationSettingsViewSummaryComponent implements OnInit{

  constructor( 
    public app_service:AppService){

  }
  obj_configuration_setting:any;
  Selected_grid_dataSource:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    debugger
    this.obj_configuration_setting = obj_configuration_setting;
    console.log("vidwsummary==============================", this.obj_configuration_setting);
    this.CreateViewSummarySelectedInstance(this.obj_configuration_setting)
  }
  ngOnInit() {
    
   }
   CreateViewSummarySelectedInstance(selectionData){
    this.Selected_grid_dataSource = selectionData.selected_erp_analytics;
    console.log(this.Selected_grid_dataSource);


   }
   onCellClick(event){

   }
   onSelectionChange(event){

   }

}
