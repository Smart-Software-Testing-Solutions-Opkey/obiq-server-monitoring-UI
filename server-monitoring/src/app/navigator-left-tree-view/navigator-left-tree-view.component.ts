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
  ngAfterViewInit(): void{
    
  }
  selectedView:any
  analyticsTypes:any
  
  @Input('child_data') set child_data({analyticsTypes,selectedView  }) {
    
    if(analyticsTypes && selectedView ){

      this.selectedView = selectedView
      this.analyticsTypes = analyticsTypes
      this.selectedView.selected = true
    }
  }
  selectedAnalyticsType:any = {}
  treeSelectionChange = output<any>()

  changeAnalyticsSelection(item){
    
   
    this.analyticsTypes.forEach((ele)=>{
      if(ele.isSelected){
        ele.isSelected = false
      }
    })
   
    item.isSelected = true
    this.selectedAnalyticsType = item
    this.selectedView.selected = false
    this.treeSelectionChange.emit(this.selectedAnalyticsType)

  }
  changeViewSelection(){
    
    this.analyticsTypes.forEach((ele)=>{
        ele.isSelected = false
    })
    this.selectedView.selected = true
    this.treeSelectionChange.emit(null)

  }
  isOpenNode = true
  toggleNode(){
    this.isOpenNode = !this.isOpenNode
  }
}
