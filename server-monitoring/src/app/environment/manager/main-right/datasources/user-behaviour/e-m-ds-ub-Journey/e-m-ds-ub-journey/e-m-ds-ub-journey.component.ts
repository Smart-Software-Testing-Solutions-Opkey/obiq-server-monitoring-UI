import { Component, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-ds-ub-journey',
  templateUrl: './e-m-ds-ub-journey.component.html',
  styleUrl: './e-m-ds-ub-journey.component.scss'
})
export class EMDsUbJourneyComponent  implements OnDestroy{

   constructor(
        public service_data: AppDataService,
        public app_service: AppService,
        public dataService: AppDataService,
        private modalService: NgbModal,
        private msgbox: MsgboxService 
    ){
  
    }
  
  @Input() analyticsType: any;
  @Input() view: any;
  limit: number = 20; 
  offset: number = 0; 
  ub_User_Journey_Data_Source: any[] = []; 
  allDataLoaded: boolean = false; 
  subscriptions: Subscription[] = [];

  timeFilter : any;

  ngOnInit(): void {
     this.subscriptions.push(this.app_service.dataStream$.subscribe((data: any) => {
      if(data?.type == "getDataWithTime"){
        this.logToSearch = '';
        this.allDataLoaded = false
        this.offset = 0;
        this.timeFilter = data?.timeFilter
        this.get_User_Behaviour_Journey(this.timeFilter)
      }
    }))
    this.get_User_Behaviour_Journey();
    this.startDataReceiving();
    }

    ngOnDestroy() {
      this.dataService.isEnablePersister = false
      this.disposeAllSubscriptions();
    }
   
    subscriptions1: Subscription[] = [];
   
    disposeAllSubscriptions() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
      this.subscriptions1.forEach((subscription) => subscription.unsubscribe());
    }

    logToSearch : any;
    appType : string = 'ORACLEFUSION'
    startDataReceiving(){
      let data_receiver = this.app_service.dataReceiver().subscribe(data => {
        
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
      this.subscriptions1.push(data_receiver);
    }
    get_User_Behaviour_Journey(timeFilter?: any, appendData: boolean = false): void {
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
               this.msgbox.display_error_message(error);
      
            },
            complete: () => {
               window.loadingStop("#ub-user-Journey-logs-grid");
              console.log('Completed loading functional error logs');
            }
          });
    }
    onScroll(): void {
      this.get_User_Behaviour_Journey(this.timeFilter, true); 
    }
    openInNewTab(e){
        window.open(`/opkeyone/obiq/journey/${e.sessionId}?dataId=${e.dataId}`)
      }
}
