import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-environment-manager-main-right',
  templateUrl: './environment-manager-main-right.component.html',
  styleUrl: './environment-manager-main-right.component.scss'
})
export class EnvironmentManagerMainRightComponent implements OnInit,OnDestroy,AfterViewInit {

  constructor(){}

  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    
  }
  selectedAnalyticsType:any = null
  selectedView:any

  @Input('child_data') set child_data({ selectedAnalyticsType,selectedView }) {
    debugger
    this.selectedAnalyticsType = selectedAnalyticsType;
    if(selectedView){
      this.selectedView = selectedView
    }
    this.bindData()
  }
  
  bindData(){
    if(this.selectedAnalyticsType){
      this.availableTabs = [
        {name:'Overview',val:'overview',isVisible:true,isSelected:true},
        {name:'Log',val:'log',isVisible:true,isSelected:false},
        {name:'Time Explorer',val:'timeexplorer',isVisible:false,isSelected:false},
        {name:'Telemetry',val:'telemetry',isVisible:false,isSelected:false},
      ]
    }
    else {
      this.availableTabs = [
        {name:'Overview',val:'overview',isVisible:true,isSelected:true},
        {name:'Log',val:'log',isVisible:true,isSelected:false},
        {name:'Time Explorer',val:'timeexplorer',isVisible:true,isSelected:false},
        {name:'Telemetry',val:'telemetry',isVisible:true,isSelected:false},
        
        
      ]
    }


  }
  selectedTab:any = {name:'Overview',val:'overview',isVisible:true,isSelected:true}

  changeSelectedTab(tab){
    // this.selectedTab = val
    this.availableTabs.forEach((ele)=>{
      if(ele.isSelected){
        ele.isSelected = false
      }
    })
    tab.isSelected = true
    this.selectedTab = tab

  }
  availableTabs = [
    {name:'Overview',val:'overview',isVisible:true,isSelected:true},
    {name:'Log',val:'log',isVisible:true,isSelected:false},
    {name:'Time Explorer',val:'timeexplorer',isVisible:true,isSelected:false},
    {name:'Telemetry',val:'telemetry',isVisible:true,isSelected:false},
    
    
  ]
}
