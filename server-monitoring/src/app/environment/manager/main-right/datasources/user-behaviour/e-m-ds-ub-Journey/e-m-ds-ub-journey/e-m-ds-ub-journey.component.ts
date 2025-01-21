import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-ds-ub-journey',
  templateUrl: './e-m-ds-ub-journey.component.html',
  styleUrl: './e-m-ds-ub-journey.component.scss'
})
export class EMDsUbJourneyComponent  {

   constructor(
        public service_data: AppDataService,
        public app_service: AppService,
        public dataService: AppDataService,
        private modalService: NgbModal,
    ){
  
    }
  
  @Input() analyticsType: any;
  @Input() view: any;
  limit: number = 20; 
  offset: number = 0; 
  ub_User_Journey_Data_Source: any[] = []; 
  allDataLoaded: boolean = false; 
  subscriptions: Subscription[] = [];


  ngOnInit(): void {
     this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
      if(data?.type == "getDataWithTime"){
        this.logToSearch = '';
        this.allDataLoaded = false
        this.offset = 0;
        this.get_User_Behaviour_Journey(data?.timeFilter)
      }
    }))
    this.get_User_Behaviour_Journey();
    this.startDataReceiving();
    }
    logToSearch : any;
    appType : string = 'ORACLEFUSION'
    startDataReceiving(){
      this.app_service.dataReceiver().subscribe(data => {
        
        if (data !== null) {
        
          
          if (data.callsource == 'JOURNEY_TAB'){
            this.logToSearch = '';
            this.offset = 0;
            this.allDataLoaded= false;
  
            if( data.action == 'refresh'){
              this.get_User_Behaviour_Journey()
            }
            else if ( data.action == 'filterChange'){
              this.appType = data.objFilter.modelApplication.toUpperCase()
              this.get_User_Behaviour_Journey()
  
            }
            else if(data.action == 'search'){
              this.logToSearch = data.data;
              this.offset = 0;
              this.allDataLoaded = false;
              this.get_User_Behaviour_Journey()
            }
  
          }
        }  
      });
    }
    get_User_Behaviour_Journey(timeFilter?: any, appendData: boolean = false): void {
      debugger;
       const form_url =
            environment.BASE_OBIQ_SERVER_URL +
            'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqJourneyController/getAllJourneyUsers';
      
            
            let form_data = {
              limitBy: this.limit,
              userId:this.dataService.UserDto.UserDTO.U_ID,
              projectId: this.dataService.UserDto.ProjectDTO.P_ID,
              appType: this.appType,
              offset: this.offset ,
              "viewId": this.view.viewId,
              "logToSearch": this.logToSearch
            };

            
            if(timeFilter?.type == 'setEnum'){
              form_data["timeSpanEnum"] = timeFilter?.value;
            }
            else if(timeFilter?.type == "setCustom"){
              form_data["fromTimeInMillis"] = timeFilter?.fromTimeInMillis;
              form_data["toTimeInMillis"] = timeFilter?.toTimeInMillis;
            }
            else{
              form_data["timeSpanEnum"] ="LAST_24_HOUR";
            }
            this.app_service.make_post_server_call(form_url, form_data).subscribe({
            next: (result: any) => {
            window.loadingStart("#ub-user-Journey-logs-grid","Please Wait");
            result = result.map((log) => {

              const date = new Date(log.timestamp);
              return {
                ...log,
                timeString: date.toLocaleString()
              };
            });
    
            if (result.length < this.limit) {
              this.allDataLoaded = true;
            }
    
            if (appendData) {
              this.ub_User_Journey_Data_Source = [...this.ub_User_Journey_Data_Source, ...result];
            } else {
              this.ub_User_Journey_Data_Source = result;
            }
    
            this.offset += this.limit;
             
            },
            error: (error: any) => {
              console.warn(error);
               window.loadingStop("#ub-user-Journey-logs-grid");
      
            },
            complete: () => {
               window.loadingStop("#ub-user-Journey-logs-grid");
              console.log('Completed loading functional error logs');
            }
          });
    }
    onScroll(): void {
      this.get_User_Behaviour_Journey(null, true); 
    }
    openInNewTab(e){
      debugger;
        window.open(`/opkeyone/obiq/journey/${e.sessionId}?dataId=${e.dataId}`)
      }
}
