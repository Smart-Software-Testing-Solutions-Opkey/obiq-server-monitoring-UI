import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-summary-details',
  templateUrl: './view-summary-details.component.html',
  styleUrl: './view-summary-details.component.scss'
})
export class ViewSummaryDetailsComponent {

  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    debugger
    this.obj_configuration_setting = obj_configuration_setting;
  }

}
