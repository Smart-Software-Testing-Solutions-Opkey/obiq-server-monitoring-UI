import { Component, Input, output } from '@angular/core';
import { NotificationType } from 'src/app/global/enums';
import { NotificationsService } from 'src/app/services/notification-service/notifications.service';

@Component({
  selector: 'app-navigator-left-tree-view',
  templateUrl: './navigator-left-tree-view.component.html',
  styleUrl: './navigator-left-tree-view.component.scss'
})
export class NavigatorLeftTreeViewComponent {

  constructor(
    public service_notification : NotificationsService
  ){
  
  }

  ngOnInIt(){

  }
  ngAfterViewInit(): void{
    
  }
  selectedView:any
  analyticsTypes:any
  
  @Input('child_data') set child_data({analyticsTypes,selectedView  }) {
    debugger
    if(analyticsTypes && selectedView ){

      this.selectedView = selectedView
      this.analyticsTypes = analyticsTypes
      this.selectedView.selected = true
      this.treeSelectionChange.emit({})
    }
  }
  selectedAnalyticsType:any = {}
  treeSelectionChange = output<any>()

  changeAnalyticsSelection(item){
    debugger
   
    this.analyticsTypes.forEach((ele)=>{
      if(ele.isSelected){
        ele.isSelected = false
      }
    })
   
    item.isSelected = true
    this.selectedAnalyticsType = item
    this.selectedView.selected = false
    this.treeSelectionChange.emit(this.selectedAnalyticsType)
    this.service_notification.notifier(NotificationType.success, 'Data source selected');

  }
  changeViewSelection(){
    debugger
    this.analyticsTypes.forEach((ele)=>{
        ele.isSelected = false
    })
    this.selectedView.selected = true
    this.treeSelectionChange.emit({})

  }
  isOpenNode = true
  toggleNode(){
    this.isOpenNode = !this.isOpenNode
  }
}
