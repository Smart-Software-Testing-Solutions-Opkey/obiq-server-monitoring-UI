import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { ManagerRightPanelComponent } from '../right-panel/manager-right-panel.component';

@Component({
  selector: 'app-environment-manager-main-right',
  templateUrl: './environment-manager-main-right.component.html',
  styleUrl: './environment-manager-main-right.component.scss'
})
export class EnvironmentManagerMainRightComponent implements OnInit,OnDestroy,AfterViewInit {

  constructor(   
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public service_data: AppDataService,
    public app_service:AppService,
    public dataService:AppDataService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        this.receivedTimeRange = data;
        console.log('Received Data:', this.receivedTimeRange);
        
        // Manually trigger change detection
        this.cdr.detectChanges();
      }
    });
  }
  ngAfterViewInit(): void {
    
  }
  receivedTimeRange:any
  selectedAnalyticsType:any = null
  selectedView:any
  selectedTab:any = {}
  availableTabs:any
  @Input('child_data') set child_data({ selectedAnalyticsType,selectedView }) {
    debugger
    this.selectedAnalyticsType = selectedAnalyticsType;
    if(selectedView){
      this.selectedView = selectedView
    }
    if(selectedAnalyticsType){
      this.selectedAnalyticsType = selectedAnalyticsType
    }
    if(Object.keys(selectedAnalyticsType).length != 0 ){
      this.bindData()
    }
    
  }
  
  get_Tab_Control_List(AnalysticsType){
    window.loadingStart("#Env_manager_main_right", "Please wait");
    //let form_url =  environment.BASE_OPKEY_URL + "/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceTabControlList";
    let form_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceTabControlList";

    let form_data = { systemId: AnalysticsType.systemId };

    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
      window.loadingStop("#Env_manager_main_right");
       
      result.forEach((item,index)=>{
       if(item.enumType == "OVERVIEW_TAB"){
        item.isVisible = true
        item.isSelected = true
       }
       else{
        item.isVisible = true;
        item.isSelected = false;
       }
       
      }) 
       this.availableTabs = result
       this.selectedTab = result[0]
      },
      error: (error: any) => {
        window.loadingStop("#Env_manager_main_right");
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  bindData(){
    debugger;
    if(this.selectedAnalyticsType){
     // if(this.selectedAnalyticsType.type == 'ERP_ANALYTICS_DATASOURCE'){
        this.get_Tab_Control_List(this.selectedAnalyticsType)
       
     // }
      // else if(this.selectedAnalyticsType.val == '"USER_BEHAVIOUR_ANALYTICS_DATASOURCE"'){
      //   this.availableTabs = [
      //     {name:'Overview',val:'overview',isVisible:true,isSelected:true},
      //     {name:'Log',val:'log',isVisible:true,isSelected:false},
      //     {name:'Time Explorer',val:'timeexplorer',isVisible:true,isSelected:false},
      //     {name:'Telemetry',val:'telemetry',isVisible:true,isSelected:false},
      //   ]
      // }
      // else if(this.selectedAnalyticsType.val == 'userbehaviour'){
      //   this.availableTabs = [
      //     {name:'Overview',val:'overview',isVisible:true,isSelected:true},
      //     {name:'Log',val:'log',isVisible:true,isSelected:false},
      //     {name:'Time Explorer',val:'timeexplorer',isVisible:false,isSelected:false},
      //     {name:'Telemetry',val:'telemetry',isVisible:false,isSelected:false},
      //   ]
      // }
      // else {
      //   this.availableTabs = [
      //     {name:'Overview',val:'overview',isVisible:true,isSelected:true},
      //     {name:'Log',val:'log',isVisible:true,isSelected:false},
      //     {name:'Time Explorer',val:'timeexplorer',isVisible:true,isSelected:false},
      //     {name:'Telemetry',val:'telemetry',isVisible:false,isSelected:false},
      //   ]
      // }
    
    }
    else {
      this.availableTabs = [
        {name:'Overview',val:'overview',isVisible:true,isSelected:true},
        {name:'Log',val:'log',isVisible:true,isSelected:false},
        {name:'Time Explorer',val:'timeexplorer',isVisible:true,isSelected:false},
        {name:'Telemetry',val:'telemetry',isVisible:true,isSelected:false},
        
        
      ]
    }


  }
 

  changeSelectedTab(tab){
    // this.selectedTab = val
    this.availableTabs.forEach((ele)=>{
      if(ele.isSelected){
        ele.isSelected = false
      }
    })
    tab.isSelected = true
    this.selectedTab = tab

  }

  addWidget(){
   const modalRef = this.modalService.open( ManagerRightPanelComponent,{
    backdrop: 'static',
    keyboard: false,
    size: 'full',
    centered: true,
    windowClass: 'layout-modal-right panel-end'
  });
  modalRef.result.then((result) => {
  }, (response) => {
    if (response == 'close modal') {
      return;
    }
  });
  modalRef.componentInstance.selectedItem = {callsource:'addWidget'};
  }

}
