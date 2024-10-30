import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-manager-main-right-log-tab-details-info',
  templateUrl: './manager-main-right-log-tab-details-info.component.html',
  styleUrl: './manager-main-right-log-tab-details-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerMainRightLogTabDetailsInfoComponent {
  @Input() selectedData: object = null;
  selectedTab: string = "summarizedLog"


}
