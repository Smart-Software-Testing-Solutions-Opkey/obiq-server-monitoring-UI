import { Component, OnInit } from '@angular/core';
import { WindowState } from '@progress/kendo-angular-dialog';
@Component({
  selector: 'app-envrionment-common-filter',
  templateUrl: './envrionment-common-filter.component.html',
  styleUrl: './envrionment-common-filter.component.scss'
})
export class EnvrionmentCommonFilterComponent implements OnInit {
  constructor(){

  }
  changeApplication(val){
    
  }
  filterCount = 0
  ngOnInit(): void {
    
  }
  searched(val){

  }
  showRightPanel = false
  public windowState: WindowState = "default";
  openRightPanel(){
    this.showRightPanel = true

  }
  closeRightPanel(){
    this.showRightPanel = false
  }
  changeEnvironment(val){

  }

  changeProcess(val){
    
  }
}
