import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-navigator-left-tree-view',
  templateUrl: './navigator-left-tree-view.component.html',
  styleUrl: './navigator-left-tree-view.component.scss'
})
export class NavigatorLeftTreeViewComponent {

  constructor(){}

  ngOnInIt(){

  }
  selectedView:any
  analyticsTypes:any
  
  @Input('child_data') set child_data({analyticsTypes,selectedView  }) {
    debugger
    this.selectedView = selectedView
    this.analyticsTypes = analyticsTypes
  }
  selectedAnalyticsType:any = {}
  analyticsValueChange = output<any>()

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
    
    this.analyticsValueChange.emit(this.selectedAnalyticsType)

  }
  changeViewSelection(){
    debugger
    this.selectedView
    this.analyticsTypes.forEach((ele)=>{
        ele.isSelected = false
    })
    this.selectedView.selected = true
  }
  isOpenNode = true
  toggleNode(){
    this.isOpenNode = !this.isOpenNode
  }
}
