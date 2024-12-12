import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NotificationType } from 'src/app/global/enums';
import { AppDataService } from '../app-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersisterModalComponent } from 'src/app/environment/environment-common/persister-modal/persister-modal.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private notificationService: NotificationService,
    public service_data: AppDataService,
    private modalService: NgbModal,
    ) { }

  public notifier(type: NotificationType, content, customHideAfter?: number): void {
    const hideAfter = customHideAfter !== undefined ? customHideAfter : 2500;
    this.notificationService.show({
      content: content,
      hideAfter: hideAfter,
      cssClass: 'notification-box',
      position: { horizontal: "right", vertical: "bottom" },
      animation: { type: "fade", duration: 600 },
      type: { style: type, icon: true },
      closable: false,
    });
  }
  public showPersister(){
    this.service_data.modalSubInstance = this.modalService.open( PersisterModalComponent,{
      backdrop: 'static',
      keyboard: false,
      size: '.modal-sm',
      centered: true,
      windowClass: 'layout-modal transition-none'
    });
  }
}
