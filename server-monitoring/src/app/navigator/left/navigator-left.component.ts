import { Component, OnInit ,output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationSettingsComponent } from 'src/app/environment/configure/configuration-settings/configuration-settings.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';


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
    private service_data: AppDataService,
    public app_service:AppService,
    public dataService:AppDataService


  ) { }
    
  analyticsValueChange = output<any>()
  onChangeView = output<any>()
  onSettingsSelected = output<any>()



  ngOnInit(): void {
   
    this.getAllVIews();

    this.analyticsValueChange.emit(this.selectedAnalyticsType)
  }
  selectedView:any = {}


  analyticsTypes :any;

  selectedAnalyticsType:any = {}


  change_view(selected_item:any) {
    debugger
    console.log("selected_item==", selected_item);
  }
  changeAnalyticsSelection(item){
    debugger
   
    this.analyticsTypes.forEach((ele)=>{
      if(ele.isSelected){
        ele.isSelected = false
      }
    })
   
      item.isSelected = true
      this.selectedAnalyticsType = item
    
    this.analyticsValueChange.emit(this.selectedAnalyticsType)

  }

  viewList = [
    'view1',
    'view2',
    'view3'
  ]

  totalViews = [];
  set_Selected_View_DataSource(selectedVIew){
    window.loadingStart("#navigator-left", "Please wait");
    let ajax_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/ObiqAgentServerTraceController/getDataSourceListByViewId";
    this.app_service.make_post_server_call(ajax_url, {"viewId":selectedVIew.viewId})
    .subscribe({
      next: (result: any) => {
        window.loadingStop("#navigator-left");
       
      result.forEach((item,index)=>{
        item.display = index === 0
        item.isSelected = index ==0
      })
      this.analyticsTypes = result;
      this.selectedAnalyticsType = result[0];
      this.analyticsValueChange.emit(this.selectedAnalyticsType)
      
     
      },
      error: (error: any) => {
        window.loadingStop("#navigator-left");
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  set_Selected_VIew(selectedVIew){
    debugger;
    window.loadingStart("#navigator-left", "Please wait");
    let ajax_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/setSelectedView";
    this.app_service.make_post_server_call(ajax_url, {"viewId":selectedVIew.viewId,"userId":this.dataService.UserDto.UserDTO.U_ID,"projectId":this.dataService.UserDto.ProjectDTO.P_ID})
    .subscribe({
      next: (result: any) => {
        window.loadingStop("#navigator-left");
        this.set_Selected_View_DataSource(result)
       
     
      },
      error: (error: any) => {
        window.loadingStop("#navigator-left");
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
  getAllVIews(){
    debugger;
    window.loadingStart("#navigator-left", "Please wait");
    let ajax_url =   "https://myqlm.preprod.opkeyone.com/OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/getAllViewsOfCurrentUser";
    this.app_service.make_post_server_call(ajax_url, {"userId":this.dataService.UserDto.UserDTO.U_ID,"projectId":this.dataService.UserDto.ProjectDTO.P_ID})
    .subscribe({
      next: (result: any) => {
        window.loadingStop("#navigator-left");
        this.totalViews = result
        if (this.totalViews && this.totalViews.length > 0) {
          this.selectedView = this.totalViews[0]; 
          this.onChangeView.emit(this.selectedView)
          this.set_Selected_VIew(this.selectedView)
          this.onChangeView.emit(this.selectedView)
        }
    
     
      },
      error: (error: any) => {
        window.loadingStop("#navigator-left");
        console.warn(error);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }
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
    this.selectedView = val
    this.set_Selected_VIew(this.selectedView)
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

  isopenSettings:boolean = false

  openSettings(){
    debugger;
    this.isopenSettings = true
    this.onSettingsSelected.emit({isOpen:this.isopenSettings,selectedViewSettings:this.selectedViewSettings})

  }
  backToMenu(){
    this.isopenSettings = false
    this.onSettingsSelected.emit({isOpen:this.isopenSettings,selectedViewSettings:this.selectedViewSettings})

  }

  selectedViewSettings:any =   {name:'View 01',val:'view01',accessType:'Public'}

  settingsViewSelect(val){
    this.selectedViewSettings = val
    this.onSettingsSelected.emit({isOpen:this.isopenSettings,selectedViewSettings:this.selectedViewSettings})

  }

}
