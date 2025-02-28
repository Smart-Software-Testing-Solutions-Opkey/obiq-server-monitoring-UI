import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { ManagerRightPanelComponent } from '../right-panel/manager-right-panel.component';
import { Subscription } from 'rxjs';
import { MsgboxService } from 'src/app/services/msgbox.service';

@Component({
  selector: 'app-environment-manager-main-right',
  templateUrl: './environment-manager-main-right.component.html',
  styleUrl: './environment-manager-main-right.component.scss'
})
export class EnvironmentManagerMainRightComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    private cdr: ChangeDetectorRef,
    private msgbox: MsgboxService
  ) { }

  @Input('viewId') set viewId(val) {
    this.service_data.selected_view_data.viewSelected['viewId'] = val
  }

  isShowSearchText : boolean = false;
  @Input('viewType') set viewChange(val) {
    this.service_data.selected_view_data.viewSelected['viewName'] = val 
    if(this.Editable){
      this.Editable= false;
      this.toggleEdit(this.Editable)
    }
    this.isShowSearchText = !this.isShowSearchText;
    
    
    this.bind_view()
  }


  bind_view() {

    this.selectedView = this.service_data.selected_view_data.viewSelected;
    this.selectedAnalyticsType = this.service_data.selected_view_data.analyticsTypes;
    this.allSelectedAnalytics = this.service_data.selected_view_data.allSelectedAnalytics;

    this.bindData()
  }
  ngOnDestroy(): void {
    this.dataService.isEnablePersister = false;
    this.disposeAllSubscriptions();
  }
  isDataLoaded = false
  searchText: any = "";

  subscriptions: Subscription[] = [];

  forDisablePermissionData: any;

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  selectedTimeDate: any;
  ngOnInit(): void {
    this.data_reciver()
    if(Object.keys(this.dataService.selectedDateTime).length != 0){
      this.selectedTimeDate = this.dataService.selectedDateTime
      this.obj_filter = this.dataService.selectedDateTime
    }

  }

  data_reciver() {
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {

      if (data !== null) {
        if (data.callsource == 'timeExplorerChart') {

          this.receivedTimeRange = data.data;
          console.log('Received Data:', this.receivedTimeRange);

          // Manually trigger change detection
          this.cdr.detectChanges();
        }
        else if (data.callsource == 'ubAllJourney' || data.callsource == 'erpAllJourney' || data.callsource == 'ubAllFunctional' || data.callsource == 'ubAllConsole' || data.callsource == 'ubAllApi' || data.callsource == 'erpAllFunctional') {
          this.isDataLoaded = true
          if (this.service_data.selectedArtifactData.selectedAnalyticsType) {

            this.selectedAnalyticsType = this.service_data.selectedArtifactData.selectedAnalyticsType


          }
          // this.selectedAnalyticsType = selectedAnalyticsType;
          if (this.service_data.selectedArtifactData.selectedView) {

            this.selectedView = this.service_data.selectedArtifactData.selectedView
          }
          if (this.service_data.selectedArtifactData.allSelectedAnalytics) {

            this.allSelectedAnalytics = this.service_data.selectedArtifactData.allSelectedAnalytics
          }
          this.bindData()

        }
        else if (data.action == 'editDisabled') {

          this.forDisablePermissionData = data;

        }
      }

    });
    this.subscriptions.push(data_receiver);
  }
  ngAfterViewInit(): void {
    this.calculateCurrentDate();
  }

  fromDateTime: any;
  toDateTime: any;

  calculateCurrentDate() {

    this.fromDatevalue.setDate(this.fromDatevalue.getDate() - 1);
    this.fromDateTime = this.fromDatevalue.toLocaleString('en-us', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })
    this.toDateTime = this.toDateValue.toLocaleString('en-us', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true });


  }


  timezoneDatasource = []
  selectedTimezone: any
  receivedTimeRange: any
  selectedAnalyticsType: any = {}
  selectedView: any = {}
  selectedTab: any = {}
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

  selectedTime: string = '12hrs';
  public fromDatevalue: Date = new Date();
  public toDateValue: Date = new Date();
  public dateTimeFormat = "MM/dd/yyyy HH:mm";
  @ViewChild('timeFilterToggleButton') toggleButton: ElementRef<HTMLButtonElement>;

  onSelctTime(timeItem) {
    this.selectedTime = timeItem?.name;
    if (this.selectedTime == "setCustom") {
      return;
    }
    // const fromDateTime = new Date();
    // let toDateTime = new Date(fromDateTime);
    // if(this.selectedTime.includes('min')){
    //   toDateTime.setMinutes(fromDateTime.getMinutes() + timeItem?.timeValue);
    // } else if(this.selectedTime.includes("hrs")){
    //   toDateTime.setHours(fromDateTime.getHours() + timeItem?.timeValue)
    // } else if(this.selectedTime.includes('mon')){
    //   toDateTime.setMonth(fromDateTime.getMonth() + timeItem?.timeValue);
    // }

    var currentDateObj = new Date();
    var numberOfMlSeconds = currentDateObj.getTime();

    if (this.selectedTime.includes('30min')) {
      var newDateObj = new Date(numberOfMlSeconds - (30 * 60 * 1000));
    }
    else if (this.selectedTime.includes('60min')) {
      var newDateObj = new Date(numberOfMlSeconds - (60 * 60 * 1000));
    }
    else if (this.selectedTime.includes('3hr')) {
      var newDateObj = new Date(numberOfMlSeconds - (3 * 60 * 60 * 1000));
    }
    else if (this.selectedTime.includes('6hr')) {
      var newDateObj = new Date(numberOfMlSeconds - (6 * 60 * 60 * 1000));
    }
    else if (this.selectedTime.includes('12hr')) {
      var newDateObj = new Date(numberOfMlSeconds - (12 * 60 * 60 * 1000));
    }
    else if (this.selectedTime.includes('24hr')) {
      var newDateObj = new Date(numberOfMlSeconds - (24 * 60 * 60 * 1000));
    }
    else if (this.selectedTime.includes('3day')) {
      var newDateObj = new Date(numberOfMlSeconds - (3 * 24 * 60 * 60 * 1000));
    }
    else if (this.selectedTime.includes('7day')) {
      var newDateObj = new Date(numberOfMlSeconds - (7 * 24 * 60 * 60 * 1000));
    }
    else if (this.selectedTime.includes('1mon')) {
      var newDateObj = new Date(currentDateObj.setMonth(currentDateObj.getMonth() - 1))
    }
    else if (this.selectedTime.includes('3mon')) {
      var newDateObj = new Date(currentDateObj.setMonth(currentDateObj.getMonth() - 3))
    }
    this.fromDateTime = newDateObj.toLocaleString('en-us', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })


    // console.log("from : ", fromDateTime, " To : ", toDateTime);
    this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: { type: 'setEnum', value: timeItem?.timeValue } });
    this.closeTimeFilterDropdown();
  }

  applyCustomFilter() {
    // console.log("fromDate: ", this.fromDatevalue, " toDate: ", this.toDateValue);
    this.app_service.setStreamData({ type: "getDataWithTime", timeFilter: { type: 'setCustom', fromTimeInMillis: this.fromDatevalue.getTime(), toTimeInMillis: this.toDateValue.getTime() } });
    this.fromDateTime = this.fromDatevalue.toLocaleString('en-us', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })
    this.toDateTime = this.toDateValue.toLocaleString('en-us', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true });
    this.closeTimeFilterDropdown();
  }

  closeTimeFilterDropdown() {
    this.toggleButton.nativeElement.click();
  }

  get_Tab_Control_List(AnalysticsType) {
    // window.loadingStart("#Env_manager_main_right", "Please wait");
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceTabControlList";

    let form_data = { systemId: AnalysticsType.systemId };

    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
        // window.loadingStop("#Env_manager_main_right");

        result.forEach((item, index) => {
          if (item.enumType == "OVERVIEW_TAB") {
            item.isVisible = true
            item.isSelected = true
          }
          else {
            item.isVisible = true;
            item.isSelected = false;
          }

        })
        this.availableTabs = result
        this.selectedTab = result[0]
      },
      error: (error: any) => {
        // window.loadingStop("#Env_manager_main_right");
        this.msgbox.display_error_message(error);
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  bindData() {

    if (Object.keys(this.selectedAnalyticsType).length != 0) {

      if (this.selectedAnalyticsType.hasOwnProperty('type')) {
        this.get_Tab_Control_List(this.selectedAnalyticsType)
      }

    }
    else {
      this.availableTabs = [
        {
          "enumType": "OVERVIEW_TAB",
          "text": "Overview",
          'isVisible': true,
          'isSelected': true
        },
        {
          "enumType": "LOG_TAB",
          "text": "Error Log",
          'isVisible': true,
          'isSelected': false
        },
      ]

      this.selectedTab = this.availableTabs[0]
    }


  }


  changeSelectedTab(tab) {

    // this.selectedTab = val
    this.availableTabs.forEach((ele) => {
      if (ele.isSelected) {
        ele.isSelected = false
      }
    })
    tab.isSelected = true
    this.selectedTab = tab
    this.selectedTime = 'setCustom';
  }

  addWidget() {
    const modalRef = this.modalService.open(ManagerRightPanelComponent, {
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
    modalRef.componentInstance.selectedItem = { callsource: 'addWidget' };
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
  toggleEdit(val) {
    this.Editable = val
  }
  Editable = false
  get isSelectedAnalyticsTypeEmpty(): boolean {
    return Object.keys(this.selectedAnalyticsType).length === 0;
  }


  isRefresh: boolean = false;
  // refreshPage(){
  //     this.isRefresh = true;
  //     this.app_service.dataTransmitter({callsource:'widgetOperation',data:this.isRefresh});
  // }

  // clearSearch(){
  //   this.searchText = ''
  //   this.filterSearchResults()
  // }
  // filterSearchResults(){

  //     if(this.searchText == null){
  //       return
  //     }

  //       this.app_service.dataTransmitter({callsource:'searchOperation',data:this.searchText});

  //   }
   obj_filter = null
  changeFilter(val) {

    this.obj_filter =((val)) ;
    // this.app_service.dataTransmitter({ callsource: this.selectedTab.enumType, action: 'filterChange', selectedAnalyticsType: this.selectedAnalyticsType, objFilter: val });


  }

  changeTimeFilter(val){
    this.obj_filter = JSON.parse(JSON.stringify(val))
    this.cdr.detectChanges();
  }


}
