import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, output, ViewChild } from '@angular/core';
import { WindowState } from '@progress/kendo-angular-dialog';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-envrionment-common-filter',
  templateUrl: './envrionment-common-filter.component.html',
  styleUrl: './envrionment-common-filter.component.scss'
})
export class EnvrionmentCommonFilterComponent implements OnInit, OnDestroy {
  constructor(
    public app_service: AppService,
    public dataService: AppDataService,
    private cdr: ChangeDetectorRef
  ) {

  }

  @Input() datasource: any;
  
  selectedTab = ''
  selectedDateTime : any;
  @Input('selected_tab') set selected_tab({ selectedTab,Editable,selectedDateTime}) {
   this.Editable = Editable
    this.selectedTab = selectedTab
    
    if(selectedTab == 'ubAllJourney' || selectedTab == 'ubAllJourney' || selectedTab == 'ubAllApi' || selectedTab == 'ubAllConsole' || selectedTab == 'ubAllFunctional' || selectedTab == 'erpAllFunctional'){
      this.selectedDateTime = selectedDateTime
    }
    this.searchText = ''
    this.bind_filter()

  }

  @Input('selectedTimeDate') set selectedTimeDate({selectedTimeDate})
  {
    this.selectedDateTime = selectedTimeDate
  }

  @Input('isShowSearchText') set isShowSearchText ({isShowSearchText}){
      this.searchText = "" 
  }

 
  @Input() selectedAnalyticsType: any;

  onFilterSelected = output<any>();
  FromDateChange(val) {
    let obj = { ...this.modelObj }
    obj.modelFromDate = val
    this.modelObj = JSON.parse(JSON.stringify(obj))

  }
  ToDateChange(val) {
    let obj = { ...this.modelObj }
    obj.modelToDate = val
    this.modelObj = JSON.parse(JSON.stringify(obj))

  }
  changeApplication(val) {
    let obj = { ...this.modelObj }
    obj.modelApplication = val
    this.modelObj = JSON.parse(JSON.stringify(obj))
  }
  filterCount = 0
  // receivedTimeRange : any ;

  ngOnDestroy(): void {
    this.dataService.isEnablePersister = false;
    this.disposeAllSubscriptions();
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  isDisabled = false;
  ngOnInit(): void {
    // this.sendFilterData()

    let data_receiver = this.app_service.dataReceiver().subscribe(data => {

      if (data !== null) {
        if (data.callsource == 'timeExplorerChart') {

          this.receivedTimeRange = data.data;
          console.log('Received Data:', this.receivedTimeRange);

          // Manually trigger change detection
          this.cdr.detectChanges();
        }
        else if (data.action == "bindFilterData") {
          this.bind_filter(data.callsource)
        }
        else if (data.callsource == "stopEdit") {
          this.Editable = true
          this.toggleEdit()
        }
      }
    })
    this.subscriptions.push(data_receiver);
  }
  ngAfterViewInit(): void {
    this.calculateCurrentDate();
  }


  calculateCurrentDate() {

    this.fromDatevalue.setDate(this.fromDatevalue.getDate() - 1);
    this.receivedTimeRange = this.fromDatevalue.toLocaleString('en-us', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true }) + " to " + this.toDateValue.toLocaleString('en-us', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true });


  }
  searched(val) {
    this.modelObj.modelSearch = val;
  }
  showRightPanel = false
  public windowState: WindowState = "default";
  openRightPanel() {
    this.showRightPanel = true

  }
  closeRightPanel() {
    this.showRightPanel = false
  }
  changeEnvironment(val) {
    let obj = { ...this.modelObj }
    obj.modelEnvironment = val
    this.modelObj = JSON.parse(JSON.stringify(obj))
  }

  obj_filter = {
    common_filter_inner: { display: false },
    filter_calendar: { display: false },
    erp_application: { display: false },
    erp_environment: { display: false },
    erp_process: { display: false },
    user: { display: false },
    erp_module: { display: false },
    filter_status: { display: false }
  }
  bind_filter(call_source?) {
    this.obj_filter.common_filter_inner.display = true;
    this.obj_filter.filter_calendar.display = true;
    this.obj_filter.erp_application.display = true;

    if (this.selectedTab == 'LOG_TAB') {
      this.obj_filter.erp_environment.display = false;
      this.obj_filter.erp_process.display = false;
      this.obj_filter.user.display = true;
      this.obj_filter.erp_module.display = false;
      this.obj_filter.filter_status.display = true;
    }
    else if (this.selectedTab == 'JOURNEY_TAB' || this.selectedTab == 'ubAllJourney' || this.selectedTab == 'erpAllJourney' || this.selectedTab == 'erpAllFunctional') {
      this.obj_filter.erp_environment.display = true;
      this.obj_filter.erp_process.display = true;
      this.obj_filter.user.display = true;
      this.obj_filter.erp_module.display = true;
      this.obj_filter.filter_status.display = true;
    }
    else if (this.selectedTab == 'LOG_APP_FUNCTIONAL_ERROR' || this.selectedTab == 'LOG_APP_CONSOLE_ERROR' || this.selectedTab == 'LOG_APP_API_ERROR' || this.selectedTab == 'ubAllFunctional' || this.selectedTab == 'ubAllApi' || this.selectedTab == 'ubAllConsole' || this.selectedTab == 'erpAllFunctional') {
      this.obj_filter.erp_environment.display = true;
      this.obj_filter.erp_process.display = false;
      this.obj_filter.user.display = true;
      this.obj_filter.erp_module.display = false;
      this.obj_filter.filter_status.display = false;

    }



  }
  modelObj = {
    modelApplication: "OracleFusion",
    modelSearch: null,
    modelEnvironment: null,
    modelProcess: null,
    modelStrModule: null,
    modelUser: null,
    modelBrowserList: null,
    modelStatus: null,
    modelFromDate: null,
    modelToDate: null,
    modelDateTime : null,
  }
  tempObj = {
    modelApplication: "OracleFusion",
    modelSearch: null,
    modelEnvironment: null,
    modelProcess: null,
    modelStrModule: null,
    modelUser: null,
    modelBrowserList: null,
    modelStatus: null,
    modelFromDate: null,
    modelToDate: null,
    modelDateTime : null,
  }


  changeProcess(val) {
    let obj = { ...this.modelObj }
    obj.modelProcess = val
    this.modelObj = JSON.parse(JSON.stringify(obj))
  }
  changeErpModule(val) {
    let obj = { ...this.modelObj }
    obj.modelStrModule = val
    this.modelObj = JSON.parse(JSON.stringify(obj))
  }
  changeUser(val) {
    let obj = { ...this.modelObj }
    obj.modelUser = val
    this.modelObj = JSON.parse(JSON.stringify(obj))
  }

  changeStatus(val) {
    let obj = { ...this.modelObj }
    obj.modelStatus = val
    this.modelObj = JSON.parse(JSON.stringify(obj))
  }

  ondateTimeFilteremit = output<any>();
  sendTimeFilterData(val){
   
    this.modelObj.modelDateTime = val
    this.searchText = ""
    this.ondateTimeFilteremit.emit(JSON.parse(JSON.stringify(val)))

  }

  sendFilterData() {
    this.onFilterSelected.emit(this.modelObj)
    this.showRightPanel = false
  }
  innerOps(val) {
    if (val?.action == 'Clear All') {
      this.modelObj = { ...this.tempObj }
    }
    else if (val?.action == 'Clear one') {
      if (typeof (this.modelObj[val?.data?.model]) != 'string') {
        let obj = { ...this.modelObj }
        obj = JSON.parse(JSON.stringify(obj))
        obj[val?.data?.model].splice(val?.data?.idx, 1)
        this.modelObj = { ...obj }
      }
    }
  }
  returnCount() {
    return Object.values(this.modelObj).filter(ele => ele != null).length
  }


  isRefresh : boolean = false;
  isRefreshInitial : boolean = false;
  refreshPage() {
    this.searchText = ''
    this.isRefreshInitial = !this.isRefreshInitial;
    this.isRefresh = true;
    // this.app_service.dataTransmitter({ callsource: this.selectedTab, action: 'refresh', selectedAnalyticsType: this.selectedAnalyticsType });
  }


  // if(this.selectedTab == 'OVERVIEW_TAB'){
  //   this.app_service.dataTransmitter({callsource:'widgetOperation',data:this.isRefresh});
  // }
  // if(this.selectedTab == 'LOG_TAB'){
  //   this.app_service.dataTransmitter({callsource:'journeyRefresh',data:this.isRefresh});

  // }
  // if(this.selectedTab == 'LOG_APP_FUNCTIONAL_ERROR'){
  //   this.app_service.dataTransmitter({callsource:'journeyRefresh',data:this.isRefresh});

  // }
  // if(this.selectedTab == 'LOG_APP_CONSOLE_ERROR'){
  //   this.app_service.dataTransmitter({callsource:'journeyRefresh',data:this.isRefresh});
  // }
  // if(this.selectedTab == 'JOURNEY_TAB'){

  //   this.app_service.dataTransmitter({callsource:'journeyRefresh',data:this.isRefresh});
  // }
  // this.app_service.dataTransmitter({callsource:'journeyRefresh',data:this.isRefresh});
  // this.app_service.dataTransmitter({callsource:'widgetOperation',data:this.isRefresh});


  searchText : any;
  clearSearch() {
    this.searchText = ''
    this.filterSearchResults()
  }

 
  filterSearchResults() {

    if (this.searchText == null) {
      return
    }
    this.app_service.dataTransmitter({ callsource: this.selectedTab, action: 'search', data: this.searchText });
    // this.app_service.dataTransmitter({ callsource: 'searchOperation', data: this.searchText });

  }
  timezoneDatasource = []
  selectedTimezone: any
  receivedTimeRange: any

  selectedView: any

  availableTabs: any
  allSelectedAnalytics: any = []
  timeFilter: Array<{ name: string, value: string, timeValue: string }> = [
    { name: '30min', value: '30 minutes', timeValue: "LAST_30_MINUTES" },
    { name: '60min', value: '60 minutes', timeValue: "LAST_60_MINUTES" },
    { name: '3hr', value: '3 hour', timeValue: "LAST_3_HOUR" },
    { name: '6hrs', value: '6 hours', timeValue: "LAST_6_HOUR" },
    { name: '12hrs', value: '12 hours', timeValue: "LAST_12_HOUR" },
    { name: '24hrs', value: '24 hours', timeValue: "LAST_24_HOUR" },
    { name: '3days', value: '3 days', timeValue: "LAST_3_DAYS" },
    { name: '7days', value: '7 days', timeValue: "LAST_7_DAYS" },
    { name: '1mons', value: '1 months', timeValue: "LAST_1_MONTH" },
    { name: '3mons', value: '3 months', timeValue: "LAST_3_MONTH" },
    { name: 'setCustom', value: 'Set Custom', timeValue: "" },
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

  onSelctTime(timeItem) {
    this.selectedTime = timeItem?.name;
    if (this.selectedTime == "setCustom") {
      return;
    }

    this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: { type: 'setEnum', value: timeItem?.timeValue } });
    this.closeTimeFilterDropdown();
  }

  applyCustomFilter() {
    // console.log("fromDate: ", this.fromDatevalue, " toDate: ", this.toDateValue);
    this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: { type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() } });
    this.closeTimeFilterDropdown();
  }

  closeTimeFilterDropdown() {
    this.toggleButton.nativeElement.click();
  }
  getTimezones() {

    var form_url = environment.BASE_OPKEY_URL + "Application/GetTimeZones";
    var form_data = {};

    this.app_service.make_get_server_call(form_url, form_data).subscribe(
      (result: any) => {

        this.timezoneDatasource = result;
        this.selectedTimezone = this.timezoneDatasource.find(ele => ele.Id == 'India Standard Time');
        this.cdr.detectChanges();
      },
      (error) => {

      }
    );


  }

  @Output() onEditableChange = new EventEmitter<boolean>();

  Editable = false
  toggleEdit() {
    this.Editable = !this.Editable
    this.onEditableChange.emit(this.Editable)

  }



}
