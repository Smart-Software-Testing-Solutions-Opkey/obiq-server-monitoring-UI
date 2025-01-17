import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, output, ViewChild } from '@angular/core';
import { WindowState } from '@progress/kendo-angular-dialog';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-envrionment-common-filter',
  templateUrl: './envrionment-common-filter.component.html',
  styleUrl: './envrionment-common-filter.component.scss'
})
export class EnvrionmentCommonFilterComponent implements OnInit {
  constructor(
    public app_service: AppService,
    private cdr: ChangeDetectorRef
  ){

  }

  @Input() datasource : any;
  @Input() selectedTab : any;

  onFilterSelected = output<any>();
  FromDateChange(val){
    let obj = {...this.modelObj}
    obj.modelFromDate = val
    this.modelObj= JSON.parse(JSON.stringify(obj))

  }
  ToDateChange(val){
    let obj = {...this.modelObj}
    obj.modelToDate = val
    this.modelObj= JSON.parse(JSON.stringify(obj))

  }
  changeApplication(val){
    let obj = {...this.modelObj}
    obj.modelApplication = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
  }
  filterCount = 0
  // receivedTimeRange : any ;
  ngOnInit(): void {
    this.sendFilterData()
   
    this.app_service.dataReceiver().subscribe(data => {
       
        if (data !== null) {
          if(data.callsource == 'timeExplorerChart'){
  
            this.receivedTimeRange = data.data;
            console.log('Received Data:', this.receivedTimeRange);
    
            // Manually trigger change detection
            this.cdr.detectChanges();
          }
        }})
  }
  ngAfterViewInit(): void {
    this.calculateCurrentDate();
  }


  calculateCurrentDate(){
   
    this.fromDatevalue.setDate(this.fromDatevalue.getDate() - 1);
    this.receivedTimeRange  = this.fromDatevalue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric', hour12: true}) + " to "+ this.toDateValue.toLocaleString('en-us',{day : 'numeric' ,month:'short',hour: 'numeric',minute: 'numeric',  hour12: true}) ;


  }
  searched(val){
    this.modelObj.modelSearch=val;
  }
  showRightPanel = false
  public windowState: WindowState = "default";
  openRightPanel(){
    this.showRightPanel = true

  }
  closeRightPanel(){
    this.showRightPanel = false
  }
  changeEnvironment(val){
    let obj = {...this.modelObj}
    obj.modelEnvironment = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
  }
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
  tempObj = {
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
  

  changeProcess(val){
    let obj = {...this.modelObj}
    obj.modelProcess = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
  }
  changeErpModule(val){
    let obj = {...this.modelObj}
    obj.modelStrModule = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
  }
  changeUser(val){
    let obj = {...this.modelObj}
    obj.modelUser = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
  }

  changeStatus(val){
    let obj = {...this.modelObj}
    obj.modelStatus = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
  }
  
  sendFilterData(){
    this.onFilterSelected.emit(this.modelObj)
  }
  innerOps(val){
    if(val?.action == 'Clear All'){
      this.modelObj = {...this.tempObj}
    }
    else if(val?.action == 'Clear one'){
      if(typeof(this.modelObj[val?.data?.model]) != 'string'){
        let obj = {...this.modelObj}
        obj = JSON.parse(JSON.stringify(obj))
        obj[val?.data?.model].splice(val?.data?.idx,1)
        this.modelObj = {...obj}
      }
    }
  }
  returnCount(){
    return Object.values(this.modelObj).filter(ele=>ele != null).length
  }

  isRefresh : boolean = false;
  refreshPage(){
      this.isRefresh = true;
      this.app_service.dataTransmitter({callsource:'journeyRefresh',data:this.isRefresh});
      this.app_service.dataTransmitter({callsource:'widgetOperation',data:this.isRefresh});
  }

  clearSearch(){
    this.searchText = ''
    this.filterSearchResults()
  }

  searchText : any;
  filterSearchResults(){

      if(this.searchText == null){
        return
      }
        
        this.app_service.dataTransmitter({callsource:'searchOperation',data:this.searchText});
      
    }
   timezoneDatasource = []
    selectedTimezone:any
    receivedTimeRange: any
    selectedAnalyticsType: any = {}
    selectedView: any
  
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
  
    //for showing border bottom after every category
    showBorder(name: string): boolean {
      const itemsWithBorder = ['60min', '24hrs', '7days', '3mons'];
      return itemsWithBorder.includes(name); 
  }
  
    selectedTime: string = '30min';
    public fromDatevalue: Date = new Date();
    public toDateValue: Date = new Date();
    public dateTimeFormat = "MM/dd/yyyy HH:mm";
     @ViewChild('timeFilterToggleButton') toggleButton: ElementRef<HTMLButtonElement>;
    
    onSelctTime(timeItem){
      this.selectedTime = timeItem?.name;
      if(this.selectedTime == "setCustom"){
        return;
      }

      this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: {type: 'setEnum', value: timeItem?.timeValue}});
      this.closeTimeFilterDropdown();
    }
  
    applyCustomFilter(){
      // console.log("fromDate: ", this.fromDatevalue, " toDate: ", this.toDateValue);
      this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: {type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() }});
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

      @Output()   onEditableChange  = new EventEmitter<boolean>();
      
      Editable = false
      toggleEdit(){
        this.Editable = !this.Editable
        this.onEditableChange.emit(this.Editable)

      }
      
  
}
