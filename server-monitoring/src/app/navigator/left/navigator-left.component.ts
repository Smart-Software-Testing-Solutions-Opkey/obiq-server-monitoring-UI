import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ConfigurationSettingsComponent } from 'src/app/environment/configure/configuration-settings/configuration-settings.component';
import { NotificationType } from 'src/app/global/enums';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';
import { NotificationsService } from 'src/app/services/notification-service/notifications.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navigator-left',
  templateUrl: './navigator-left.component.html',
  styleUrls: ['./navigator-left.component.scss']
})
export class NavigatorLeftComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    private cdr: ChangeDetectorRef,
    public service_notification: NotificationsService,
    private msgbox: MsgboxService


  ) { }
  ngAfterViewInit(): void {
    // this.app_service.routeTo('environment', 'summary')
  }

  onLeftPanelDataChange = output<any>()

  dataChanged = {
    "viewSelected": {},
    "settingsPanel": { isOpen: false, selectedViewSettings: {} },
    "analyticsTypes": {},
    "selectedTab": {},
    "allSelectedAnalytics": []
  }

  ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }

  subscriptions: Subscription[] = [];

  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  data_reciver() {
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
        // if (data == "viewCreated") {
        //   this.getAllVIews();
        //   this.cdr.detectChanges();
        // }
        if (data.type == "view_ops") {
          if (data.data.action == "view_created") {
            this.totalViews.push(data.data.selected_view);
          }
        }
        else if (data?.callsource == 'settings') {
          if (data?.data == 'backToMenu') {
            this.backToMenu()

          } else if (data?.data?.selected_view) {
            this.selectedViewSettings = data.data.selected_view;
            this.getAllVIews("settings");
            this.cdr.detectChanges();
          }
        }
      }
    });
    this.subscriptions.push(data_receiver);
  }
  ngOnInit(): void {
    this.data_reciver();
    this.isopenSettings = window.location.href.includes('settings');

    this.getAllVIews(this.isopenSettings);

  }
  selectedView: any = {}

  analyticsTypes: any;

  selectedAnalyticsType: any = {}



  change_view(selected_item: any) {

    console.log("selected_item==", selected_item);
  }
  changeAnalyticsSelection(item) {

    this.selectedAnalyticsType = item
    this.dataChanged.analyticsTypes = this.selectedAnalyticsType
    this.onLeftPanelDataChange.emit(this.dataChanged)

  }

  viewList = [
    'view1',
    'view2',
    'view3'
  ]

  totalViews = [];
  get_Selected_View_DataSource(selectedVIew) {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceListByViewId";

    let form_data = { viewId: selectedVIew.viewId };
    window.loadingStart("#navigator-left", "Please wait");
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          window.loadingStop("#navigator-left");

          //hidding Test Automation Analytics and System Diagnostics Analytics
          this.analyticsTypes = result.filter(item =>
            item.name !== "Test Automation Analytics" && item.name !== "System Diagnostics Analytics"
          );

          this.analyticsTypes.forEach((item, index) => {
            item.display = index === 0;
          });

          this.bind_selected_view(this.selectedView)


        },
        error: (error: any) => {
          window.loadingStop("#navigator-left");
          console.warn(error);
          this.msgbox.display_error_message(error);

        },
        complete: () => {
          console.log("Completed");
        }
      });
  }


  bind_selected_view(selectedView) {
    this.dataChanged.allSelectedAnalytics = this.analyticsTypes
    this.dataChanged.viewSelected = selectedView;
    this.service_data.selected_view_data = this.dataChanged;

    let queryParams = `viewType=${selectedView.name || selectedView.viewName}`
    this.app_service.routeTo('environment', `summary/${selectedView.viewId}`, queryParams)
  }
  set_Selected_VIew(selectedVIew, source) {

    window.loadingStart("#navigator-left", "Please wait");
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/setSelectedView";

    let form_data = {
      viewId: selectedVIew.viewId,
      userId: this.dataService.UserDto.UserDTO.U_ID,
      projectId: this.dataService.UserDto.ProjectDTO.P_ID
    };

    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
        window.loadingStop("#navigator-left");
        if (source != 'init') {
          this.service_notification.notifier(NotificationType.success, 'View selected');
        }
        this.get_Selected_View_DataSource(result)



      },
      error: (error: any) => {
        window.loadingStop("#navigator-left");
        console.warn(error);
        this.msgbox.display_error_message(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }




  getAllVIews(callsource?) {



    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/getAllViewsOfCurrentUser";

    let form_data = {
      userId: this.dataService.UserDto.UserDTO.U_ID,
      projectId: this.dataService.UserDto.ProjectDTO.P_ID
    }
    window.loadingStart("#navigator-left", "Please wait");
    this.app_service.make_post_server_call(form_url, form_data).subscribe({

      next: (result: any) => {
        window.loadingStop("#navigator-left");
        if (result == null || result?.length == 0) {
          this.router.navigateByUrl('/environment/configure');
          return;
        }

        this.service_data.viewsData = result;
        this.totalViews = result;
        if (this.isopenSettings) { return }

        let selectedView =this.totalViews.find( (view)=> view.selected)

        this.viewChanged(selectedView ? selectedView :this.totalViews[this.totalViews.length - 1] , 'init')
        // this.selectedView = this.totalViews[this.totalViews.length - 1];
        // if (callsource == "settings") {
        //   this.selectedViewSettings = this.selectedViewSettings
        // }
        // else {
        //   this.selectedViewSettings = this.selectedView;
        // }
        // this.app_service.dataTransmitter({ data: result, action: "editDisabled", selectedView: this.selectedViewSettings });

        // this.dataChanged.viewSelected = this.selectedView
        // this.set_Selected_VIew(this.selectedView)



      },
      error: (error: any) => {
        window.loadingStop("#navigator-left");
        console.warn(error);
        this.msgbox.display_error_message(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  add_environment() {
    const modalRef = this.modalService.open(ConfigurationSettingsComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'full',
      centered: true,
      windowClass: 'layout-modal transition-none'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
      else if (response == 'create_environment')
        this.select_service_data();
    });
  }

  select_service_data() {

    this.service_data.is_env_configure = true;
    this.router.navigate(['/environment']);
  }

  viewChanged(val, source?) {
    this.service_data.selected_view_data.analyticsTypes = {}
    this.selectedView = val
    this.set_Selected_VIew(this.selectedView, source)
  }

  changeToView() {
    this.selectedAnalyticsType = {}
    this.analyticsTypes.forEach((ele) => {
      if (ele.isSelected) {
        ele.isSelected = false
      }
    })
    this.dataChanged.analyticsTypes = this.selectedAnalyticsType
    this.dataChanged.allSelectedAnalytics = this.analyticsTypes
    this.onLeftPanelDataChange.emit(this.dataChanged)

  }

  isopenSettings: boolean = false
  selectedView2: any = {}
  openSettings() {

    this.isopenSettings = true

    this.selectedView2 =this.totalViews.filter( view=> view.viewId == this.selectedView.viewId)
    this.selectedViewSettings = this.selectedView2[0];
    this.dataChanged.viewSelected = this.selectedView2[0]
    this.dataChanged.allSelectedAnalytics = this.analyticsTypes
    this.dataChanged.analyticsTypes['isSelected'] = false
    this.dataChanged.settingsPanel = { isOpen: this.isopenSettings, selectedViewSettings: this.selectedViewSettings }
    this.onLeftPanelDataChange.emit(this.dataChanged)
    this.service_data.selected_view_data = this.dataChanged;
    this.app_service.routeTo('environment', `settings/${this.selectedViewSettings.viewId}`)

  }
  backToMenu() {
    this.isopenSettings = false
    this.selectedViewSettings = this.selectedView;
    this.dataChanged.allSelectedAnalytics = this.analyticsTypes
    this.dataChanged.analyticsTypes = {}
    this.dataChanged.settingsPanel = { isOpen: this.isopenSettings, selectedViewSettings: this.selectedViewSettings }
    this.service_data.selected_view_data = this.dataChanged
    this.viewChanged(this.selectedView, 'init')

  }

  selectedViewSettings: any = {}

  settingsViewSelect(val) {
    // this.selectedViewSettings = val;
    this.dataChanged.allSelectedAnalytics = this.analyticsTypes
    // this.selectedViewSettings = val
    this.dataChanged.settingsPanel = val
    this.onLeftPanelDataChange.emit(this.dataChanged)
    // this.onSettingsSelected.emit(val)

  }
  Rename_Selected_View(view) {

  }
  Delete_Selected_View(view) {

    window.loadingStart("#navigator-left", "Please wait");
    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/deleteView";

    let form_data = {
      viewId: view.viewId,
      projectId: this.dataService.UserDto.ProjectDTO.P_ID
    }

    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          window.loadingStop("#navigator-left");
          this.totalViews = this.totalViews.filter(item => item.viewId !== view.viewId)

          if (this.totalViews.length < 1) {
            this.router.navigateByUrl('/environment/configure')
          }
          this.selectedView = this.totalViews[this.totalViews.length - 1]
          this.dataChanged.allSelectedAnalytics = this.analyticsTypes
          this.dataChanged.viewSelected =  this.selectedView ;
          this.service_data.selected_view_data = this.dataChanged;

        },
        error: (error: any) => {
          window.loadingStop("#navigator-left");
          console.warn(error);
          this.msgbox.display_error_message(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }

  selectionChanged(val) {
   if(val){
    val["viewAccessTypePermision"]  = this.selectedView.viewAccessTypePermision
    val["userId"]  = this.selectedView.userId
   }
    this.dataChanged.analyticsTypes = val || {}
    this.bind_selected_view(val || this.selectedView);
    // this.onLeftPanelDataChange.emit(this.dataChanged)
  }

  Favorite_View(views) {
    this.totalViews = views
  }

}
