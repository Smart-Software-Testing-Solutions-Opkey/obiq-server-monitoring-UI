import { Component, Input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-e-common-filter-inner',
  templateUrl: './e-common-filter-inner.component.html',
  styleUrl: './e-common-filter-inner.component.scss'
})
export class ECommonFilterInnerComponent implements OnInit {

  constructor(){

  }

  ngOnInit(): void {
    
  }
  innerOps = output<any>()
  filterObj:any = null
  @Input('child_data') set child_data({filterObj }) {
    if(filterObj){
      this.filterObj = filterObj
    }
  }
  actions = {
    clearall:{
      action:'Clear All',
      data: null
    },
    clearone:{
      action:'Clear one',
      data: null
    },

  }

  clearAll(){
// this.filterObj =  {
//   modelApplication:"OracleFusion",
//   modelSearch:null,
//   modelEnvironment:null,
//   modelProcess:null,
//   modelStrModule:null,
//   modelUser:null,
//   modelBrowserList:null,
//   modelStatus:null,
//   modelDate:{
//     from:null,
//     to:null
//   }
// }

this.innerOps.emit(this.actions.clearall)
  }
  clearSelected(model,data,idx){
    let obj = {
      model:model,
      item:data,
      idx:idx
    }
    this.actions.clearone.data = obj
    this.innerOps.emit(this.actions.clearone)
  }


}
