import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-environment-manager-main-right-overview-tab',
  templateUrl: './environment-manager-main-right-overview-tab.component.html',
  styleUrl: './environment-manager-main-right-overview-tab.component.scss'
})
export class EnvironmentManagerMainRightOverviewTabComponent implements OnInit,OnDestroy {

  constructor(){
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }
  @Input() view:any
  applicationTotalData:any = [{
    applicationName : 'Oracle Fusion',
    cpu:'02.68',
    ram:'08.89',
    health:'good',
  },
  {
    applicationName : 'Sap',
    cpu:'09.68',
    ram:'80.89',
    health:'good',
  }
]
}
