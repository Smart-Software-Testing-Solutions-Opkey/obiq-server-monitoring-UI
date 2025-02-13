import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-datetime',
  templateUrl: './filter-datetime.component.html',
  styleUrl: './filter-datetime.component.scss'
})
export class FilterDatetimeComponent implements OnInit,OnDestroy{

  constructor(
     public app_service: AppService,
     public dataService: AppDataService,
     private cdr: ChangeDetectorRef
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
    { name: 'setCustom', value: 'Set Custom', timeValue: ""},
  ];

  onDateTimeChange = output<any>();

  ngOnDestroy(): void {
    this.dataService.isEnablePersister = false;
    this.disposeAllSubscriptions();
  }

  subscriptions: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

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
    this.calculateCurrentDate();
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
  
  
    fromDateTime : any;
    toDateTime : any;
    selectedTime: string = '12hrs';
    public fromDatevalue: Date = new Date();
    public toDateValue: Date = new Date();
    public dateTimeFormat = "MM/dd/yyyy HH:mm";
     @ViewChild('timeFilterToggleButton') toggleButton: ElementRef<HTMLButtonElement>;
    
    onSelctTime(timeItem){
      this.selectedTime = timeItem?.name;
      if(this.selectedTime == "setCustom"){
        return;
      }
      var currentDateObj = new Date();
      var numberOfMlSeconds = currentDateObj.getTime();
  
      if(this.selectedTime.includes('30min')){
        var newDateObj = new Date(numberOfMlSeconds - (30*60*1000));
      }
      else if(this.selectedTime.includes('60min')){
        var newDateObj = new Date(numberOfMlSeconds - (60*60*1000));
      }
      else if(this.selectedTime.includes('3hr')){
        var newDateObj = new Date(numberOfMlSeconds - (3*60*60*1000));
      }
      else if(this.selectedTime.includes('6hr')){
        var newDateObj = new Date(numberOfMlSeconds - (6*60*60*1000));
      }
      else if(this.selectedTime.includes('12hr')){
        var newDateObj = new Date(numberOfMlSeconds - (12*60*60*1000));
      }
      else if(this.selectedTime.includes('24hr')){
        var newDateObj = new Date(numberOfMlSeconds - (24*60*60*1000));
      }
      else if(this.selectedTime.includes('3day')){
        var newDateObj = new Date(numberOfMlSeconds - (3*24*60*60*1000));
      }
      else if(this.selectedTime.includes('7day')){
        var newDateObj = new Date(numberOfMlSeconds - (7*24*60*60*1000));
      }
      else if(this.selectedTime.includes('1mon')){
        var newDateObj = new Date(currentDateObj.setMonth(currentDateObj.getMonth()-1))
      }
      else if(this.selectedTime.includes('3mon')){
        var newDateObj = new Date(currentDateObj.setMonth(currentDateObj.getMonth()-3))
      }
      this.fromDateTime = newDateObj.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true})

      this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: {type: 'setEnum', value: timeItem?.timeValue}});
      this.onDateTimeChange.emit({type: 'setEnum', value: timeItem?.timeValue})
      this.closeTimeFilterDropdown();
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
        console.log("offset :",offset)

        // need to convert date to GMT
        let newcurrDateTime= new Date(currDateTime)
       
        //convert to date type for addition , to check do toString()
        let newcurrDateTimeString = new Date(newcurrDateTime.toString() + offset).toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric',  hour12: true})
       
        return newcurrDateTimeString
      

    }
    applyCustomFilter(){
     
      this.fromDateTime =this.fromDatevalue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true})
      // this.fromDateTime=this.timeZoneConversion(this.fromDateTime)  
    
      this.toDateTime = this.toDateValue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric',  hour12: true}) ;
      // this.toDateTime =this.timeZoneConversion(this.toDateTime)

      this.displayFormat = this.selectedTimezone.DisplayName
     this.displayFormat=  this.displayFormat.substring( 0,this.displayFormat.indexOf(")") +1    )

      this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: {type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() }});
      this.onDateTimeChange.emit( {type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() })
      this.closeTimeFilterDropdown();
    }
  
    closeTimeFilterDropdown(){
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
}
