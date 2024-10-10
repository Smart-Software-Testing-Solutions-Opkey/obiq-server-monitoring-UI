import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-environment-manager-main-right-log-tab-details',
  templateUrl: './environment-manager-main-right-log-tab-details.component.html',
  styleUrl: './environment-manager-main-right-log-tab-details.component.scss'
})
export class EnvironmentManagerMainRightLogTabDetailsComponent implements OnInit,OnDestroy  {

  constructor(){

  }
  selectedData:any
  dataKeys:any = []
  dataValues:any = []
  tabSelected:string = 'Trace'
  @Input('child_data') set child_data({ selectedData }) {
    debugger
    this.selectedData = selectedData
    this.dataKeys = Object.keys(this.selectedData)
    this.dataValues = Object.values(this.selectedData)

  }
  ngOnInit(): void {
    
  }
  
  ngOnDestroy(): void {
    
  }
  changeSelectedTab(tab){
    this.tabSelected = tab
  }

}
