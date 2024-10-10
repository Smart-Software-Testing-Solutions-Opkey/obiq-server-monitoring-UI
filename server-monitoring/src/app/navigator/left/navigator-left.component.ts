import { Component, OnInit ,output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RightPanelAddEnvironmentComponent } from 'src/app/environment/manager/right-panel/right-panel-add-environment.component';
import { ConfigurationSettingsComponent } from 'src/app/environment/configure/configuration-settings/configuration-settings.component';
import { AppDataService } from 'src/app/services/app-data.service';


@Component({
  selector: 'app-navigator-left',
  templateUrl: './navigator-left.component.html',
  styleUrls: ['./navigator-left.component.scss']
})
export class NavigatorLeftComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService

  ) { }
    
  analyticsValueChange = output<any>()
  onChangeView = output<any>()


  ngOnInit(): void {
    this.onChangeView.emit(this.selectedView)
  
  }
  selectedView:any = {name:'View 01',val:'view01',accessType:'Public'}
  array_sidebar_menu = [
    {
      display: true,
      displayname: "PROD_US",
      view: "PROD_US",
      submenu: [
        { display: true, displayname: "Oracle EBS", status: "Not configured", view: "OracleEBS"},
        { display: true, displayname: "IIS", status: "Not configured", view: "IIS"},
        { display: true, displayname: "MySQL", status: "Not configured", view: "MySQL"},
      ]
    },
    {
      display: true,
      displayname: "Opkey QA",
      view: "OpkeyQA",
      submenu: [
        { display: true, displayname: "Workday", status: "Not configured", view: "Workday"},
        { display: true, displayname: "IIS 01", status: "Not configured", view: "IIS"},
        { display: true, displayname: "IIS 02", status: "Not configured", view: "IIS"},
        { display: true, displayname: "Redis", status: "Not configured", view: "redis"},
      ]
    }
  ];

  analyticsTypes = [
    {name:'ERP Analytics',val:'erp',display:true,isSelected:false},
    {name:'User Behaviour Analytics',val:'userbehaviour',display:true,isSelected:false},
    {name:'System Diagnostics',val:'systemdiagnostics',display:true,isSelected:false},
    {name:'Test Automation Analysis',val:'testautomation',display:true,isSelected:false}


  ]

  selectedAnalyticsType:any


  change_view(selected_item:any) {
    debugger
    console.log("selected_item==", selected_item);
  }
  changeAnalyticsSelection(item){
    debugger
    let isSameType = false
    this.analyticsTypes.forEach((ele)=>{
      if(ele.isSelected){
        ele.isSelected = false
        if(ele.val == item.val){
          isSameType = true
        }
      }
    })
    if(!isSameType){
      item.isSelected = true
      this.selectedAnalyticsType = item
    }
    else{
      this.selectedAnalyticsType = null
    }
    this.analyticsValueChange.emit(this.selectedAnalyticsType)

  }

  viewList = [
    'view1',
    'view2',
    'view3'
  ]

  totalViews = [
    {name:'View 01',val:'view01',accessType:'Public'},
    {name:'View 02',val:'view02',accessType:'Private'},
    {name:'View 03',val:'view03',accessType:'Custom'}

  ]
  add_environment() {
    const modalRef = this.modalService.open( ConfigurationSettingsComponent,{
      backdrop: 'static',
      keyboard: false,
      size: 'full',
      centered: true,
      windowClass: 'layout-modal transition-none'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
      else if(response == 'create_environment')
      this.select_service_data();
    });
  }

  select_service_data() {
    debugger;
    this.service_data.is_env_configure = true;
    this.router.navigate(['/environment']);
  }

  viewChanged(val){
    debugger
    this.selectedView
    this.onChangeView.emit(this.selectedView)

  }

  changeToView(){
    this.selectedAnalyticsType = null
    this.analyticsTypes.forEach((ele)=>{
      if(ele.isSelected){
        ele.isSelected = false
      }
    })
    this.analyticsValueChange.emit(this.selectedAnalyticsType)

  }

}
