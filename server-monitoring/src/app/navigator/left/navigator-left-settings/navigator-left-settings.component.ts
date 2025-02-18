import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationSettingsComponent } from 'src/app/environment/configure/configuration-settings/configuration-settings.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/app/services/notification-service/notifications.service';
import { NotificationType } from 'src/app/global/enums';
import { MsgboxService } from 'src/app/services/msgbox.service';

@Component({
  selector: 'app-navigator-left-settings',
  templateUrl: './navigator-left-settings.component.html',
  styleUrl: './navigator-left-settings.component.scss'
})
export class NavigatorLeftSettingsComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService,
    public app_service: AppService,
    public dataService: AppDataService,
    public service_notification: NotificationsService,
    private msgbox: MsgboxService

  ) { }
  ngOnInit(): void {

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
  totalViews: any = []
  isopenSettings: boolean = false
  tempTotalViews: any = []
  isDisabled = false;
  @Input('child_data') set child_data({ totalViews, isopenSettings, selectedViewSettings }) {
    console.log("this is view tree", totalViews)
    this.totalViews = [...totalViews]
    this.tempTotalViews = JSON.parse(JSON.stringify(totalViews))
    this.isopenSettings = isopenSettings;
    let view = this.totalViews.find(val => val.viewId == this.service_data.selected_view_data.viewSelected.id);
    if(view){
      this.service_data.selected_view_data.viewSelected = view;
    }
    this.selectedViewSettings = view ? view : selectedViewSettings
    this.dataService.scrollToParticularElement(this.selectedViewSettings.viewId)

    if (totalViews) {
      this.changeAccessPermission(totalViews)

    }

  }

  changeAccessPermission(totalViews: any) {
    this.service_data.totalViews.data = this.totalViews;
    this.service_data.totalViews.source = 'editDisabled';
    // this.app_service.dataTransmitter({data : this.totalViews,action :"editDisabled"});
    totalViews.forEach((users) => {
      // users.authorizedUsers.forEach((val) => {
      //   if (val.permmission == 'VIEW') {
      //     this.isDisabled = true
      //   }
      //   else if (val.permmission == 'EDIT') {
      //     this.isDisabled = false
      //   }
      // })

      if (users.accessType == "SHARED" || users.accessType == "PUBLIC") {
        if (users.viewAccessTypePermision) {
          if (users.viewAccessTypePermision == 'VIEW') {
            this.isDisabled = true
          }
          else if (users.viewAccessTypePermision == 'EDIT' || users.viewAccessTypePermision == 'ALL') {
            this.isDisabled = false
          }
        }
      }
      else {
        this.isDisabled = false
      }

    })
  }
  @Output() onTotalViewsChange = new EventEmitter<any>();
  selectedViewSettings: any = {}
  onSettingsSelected = output<any>()
  onViewDelete = output<any>()

  settingsViewSelect(val) {
    if (val.accessType == "PUBLIC") {
      this.isDisabled = true;

    }
    this.selectedViewSettings = val;
    this.service_data.selected_view_data.viewSelected = val
    this.app_service.routeTo('environment', `settings/${this.selectedViewSettings.viewId}`)
    // this.onSettingsSelected.emit({ isOpen: this.isopenSettings, selectedViewSettings: this.selectedViewSettings })

  }
  renameSelectedView(view) {
    view['isRenamed'] = true
    setTimeout(() => {
      let ele = document.getElementById('renameInput')
      ele.focus()
    }, 0);

  }
  deleteSelectedView(view) {
    this.onViewDelete.emit(view)
    this.service_notification.notifier(NotificationType.success, 'View is Deleted');
  }
  renameView(view) {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/renameView";

    let form_data = { viewId: view.viewId, viewName: view.viewName, projectId: this.service_data.UserDto.ProjectDTO.P_ID, userId: this.service_data.UserDto.UserDTO.U_ID, };

    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          delete view['isRenamed']
          this.service_notification.notifier(NotificationType.success, 'View Name Changed');

        },
        error: (error: any) => {
          delete view['isRenamed']
          this.msgbox.display_error_message(error);
        }
      });
  }

  starView(view) {
    view['isStarred'] = true
    view['favourite'] = true
    this.totalViews.forEach((item, index) => {
      if (view.viewId == item.viewId) {
        this.totalViews.splice(0, 0, this.totalViews.splice(index, 1)[0])
      }
    })


    this.onTotalViewsChange.emit(this.totalViews)

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/markViewAsFavourite";
    let form_data = { viewId: view.viewId, projectId: this.service_data.UserDto.ProjectDTO.P_ID, userId: this.service_data.UserDto.UserDTO.U_ID, userName: this.service_data.UserDto.UserDTO.UserName };
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          this.service_notification.notifier(NotificationType.success, 'Added to favorites');

        },
        error: (error: any) => {
          this.msgbox.display_error_message(error);
        }
      });


  }
  unStarView(view) {
    delete view['isStarred']
    view['favourite'] = false
    this.totalViews.forEach((item, index) => {
      if (view.viewId == item.viewId) {
        let newInd = this.tempTotalViews.findIndex(ele => ele.viewId == view.viewId)
        this.totalViews.splice(newInd, 0, this.totalViews.splice(index, 1)[0])
      }
    })

    this.onTotalViewsChange.emit(this.totalViews)

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/removeViewFromFavourite";
    let form_data = { viewId: view.viewId, projectId: this.service_data.UserDto.ProjectDTO.P_ID, userId: this.service_data.UserDto.UserDTO.U_ID };
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          this.service_notification.notifier(NotificationType.success, 'Removed from favorites');

        },
        error: (error: any) => {
          this.msgbox.display_error_message(error);
        }
      });
  }



}
