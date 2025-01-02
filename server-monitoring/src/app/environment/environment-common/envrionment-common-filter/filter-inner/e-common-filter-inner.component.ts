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
  FromDate:any
  ToDate:any
  FromDay:any
  ToDay:any
  @Input('child_data') set child_data({filterObj }) {
    if(filterObj){
      this.filterObj = filterObj
    
     if(filterObj?.modelFromDate!=null) this.FromDate = new Date(filterObj?.modelFromDate?.year, filterObj?.modelFromDate?.month - 1, filterObj?.modelFromDate?.day);
     if(filterObj?.modelFromDate!=null)  this.ToDate=new Date(filterObj?.modelToDate?.year, filterObj?.modelToDate?.month - 1, filterObj?.modelToDate?.day);
     if(filterObj?.modelFromDate!=null)  this.FromDay= this.getDay(this.FromDate)
     if(filterObj?.modelFromDate!=null) this.ToDay=this.getDay(this.ToDate)
     
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
  getDay(dateNew)
{
    let  day = dateNew.getDate(), ordinal = 'th';
    if (day == 2 || day == 22) ordinal = 'nd';
    if (day == 3 || day == 23) ordinal = 'rd';
    if (day == 21 || day == 1 || day == 31) ordinal = 'st';
    return day + '' + ordinal;
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
