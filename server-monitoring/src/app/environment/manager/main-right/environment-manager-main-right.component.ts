import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

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

  selectedTab:string = 'overview'

  changeSelectedTab(val:string){
    this.selectedTab = val
  }
}
