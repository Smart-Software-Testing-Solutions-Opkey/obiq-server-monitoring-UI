import { Component, OnInit, output } from '@angular/core';
import { WindowState } from '@progress/kendo-angular-dialog';
@Component({
  selector: 'app-envrionment-common-filter',
  templateUrl: './envrionment-common-filter.component.html',
  styleUrl: './envrionment-common-filter.component.scss'
})
export class EnvrionmentCommonFilterComponent implements OnInit {
  constructor(){

  }

  onFilterSelected = output<any>();
  changeApplication(val){
    let obj = {...this.modelObj}
    obj.modelApplication = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    this.sendFilterData()
  }
  filterCount = 0
  ngOnInit(): void {
    this.sendFilterData()
  }
  searched(val){
    this.sendFilterData()
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
    let obj = {...this.modelObj}
    obj.modelEnvironment = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    this.sendFilterData()
  }
  modelObj = {
    modelApplication:"ORACLEFUSION",
    modelSearch:null,
    modelEnvironment:null,
    modelProcess:null,
    modelStrModule:null,
    modelUser:null,
    modelBrowserList:null,
    modelStatus:null,
    modelDate:{
      from:null,
      to:null
    }
  }

  changeProcess(val){
    let obj = {...this.modelObj}
    obj.modelProcess = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    this.sendFilterData()
  }
  changeErpModule(e){
    this.sendFilterData()
  }
  changeUser(val){
    let obj = {...this.modelObj}
    obj.modelUser = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    this.sendFilterData()
  }
  
  sendFilterData(){
    this.onFilterSelected.emit(this.modelObj)
  }
}
