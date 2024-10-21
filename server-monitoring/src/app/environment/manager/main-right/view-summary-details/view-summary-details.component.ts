import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-summary-details',
  templateUrl: './view-summary-details.component.html',
  styleUrl: './view-summary-details.component.scss'
})
export class ViewSummaryDetailsComponent implements OnInit ,AfterViewInit  {

  obj_configuration_setting:any;

  @Input('child_data') set child_data({ obj_configuration_setting }) {
    debugger
    this.obj_configuration_setting = obj_configuration_setting;
  }
  @Input() Settings_View_Selection:any
ngOnInit(): void {
  
}
ngOnChanges(changes: SimpleChanges) {
  if (changes['Settings_View_Selection'] && changes['Settings_View_Selection'].currentValue) {
    console.log(this.Settings_View_Selection,"this is =============================")
    this.get_All_Summary_of_Selected_View(this.Settings_View_Selection)
  }
}
get_All_Summary_of_Selected_View(view)
{

}
ngAfterViewInit(): void {
  this.Settings_View_Selection

}


}
