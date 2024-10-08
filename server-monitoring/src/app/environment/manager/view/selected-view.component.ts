import { Component } from '@angular/core';

@Component({
  selector: 'app-selected-view',
  templateUrl: './selected-view.component.html',
  styleUrl: './selected-view.component.scss'
})
export class SeletedViewComponent {

  selectedTab: string = 'overview';

  onTabSelect(tab: string) {
    this.selectedTab = tab;
  }

}
