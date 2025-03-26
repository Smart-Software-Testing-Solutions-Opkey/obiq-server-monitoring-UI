import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/global/enums';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { NotificationsService } from 'src/app/services/notification-service/notifications.service';
import { environment } from 'src/environments/environment';


interface TimeData{
  [key : string] : Array<any>;
}
@Component({
  selector: 'app-filter-datetime',
  templateUrl: './filter-datetime.component.html',
  styleUrl: './filter-datetime.component.scss'
})

export class FilterDatetimeComponent implements OnInit,OnDestroy{

  constructor(
     public app_service: AppService,
     public dataService: AppDataService,
     private cdr: ChangeDetectorRef,
     public service_notification : NotificationsService,
  ){}
  
  
  filterCount = 0
  timezoneDatasource = []
  displayFormat = "(GMT+5:30)"
  selectedTimezone:any
  receivedTimeRange: any
  selectedAnalyticsType: any = {}
  selectedView: any
  selectedTab: any = {}
  availableTabs: any
  allSelectedAnalytics:any=[]
  timeFilter: Array<{name: string, value: string, timeValue: string}> = [
    { name: '30min', value: '30 minutes', timeValue: "LAST_30_MINUTES"},
    { name: '60min', value: '60 minutes', timeValue: "LAST_60_MINUTES"},
    { name: '3hr', value: '3 hour', timeValue: "LAST_3_HOUR"},
    { name: '6hrs', value: '6 hours', timeValue: "LAST_6_HOUR"},
    { name: '12hrs', value: '12 hours', timeValue: "LAST_12_HOUR"},
    { name: '24hrs', value: '24 hours', timeValue: "LAST_24_HOUR"},
    { name: '3days', value: '3 days', timeValue: "LAST_3_DAYS"},
    { name: '7days', value: '7 days', timeValue: "LAST_7_DAYS"},
    { name: '1mons', value: '1 months', timeValue: "LAST_1_MONTH"},
    { name: '3mons', value: '3 months', timeValue: "LAST_3_MONTH"},
    { name: 'setCustom', value: 'Set Custom', timeValue: "setCustom"},
  ];

  
  
  // @Input('selectedDateTime') set selectedDateTime({selectedDateTime}){
  
  //   console.log(selectedDateTime);
  // }
 

  @Input('isRefresh') set isRefresh ({isRefresh}){
   
    if(!isRefresh){
      return ;
    }
    this.selectedTime = 'LAST_24_HOUR';

    this.onSelctTime(this.selectedTime,'refresh')
    

  }
  onDateTimeChange = output<any>();

  ngOnDestroy(): void {
    this.dataService.isEnablePersister = false;
    this.disposeAllSubscriptions();
  }

  subscriptions: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  filterCustomTime : any;
  viewDataStorageObj : TimeData ={}

  ngOnInit(): void {
   this.getTimezones();
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
       
        if (data !== null) {
          if(data.callsource == 'timeExplorerChart'){
  
            this.receivedTimeRange = data.data;
            console.log('Received Data:', this.receivedTimeRange);
    
            // Manually trigger change detection
            this.cdr.detectChanges();
          }
        }})
        this.subscriptions.push(data_receiver);
        
        
        
  }
  

  ngAfterViewInit(): void {
    if(this.dataService.selectedDateTime.type == 'setEnum'){
      this.selectedTime = this.dataService.selectedDateTime.value;
      this.setTimeValue(this.selectedTime);

   }
   else{
    this.selectedTime = this.dataService.selectedDateTime.type;

    this.fromDatevalue = new Date(this.dataService.selectedDateTime.fromTimeInMillis);
    this.toDateValue = new Date(this.dataService.selectedDateTime.toTimeInMillis);
    this.fromDateTime = new Date(this.dataService.selectedDateTime.fromTimeInMillis).toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true});
    this.toDateTime = new Date(this.dataService.selectedDateTime.toTimeInMillis).toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true});

   }
    // this.calculateCurrentDate();
  }


  calculateCurrentDate(){
   
    this.fromDatevalue.setDate(this.fromDatevalue.getDate() - 1);
    this.fromDateTime =this.fromDatevalue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true})
    this.toDateTime = this.toDateValue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric',  hour12: true}) ;
}
  
    //for showing border bottom after every category
    showBorder(name: string): boolean {
      const itemsWithBorder = ['60min', '24hrs', '7days', '3mons'];
      return itemsWithBorder.includes(name); 
  }
  
    prevTime : any
    fromDateTime : any;
    toDateTime : any;
    selectedTime: string = "LAST_24_HOUR";
    public fromDatevalue: Date = new Date();
    public toDateValue: Date = new Date();
    public dateTimeFormat = "MM/dd/yyyy HH:mm";
     @ViewChild('timeFilterToggleButton') toggleButton: ElementRef<HTMLButtonElement>;

    setTimeValue(selectedTime){
      let currentDateObj = new Date();
      let numberOfMlSeconds = currentDateObj.getTime();
      let newDateObj = null

          if(selectedTime == "LAST_30_MINUTES"){
             newDateObj = new Date(numberOfMlSeconds - (30*60*1000));
          }
          else if(selectedTime == "LAST_60_MINUTES"){
             newDateObj = new Date(numberOfMlSeconds - (60*60*1000));
          }
          else if(selectedTime == "LAST_3_HOUR"){
             newDateObj = new Date(numberOfMlSeconds - (3*60*60*1000));
          }
          else if(selectedTime == "LAST_6_HOUR"){
             newDateObj = new Date(numberOfMlSeconds - (6*60*60*1000));
          }
          else if(selectedTime == "LAST_12_HOUR"){
             newDateObj = new Date(numberOfMlSeconds - (12*60*60*1000));
          }
          else if(selectedTime == "LAST_24_HOUR"){
             newDateObj = new Date(numberOfMlSeconds - (24*60*60*1000));
          }
          else if(selectedTime == "LAST_3_DAYS"){
             newDateObj = new Date(numberOfMlSeconds - (3*24*60*60*1000));
          }
          else if(selectedTime == "LAST_7_DAYS"){
             newDateObj = new Date(numberOfMlSeconds - (7*24*60*60*1000));
          }
          else if(selectedTime == "LAST_1_MONTH"){
            let currDate = new Date();
             newDateObj = new Date(currDate.setMonth(currDate.getMonth()-1))
          }
          else if(selectedTime == "LAST_3_MONTH"){
            let currDate = new Date();
             newDateObj = new Date(currDate.setMonth(currDate.getMonth()-3))
          }
        
      this.fromDateTime = newDateObj.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true})
      this.toDateTime = currentDateObj.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric',  hour12: true}) ;
    }
    
    onSelctTime(timeItem, callsource ?){
      this.prevTime = this.selectedTime
      this.selectedTime = timeItem;
      if(this.selectedTime == "setCustom"){
        return;
      }
      
      this.setTimeValue(this.selectedTime);

      // this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: {type: 'setEnum', value: timeItem?.timeValue}});
      this.onDateTimeChange.emit({type: 'setEnum', value: timeItem})
      this.dataService.selectedDateTime ={type: 'setEnum', value: this.selectedTime}

      if(callsource != 'refresh'){
        this.closeTimeFilterDropdown();
      }
     
    }
  
    timeZoneConversion(currDateTime){
        // remove last seconds
        let offset =this.selectedTimezone.BaseUtcOffset
        offset = offset.split(":")
        offset.splice(offset.length -1,1)
        offset= offset.join(":")
       
        //check + / -
        // offset = offset.includes("-")? offset : "+"+offset     // case 1
        offset = offset.includes('-')? offset.replace('-','+'):'-'+offset

        // need to convert date to GMT
        let newcurrDateTime= new Date(currDateTime)

        let formattedDate = new Date(newcurrDateTime.toUTCString()+offset).toUTCString().toString()
        let tempDate=formattedDate.split(",")[1].split(":")
        tempDate.pop()
        formattedDate=tempDate.join(":")
        formattedDate = new Date(formattedDate).toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric',  hour12: true})
        return formattedDate
    }

    checkIsStartDateEndDateSame(){
      if(this.fromDatevalue.getTime() == this.toDateValue.getTime()){
        this.service_notification.notifier(NotificationType.error, 'Start Date and End Date cannot be same');
        this.closeTimeFilterDropdown();
        return true
      }else{
        return false
      }

    }

    applyCustomFilter(){

      let IsStartDateEndDateSame = this.checkIsStartDateEndDateSame()
      if(IsStartDateEndDateSame){
        this.selectedTime = this.prevTime
        return
      }
      this.fromDateTime =this.fromDatevalue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true})
      
      if(this.selectedTimezone.Id != "India Standard Time"){
        this.fromDateTime=this.timeZoneConversion(this.fromDateTime) 
      }
    
      this.toDateTime = this.toDateValue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric',  hour12: true}) ;
     
      if(this.selectedTimezone.Id != "India Standard Time"){
         this.toDateTime =this.timeZoneConversion(this.toDateTime)
      }

     

      this.displayFormat = this.selectedTimezone.DisplayName
     this.displayFormat=  this.displayFormat.substring( 0,this.displayFormat.indexOf(")") +1    )
     

      this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: {type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() }});
      this.onDateTimeChange.emit( {type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() })
      this.dataService.selectedDateTime ={type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() }
      this.closeTimeFilterDropdown();
    }

    
    addToHistory(){  
      let viewId = this.dataService.selected_view_data.viewSelected.viewId;
      if(  this.recentDataPerView.length > 9){
         this.recentDataPerView.splice(0,1)
         
      }

      if(this.fromDateTime != this.toDateTime){
        this.recentDataPerView.push({"fromTime": this.fromDateTime, "toTime":this.toDateTime});
      }
      this.viewDataStorageObj [viewId ] = this.recentDataPerView

      localStorage.setItem("filterCustomTime",JSON.stringify(this.viewDataStorageObj))
    }

    
    recentDateTimeObj: TimeData = {};
    recentDataPerView : any =[]

    getRecentHistory(){
      this.viewDataStorageObj  = localStorage.getItem('filterCustomTime') ? JSON.parse(localStorage.getItem('filterCustomTime')) : {};

      if(this.viewDataStorageObj.hasOwnProperty(this.dataService.selected_view_data.viewSelected.viewId) ){
        this.recentDataPerView =this.viewDataStorageObj[this.dataService.selected_view_data.viewSelected.viewId] 
        this.recentDataPerView.reverse();
      }
      else{
        this.recentDataPerView = []
      }

    }
  
    closeTimeFilterDropdown(){
      this.addToHistory();
      this.getRecentHistory();
      this.toggleButton.nativeElement.click();
    }
    getTimezones() {
    
        var form_url = environment.BASE_OPKEY_URL + "Application/GetTimeZones";
        var form_data = {};
    
        this.app_service.make_get_server_call(form_url, form_data).subscribe(
          (result: any) => {
          
            this.timezoneDatasource = result;
            this.selectedTimezone =  this.timezoneDatasource.find(ele=>ele.Id == 'India Standard Time' );
            this.cdr.detectChanges();
          },
          (error) => {
    
          }
        );
    
    
      }

      resetTimeDate(){

      this.selectedTime = 'LAST_24_HOUR';
      this.onSelctTime(this.selectedTime)
      this.toDateValue = new Date();
      let numberOfMlSeconds = this.toDateValue.getTime();
      this.fromDatevalue =  new Date(numberOfMlSeconds - (24*60*60*1000));
      this.displayFormat = "(GMT+5:30)"

      } 
      checkToDate = (date) => { 
        let fromDatevalueDate = new Date(this.fromDatevalue)
        let tempDate = new Date(JSON.parse(JSON.stringify(fromDatevalueDate)))
        let threeMonthsFromNow = tempDate.setMonth(tempDate.getMonth()+3);
        if( date < fromDatevalueDate || date > threeMonthsFromNow || date > new Date()){
          return true;
        }
        else{
          return false;
        }
    } 

    checkFromDate = (date) => { 
      let toDateValueDate = new Date(this.toDateValue)
      let tempDate = new Date(JSON.parse(JSON.stringify(toDateValueDate)))
      let threeMonthsBeforeNow = tempDate.setMonth(tempDate.getMonth()-3);
      if( date > toDateValueDate || date < threeMonthsBeforeNow){
        return true;
      }
      else{
        return false;
      }
  } 
      
}
