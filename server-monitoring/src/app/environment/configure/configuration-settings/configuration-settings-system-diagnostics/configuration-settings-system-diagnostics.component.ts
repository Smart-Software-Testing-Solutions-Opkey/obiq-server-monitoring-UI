import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-configuration-settings-system-diagnostics',
  templateUrl: './configuration-settings-system-diagnostics.component.html',
  styleUrl: './configuration-settings-system-diagnostics.component.scss'
})
export class ConfigurationSettingsSystemDiagnosticsComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
   private router: Router,
   private route: ActivatedRoute,
   public service_data: AppDataService,
   public app_service: AppService,){

 }
  obj_configuration_setting:any;
  selected_System_Diagnostics_Rows: any[] = [];

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    this.obj_configuration_setting = obj_configuration_setting;
    console.log("obj_configuration_setting===", obj_configuration_setting);
  }
  Instance_list:any;

  ngOnInit(): void {
    this.System_Diagnostic_grid()
  }
  onCellClick(event:any){

  }
  on_Selection_Change_System_diagnostics(event:any){
   
      debugger;
  
      const selectedRow = event.selectedRows;
      const deselectedRow = event.deselectedRows;
  
      selectedRow.forEach((row: any) => {
        this.selected_System_Diagnostics_Rows.push(row.dataItem);
      });
  
      deselectedRow.forEach((row: any) => {
        const index = this.selected_System_Diagnostics_Rows.findIndex(item => item.SystemIdentifier === row.dataItem.SystemIdentifier);
        if (index !== -1) {
          this.selected_System_Diagnostics_Rows.splice(index, 1);
        }
      });
  
  
      console.log('Selected Rows:', this.selected_System_Diagnostics_Rows);
  
      this.obj_configuration_setting.selected_system_diagnostics = this.selected_System_Diagnostics_Rows;
  
    }
  System_Diagnostic_grid(){
   let  dummyData = [
      { OBIQ_Agent: "IIS", Unique_Code: "https://myqlm.preprod.opkeyone.com" },
      { OBIQ_Agent: "Windows M/C", Unique_Code: "https://myqlm.preprod.opkeyone.com" },
      { OBIQ_Agent: "MySQL", Unique_Code: "https://myqlm.preprod.opkeyone.com" },
      { OBIQ_Agent: "SQLite", Unique_Code: "https://myqlm.preprod.opkeyone.com" },
      { OBIQ_Agent: "Redis", Unique_Code: "https://myqlm.preprod.opkeyone.com" },
      { OBIQ_Agent: "Linux M/C", Unique_Code: "https://myqlm.preprod.opkeyone.com" },
      { OBIQ_Agent: "Apache", Unique_Code: "https://myqlm.preprod.opkeytwo.com" },
      { OBIQ_Agent: "PostgreSQL", Unique_Code: "https://myqlm.preprod.opkeytwo.com" },
      { OBIQ_Agent: "Nginx", Unique_Code: "https://myqlm.preprod.opkeythree.com" },
      { OBIQ_Agent: "MongoDB", Unique_Code: "https://myqlm.preprod.opkeythree.com" },
      { OBIQ_Agent: "Cassandra", Unique_Code: "https://myqlm.preprod.opkeyfour.com" },
      { OBIQ_Agent: "Elasticsearch", Unique_Code: "https://myqlm.preprod.opkeyfour.com" },
      { OBIQ_Agent: "RabbitMQ", Unique_Code: "https://myqlm.preprod.opkeyfive.com" },
      { OBIQ_Agent: "Docker", Unique_Code: "https://myqlm.preprod.opkeyfive.com" }
  ];
  this.Instance_list = dummyData;
  }
 

  
}
