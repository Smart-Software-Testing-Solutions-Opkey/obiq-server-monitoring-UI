import { Injectable } from '@angular/core';
import { AppDataService } from './app-data.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgboxDialogComponent } from '../environment/environment-common/msgbox-dialog/msgbox-dialog.component';
import { NotificationsService } from './notification-service/notifications.service';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../global/enums';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { guid } from '@progress/kendo-angular-dropdowns/common/util';


@Injectable({
  providedIn: 'root'
})
export class MsgboxService {

  constructor(
    public service_data: AppDataService,
    private modalService: NgbModal,
    public service_notification: NotificationsService,
    private router: Router,
    public app_service: AppService,

  ) { }

  display_error_message(errorObj) {


    let errorId = errorObj.errorId ? errorObj.errorId : this.uuidv4();
    if (errorObj.hasOwnProperty('error')) {
      this.service_data.errorObj = errorObj;

      let errMsg = ''
      if(errorObj && errorObj.error && errorObj.error.message ){
         errMsg =  errorObj?.error?.message
      }
      else{
        errMsg = 'Something went wrong.An unexpected error occured.'
      }
     
      this.confirm_msg_box('error', `${errMsg} <br> Trace : ${errorId}`, [{ text: "Report Issue", primaryBtn: true, value: "report" }, { text: "Close", primaryBtn: false, value: "close" }]).then((result => {
        if (result == "report") {
          this.reportErrorViaMail(errorId)
        }
      }));
    }
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

  confirm_msg_box(type, msg, buttons) {


    let modalInstance = this.modalService.open(MsgboxDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      size: '.modal-sm',
      centered: true,
      windowClass: 'layout-modal transition-none',

    });
    modalInstance.componentInstance.buttons = buttons
    modalInstance.componentInstance.type = type
    modalInstance.componentInstance.msg = msg
    return modalInstance.result.then((result) => result).catch(() => null);
  }

  reportErrorViaMail(errorId: any) {
    let url = this.router.url;
    let exceptionMsg = this.service_data.errorObj.error.error + ' url' + url + 'message ' + this.service_data.errorObj.message;
    let form_url = environment.BASE_OPKEY_URL + "ExceptionHandler/ReportErrorViaMail";
    let form_data = {
      errorId: this.service_data.errorObj.errorId,
      exception: exceptionMsg
    }
    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.service_notification.notifier(NotificationType.success, 'Reported Successfully');
          }

        },
        error: (error: any) => {
          this.service_notification.notifier(NotificationType.error, "Something went wrong.");
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }

}
