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
    // this.sendFilterData()
  }
  filterCount = 0
  ngOnInit(): void {
    this.sendFilterData()
  }
  searched(val){
    this.modelObj.modelSearch=val;
    // this.sendFilterData()
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
    // this.sendFilterData()
  }
  modelObj = {
    modelApplication:"OracleFusion",
    modelSearch:null,
    modelEnvironment:null,
    modelProcess:null,
    modelStrModule:null,
    modelUser:null,
    modelBrowserList:null,
    modelStatus:null,
    modelDate:null
  }
  tempObj = {
    modelApplication:"OracleFusion",
    modelSearch:null,
    modelEnvironment:null,
    modelProcess:null,
    modelStrModule:null,
    modelUser:null,
    modelBrowserList:null,
    modelStatus:null,
    modelDate:null
  }
  

  changeProcess(val){
    let obj = {...this.modelObj}
    obj.modelProcess = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    // this.sendFilterData()
  }
  changeErpModule(val){
    let obj = {...this.modelObj}
    obj.modelStrModule = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    // this.sendFilterData()
  }
  changeUser(val){
    let obj = {...this.modelObj}
    obj.modelUser = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    // this.sendFilterData()
  }

  changeStatus(val){
    let obj = {...this.modelObj}
    obj.modelStatus = val
    this.modelObj= JSON.parse(JSON.stringify(obj))
    // this.sendFilterData() 
  }
  
  sendFilterData(){
    this.onFilterSelected.emit(this.modelObj)
  }
  innerOps(val){
    if(val?.action == 'Clear All'){
      this.modelObj = {...this.tempObj}
    }
    else if(val?.action == 'Clear one'){
      if(typeof(this.modelObj[val?.data?.model]) != 'string'){
        let obj = {...this.modelObj}
        obj = JSON.parse(JSON.stringify(obj))
        obj[val?.data?.model].splice(val?.data?.idx,1)
        this.modelObj = {...obj}
      }
    }
  }
  returnCount(){
    return Object.values(this.modelObj).filter(ele=>ele != null).length
  }
}
