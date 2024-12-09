import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-environment-manager-settings',
  templateUrl: './environment-manager-settings.component.html',
  styleUrl: './environment-manager-settings.component.scss'
})
export class EnvironmentManagerSettingsComponent implements OnInit {
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service_data: AppDataService,
    public app_service: AppService,
    private cdr: ChangeDetectorRef,
    public dataService: AppDataService,
   
  ) { 
    this.service_data.isFromSettings = true
  }

  selectingViewSetting(value){
    this.selectedView = value
  }
 selectedView:any = {}
  obj_configuration_setting = {
    tab: "datasource",
    title: "Add View",
    selected_datasource: [],
    selected_erp_analytics: [],
    selected_view: null,
    AccessPermisions: {
      "canView": true,
      "canEdit": true
    },
    selectedUids: {
      "userId":"00000000-0000-0000-0000-000000000000",
      "permmission":"ALL"
    },

  }
  
  ngOnInit(): void {
    
  }

  

  
 

}
