import { Component, Input } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-mr-ds-ub-all-journey',
  templateUrl: './e-m-mr-ds-ub-all-journey.component.html',
  styleUrl: './e-m-mr-ds-ub-all-journey.component.scss'
})
export class EMMrDsUbAllJourneyComponent {

constructor(  
    public app_service: AppService,
    private dataService:AppDataService){}

  ngOnInit(): void {
    // this.getRecentSubActivityJourneyOfUser();
    this.get_User_Behaviour_Journey()
    this.startDataReceiving();
  }

  @Input() analyticsType: any;
  @Input() view: any;
  limit: number = 20; 
  offset: number = 0; 
  ub_User_Journey_Data_Source: any[] = []; 
  allDataLoaded: boolean = false; 
  

  journeyDataSourceTemp: any[] = [];
  public pageSize = 20;
  journeyDataSource: GridDataResult;


  grid_load_more = false;

  modelObj = {
    modelApplication:"OracleFusion",
    modelSearch:null,
    modelEnvironment:null,
    modelProcess:null,
    modelStrModule:null,
    modelUser:null,
    modelBrowserList:null,
    modelStatus:null,
    modelFromDate:null,
    modelToDate:null
  }

  textToSearch : any = ''
  isRefresh : boolean = false;
  startDataReceiving(){
    this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
       
        if (data.callsource == 'ubAllJourney'){
         
          if( data.action == 'refresh'){
            this.textToSearch = '';
            // this.getRecentSubActivityJourneyOfUser()
            this.get_User_Behaviour_Journey()
          }
          else if( data.action == 'search'){
            this.textToSearch =data.data;
            // this.getRecentSubActivityJourneyOfUser()
            this.get_User_Behaviour_Journey()
          }
          // else if ( data.action == 'filterChange'){
            
          //   this.getRecentSubActivityJourneyOfUser()

          // }

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
            userId: this.dataService?.UserDto.UserDTO.U_ID,
            projectId: this.dataService?.UserDto.ProjectDTO.P_ID,
            "appType": this.modelObj.modelApplication.toUpperCase(),
            "fromTimeInMillis": 1704047400000,
            "toTimeInMillis": 1734518432353,
            "modules": this.modelObj.modelStrModule?this.modelObj.modelStrModule:[],
            "process": this.modelObj.modelProcess?this.modelObj.modelProcess:[],
            "userNameList": this.modelObj.modelUser?this.modelObj.modelUser:[],
            "environments": this.modelObj.modelEnvironment?this.modelObj.modelEnvironment.map(ele=>ele.fullUrl):[],
            "browserList": this.modelObj.modelBrowserList?this.modelObj.modelBrowserList:[],
            "status": this.modelObj.modelStatus?this.modelObj.modelStatus.map(ele=>ele.value):[],
            "limitBy": this.pageSize,
            "offset": this.offset,
            "textToSearch": this.textToSearch,
            "widgetType": "GET_USERJOURNEY_LIST_WIDGET",
          };
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
  // getRecentSubActivityJourneyOfUser() {
    
  //   let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/InsightWidgetController/getInsightWidgetData";

  //   let formData = {
  //     "appType": this.modelObj.modelApplication.toUpperCase(),
  //     "fromTimeInMillis": 1704047400000,
  //     "toTimeInMillis": 1734518432353,
  //     "modules": this.modelObj.modelStrModule?this.modelObj.modelStrModule:[],
  //     "process": this.modelObj.modelProcess?this.modelObj.modelProcess:[],
  //     "userNameList": this.modelObj.modelUser?this.modelObj.modelUser:[],
  //     "environments": this.modelObj.modelEnvironment?this.modelObj.modelEnvironment.map(ele=>ele.fullUrl):[],
  //     "browserList": this.modelObj.modelBrowserList?this.modelObj.modelBrowserList:[],
  //     "status": this.modelObj.modelStatus?this.modelObj.modelStatus.map(ele=>ele.value):[],
  //     "limitBy": this.pageSize,
  //     "offset": this.skip,
  //     "projectId": this.dataService?.UserDto?.ProjectDTO?.P_ID,//"3f0e8a1d-f215-4f3e-90bc-b52911482520",//this.dataService?.UserDto?.ProjectDTO?.P_ID,
  //     "textToSearch": this.textToSearch,
  //     "widgetType": "GET_USERJOURNEY_LIST_WIDGET",
  //     "userId":this.dataService?.UserDto?.UserDTO.U_ID,
  // }

  // window.loadingStart("#alljourney", "Please wait");
  // this.app_service.make_post_server_call(form_url, formData).subscribe(
  //   (result: any) => {
  //     this.journeyDataSourceTemp = [...this.journeyDataSourceTemp, ...result];

  //       this.grid_load_more = result.length >= this.pageSize;
  //       this.loadItems();
    
  //       window.loadingStop("#alljourney");

  //     },
  //     (error) => {
  //       window.loadingStop("#alljourney");
       
  //       this.loadItems()
  //       console.warn(error);

  //     }
  //   );
  // }
  
  // refreshPage(){
  //   if(this.isRefresh == true){
  //     this.getRecentSubActivityJourneyOfUser();
  //   }
  // }
  // private loadItems(): void {
  //   this.journeyDataSource = {
  //     data: this.journeyDataSourceTemp,
  //     total: this.journeyDataSourceTemp.length,
  //   };
  // }
  // public skip = 0;
  // load_more() {
  //   if (!this.grid_load_more) { return; }
  //   this.skip += this.pageSize;
  //   this.getRecentSubActivityJourneyOfUser()
  
   
  // }
   
  backtomenu(){
    this.app_service.routeTo('environment','summary')
  }
  filterObj:any = {}
  filterChanged(val){
    this.filterObj = val
    this.get_User_Behaviour_Journey()
    // this.getRecentSubActivityJourneyOfUser()
  }

}

