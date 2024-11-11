import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NotificationType } from 'src/app/global/enums';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private notificationService: NotificationService) { }

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
}
