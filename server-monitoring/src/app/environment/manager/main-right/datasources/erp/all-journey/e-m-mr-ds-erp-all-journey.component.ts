import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { AppDataService } from 'src/app/services/app-data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MsgboxService } from 'src/app/services/msgbox.service';



@Component({
  selector: 'app-e-m-mr-ds-erp-all-journey',
  templateUrl: './e-m-mr-ds-erp-all-journey.component.html',
  styleUrl: './e-m-mr-ds-erp-all-journey.component.scss'
})
export class EMMrDsErpAllJourneyComponent implements OnInit, OnDestroy{
  constructor(public app_service: AppService,
    private dataService: AppDataService,
    private route: ActivatedRoute,
    private msgbox: MsgboxService 
  ) { }

  viewId: any ;
  
  selectedTimeDate: any = {
    type :'setEnum',
    value : "LAST_24_HOUR",
  };
  ngOnInit(): void {
    //  this.getRecentSubActivityJourneyOfUser();
    this.dataService.isUserAllJourneyOpen = true
    this.route.queryParams.subscribe(params => {
      this.viewId = params['viewId'];  
    });
     
   
    this.selectedTimeDate = this.dataService.selectedDateTime
 
  
    this.get_erp_Journey()
    this.startDataReceiving();
  }

  ngOnDestroy(): void {
    this.dataService.isUserAllJourneyOpen = false
    this.disposeAllSubscriptions();
  }
  @Input() analyticsType: any;
  @Input() view: any;
  limit: number = 20;
  offset: number = 0;
  erp_User_Journey_Data_Source: any[] = [];
  allDataLoaded: boolean = false;
  subscriptions: Subscription[] = [];

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


  textToSearch: any = ''
  isRefresh: boolean = false;
  startDataReceiving() {
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        if (data.callsource == 'erpAllJourney') {

          if (data.action == 'refresh') {
            this.textToSearch = '';
            // this.getRecentSubActivityJourneyOfUser()
            this.get_erp_Journey()
          }
          else if (data.action == 'search') {
            this.textToSearch = data.data;
            // this.getRecentSubActivityJourneyOfUser()
            this.get_erp_Journey()
          }
          // else if ( data.action == 'filterChange'){

          //   this.getRecentSubActivityJourneyOfUser()

          // }

        }
        else if(data.callsource == 'navigatorAll'){
          this.backtomenu();
        }  
      }

    });
    this.subscriptions.push(data_receiver);
  }
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
 

  get_erp_Journey(timeFilter?: any, appendData: boolean = false): void {
    
    const form_url =
      environment.BASE_OBIQ_SERVER_URL +
      'OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqJourneyController/getAllJourneyUsersInErpApp';

    let form_data = {
      // userId: this.dataService?.UserDto.UserDTO.U_ID,
      projectId: this.dataService?.UserDto.ProjectDTO.P_ID,
      "appType": this.modelObj.modelApplication.toUpperCase(),
      "fromTimeInMillis": 1704047400000,
      "toTimeInMillis": 1734518432353,
      "modules": this.modelObj.modelStrModule ? this.modelObj.modelStrModule : [],
      "process": this.modelObj.modelProcess ? this.modelObj.modelProcess : [],
      "userNameList": this.modelObj.modelUser ? this.modelObj.modelUser : [],
      "environments": this.modelObj.modelEnvironment ? this.modelObj.modelEnvironment.map(ele => ele.fullUrl) : [],
      "browserList": this.modelObj.modelBrowserList ? this.modelObj.modelBrowserList : [],
      "status": this.modelObj.modelStatus ? this.modelObj.modelStatus.map(ele => ele.value) : [],
      "limitBy": this.pageSize,
      "offset": this.offset,
      "textToSearch": this.textToSearch,
      "widgetType": "GET_USERJOURNEY_LIST_WIDGET",
      "viewId": this.viewId,
    };
    
    if(this.selectedTimeDate?.type == 'setEnum'){
      form_data["timeSpanEnum"] = this.selectedTimeDate?.value;
    }
    else if(this.selectedTimeDate?.type == "setCustom"){
      form_data["fromTimeInMillis"] = this.selectedTimeDate?.fromTimeInMillis;
      form_data["toTimeInMillis"] = this.selectedTimeDate?.toTimeInMillis;
    }
    // else{
    //   form_data["timeSpanEnum"] ="LAST_24_HOUR";
    // }
    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {

        window.loadingStart("#erp-user-Journey-logs-grid", "Please Wait");
 
        
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
          this.erp_User_Journey_Data_Source = [...this.erp_User_Journey_Data_Source, ...result];
        } else {
          this.erp_User_Journey_Data_Source = result;
        }

        this.offset += this.limit;

      },
      error: (error: any) => {
        console.warn(error);
        this.msgbox.display_error_message(error);
        window.loadingStop("#erp-user-Journey-logs-grid");

      },
      complete: () => {
        window.loadingStop("#erp-user-Journey-logs-grid");

      }
    });
  }
  onScroll(): void {
    this.get_erp_Journey( true);
  }
  openInNewTab(e) {
    window.open(`/opkeyone/obiq/journey/${e.sessionId}?dataId=${e.dataId}`)
  }
  backtomenu(){
    this.app_service.dataTransmitter({ callsource: 'settings', data: 'backToMenu' });
  }
  filterObj:any = {}
  // filterChanged(val){
  //   this.filterObj = val
  //   this.get_erp_Journey()
  //   // this.getRecentSubActivityJourneyOfUser()
  // }
  obj_filter = null
  changeTimeFilter(val){
    this.obj_filter = JSON.parse(JSON.stringify(val))
    this.selectedTimeDate = val
    this.get_erp_Journey();
  }


  // getRecentSubActivityJourneyOfUser() {

  //   let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/InsightWidgetController/getInsightWidgetData";



  //   let formData = {
  //     "appType": this.filterObj.modelApplication.toUpperCase(),
  //     "fromTimeInMillis": 1704047400000,
  //     "toTimeInMillis": 1734518432353,
  //     "modules": this.filterObj.modelStrModule?this.filterObj.modelStrModule:[],
  //     "process": this.filterObj.modelProcess?this.filterObj.modelProcess:[],
  //     "userNameList": this.filterObj.modelUser?this.filterObj.modelUser:[],
  //     "environments": this.filterObj.modelEnvironment?this.filterObj.modelEnvironment.map(ele=>ele.fullUrl):[],
  //     "browserList": this.filterObj.modelBrowserList?this.filterObj.modelBrowserList:[],
  //     "status": this.filterObj.modelStatus?this.filterObj.modelStatus.map(ele=>ele.value):[],
  //     "limitBy": this.pageSize,
  //     "offset": this.skip,
  //     "projectId": this.dataService?.UserDto?.ProjectDTO?.P_ID,//"3f0e8a1d-f215-4f3e-90bc-b52911482520",//this.dataService?.UserDto?.ProjectDTO?.P_ID,
  //     "textToSearch": this.textToSearch,
  //     "widgetType": "GET_USERJOURNEY_LIST_WIDGET"
  // }


  //   window.loadingStart("#alljourney", "Please wait");

  //   this.app_service.make_post_server_call(form_url, formData).subscribe(
  //     (result: any) => {
  //       // result = [
  //       //   {
  //       //     "timeStampStr": "2024-12-03 12:35:47.571",
  //       //     "timestamp": 1733229347571,
  //       //     "dataId": "28526b2b-64d6-4d60-b889-aba4952ab49d",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "50d9ee23-9e0e-495e-9018-8ef8d6215171",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "Invoices",
  //       //     "subActivityName": "Create Credit Memo",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1733229347623,
  //       //     "journeyToTimeInMillis": 1733229347571,
  //       //     "activityVersion": 36.1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "December"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-12-03 12:33:26.205",
  //       //     "timestamp": 1733229206205,
  //       //     "dataId": "1bf6a041-8827-4de9-8e2c-3c6da5ea1b3a",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "50d9ee23-9e0e-495e-9018-8ef8d6215171",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "Invoices",
  //       //     "subActivityName": "Create Credit Memo",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1733229206258,
  //       //     "journeyToTimeInMillis": 1733229206205,
  //       //     "activityVersion": 36,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "December"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 13:35:23.859",
  //       //     "timestamp": 1731591323859,
  //       //     "dataId": "ea1e18bf-0306-47e3-b580-1b564864b4fe",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "b87f3046-07ec-4328-985a-3bf17989340e",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731591323928,
  //       //     "journeyToTimeInMillis": 1731591323859,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 13:12:16.56",
  //       //     "timestamp": 1731589936560,
  //       //     "dataId": "7809ccb4-9178-48b1-9f95-2ef47ecc99a4",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "c0777a59-39c3-443d-af09-5900f2b56d07",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731589936635,
  //       //     "journeyToTimeInMillis": 1731589936560,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 12:54:12.795",
  //       //     "timestamp": 1731588852795,
  //       //     "dataId": "90423c54-e792-4d48-a065-af04780dfd63",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "4ea90eff-f4cf-478f-ab8c-8f5c060f08f0",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731588852873,
  //       //     "journeyToTimeInMillis": 1731588852795,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 12:19:34.166",
  //       //     "timestamp": 1731586774166,
  //       //     "dataId": "1aa12498-2310-474c-8714-3c5f17cdde93",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "b12ca3f0-55cf-47f1-853f-27e717ad651e",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "",
  //       //     "subActivityName": "Create Invoice",
  //       //     "subActivityStatus": "InComplete",
  //       //     "journeyFromTimeInMillis": 1731586774218,
  //       //     "journeyToTimeInMillis": 1731586774166,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 12:11:02.094",
  //       //     "timestamp": 1731586262094,
  //       //     "dataId": "0b657c2a-665c-4f1d-a0f2-0c6079cce4be",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "50b4e09e-97e3-49c2-82c6-57bf5bbab675",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731586262172,
  //       //     "journeyToTimeInMillis": 1731586262094,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 11:53:51.283",
  //       //     "timestamp": 1731585231283,
  //       //     "dataId": "2e73b28b-ca0b-422e-9e94-5a5512179b78",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "1a4d338f-c0cb-41dd-8b77-dbdd1081d26c",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731585231352,
  //       //     "journeyToTimeInMillis": 1731585231283,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 11:34:22.495",
  //       //     "timestamp": 1731584062495,
  //       //     "dataId": "18f9bbc3-9d3d-4c8e-996b-fe55ca820bcf",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "bba0ebbc-af50-40d8-99eb-7eb1507321c0",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731584062573,
  //       //     "journeyToTimeInMillis": 1731584062495,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 11:14:01.361",
  //       //     "timestamp": 1731582841361,
  //       //     "dataId": "ae0fc849-5e95-4f1e-83ef-8aa85bce1a71",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "d263aa04-35d7-4739-a667-c6a4f4c23372",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731582841437,
  //       //     "journeyToTimeInMillis": 1731582841361,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 10:38:15.806",
  //       //     "timestamp": 1731580695806,
  //       //     "dataId": "3304c0b2-b852-4886-8cf7-374204d5ecc0",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "c502208e-9f61-4e14-87bc-24f2c656377c",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731580695896,
  //       //     "journeyToTimeInMillis": 1731580695806,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-14 10:14:47.208",
  //       //     "timestamp": 1731579287208,
  //       //     "dataId": "7e3c4f7c-f5ee-40fb-aa80-cead2d6c37a3",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "38260fe3-289d-40b3-95b8-187e865ba1ce",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731579287284,
  //       //     "journeyToTimeInMillis": 1731579287208,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-13 12:37:01.728",
  //       //     "timestamp": 1731501421728,
  //       //     "dataId": "e8456cb2-aebe-40bd-8737-9aaf0b558fb7",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "e6d63079-b67d-440c-821f-09c0463e7c05",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731501421793,
  //       //     "journeyToTimeInMillis": 1731501421728,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-13 06:22:37.686",
  //       //     "timestamp": 1731478957686,
  //       //     "dataId": "f26812e8-ec59-41f9-985d-f2c08213a0f8",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "0d698d8c-aed9-42ea-b104-83169591b09b",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "",
  //       //     "subActivityName": "Manage Invoices",
  //       //     "subActivityStatus": "InComplete",
  //       //     "journeyFromTimeInMillis": 1731478957739,
  //       //     "journeyToTimeInMillis": 1731478957686,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-13 06:21:30.3",
  //       //     "timestamp": 1731478890300,
  //       //     "dataId": "10647578-404a-4a72-8e53-80fc2062a866",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "0d698d8c-aed9-42ea-b104-83169591b09b",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "",
  //       //     "subActivityName": "Manage Invoices",
  //       //     "subActivityStatus": "InComplete",
  //       //     "journeyFromTimeInMillis": 1731478890352,
  //       //     "journeyToTimeInMillis": 1731478890300,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-13 06:21:24.737",
  //       //     "timestamp": 1731478884737,
  //       //     "dataId": "b2969c24-31e8-478c-896a-59971106054d",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "0d698d8c-aed9-42ea-b104-83169591b09b",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "Invoices",
  //       //     "subActivityName": "Create invoice",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731478884813,
  //       //     "journeyToTimeInMillis": 1731478884737,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-13 06:17:48.168",
  //       //     "timestamp": 1731478668168,
  //       //     "dataId": "cf0f9744-9f8c-40db-a560-422b763c518a",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "0d698d8c-aed9-42ea-b104-83169591b09b",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "Invoices",
  //       //     "subActivityName": "Create invoice",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731478785800,
  //       //     "journeyToTimeInMillis": 1731478668168,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-12 17:17:02.803",
  //       //     "timestamp": 1731431822803,
  //       //     "dataId": "03f772cf-d788-4be4-8d97-d75349c17e68",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "941a881e-5ea5-4f77-b61c-72ef86a65743",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731431822870,
  //       //     "journeyToTimeInMillis": 1731431822803,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-12 17:06:38.806",
  //       //     "timestamp": 1731431198806,
  //       //     "dataId": "f969ca2c-7ab1-4869-b336-db2692b07660",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_HCM",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "ed1ed0e2-8b1e-48f2-ac97-0519ac8f5b81",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": null,
  //       //     "subModuleName": "Core HR",
  //       //     "activityName": "",
  //       //     "subActivityName": "Hire an Employee",
  //       //     "subActivityStatus": "Complete",
  //       //     "journeyFromTimeInMillis": 1731431198876,
  //       //     "journeyToTimeInMillis": 1731431198806,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   },
  //       //   {
  //       //     "timeStampStr": "2024-11-12 09:59:38.332",
  //       //     "timestamp": 1731405578332,
  //       //     "dataId": "cf250ab5-3be4-47ee-8fce-5ec3a5b9980f",
  //       //     "appType": "ORACLEFUSION",
  //       //     "userId": "Opkey_Cloud_Emp",
  //       //     "userRole": "Basic User",
  //       //     "sessionId": "e54a9e23-ebd2-4f24-96d1-ab78156190dd",
  //       //     "envName": "FA-EWVE-TEST-SAASFAPROD1",
  //       //     "envHost": "https://fa-ewve-test-saasfaprod1.fa.ocs.oraclecloud.com",
  //       //     "moduleName": "Finance",
  //       //     "subModuleName": "Payables",
  //       //     "activityName": "",
  //       //     "subActivityName": "Create Invoice",
  //       //     "subActivityStatus": "InComplete",
  //       //     "journeyFromTimeInMillis": 1731405578384,
  //       //     "journeyToTimeInMillis": 1731405578332,
  //       //     "activityVersion": 1,
  //       //     "browser": "Chrome",
  //       //     "yearStr": "2024",
  //       //     "monthStr": "November"
  //       //   }
  //       // ]
  //       this.journeyDataSourceTemp = [...this.journeyDataSourceTemp, ...result];

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
  // 
  
}
