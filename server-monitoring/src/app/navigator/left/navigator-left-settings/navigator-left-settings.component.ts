import { Component, Input, OnInit ,Output,output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationSettingsComponent } from 'src/app/environment/configure/configuration-settings/configuration-settings.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-navigator-left-settings',
  templateUrl: './navigator-left-settings.component.html',
  styleUrl: './navigator-left-settings.component.scss'
})
export class NavigatorLeftSettingsComponent implements OnInit  {
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService,
    public app_service:AppService,
    public dataService:AppDataService,
    private cdr: ChangeDetectorRef,


  ) { }

  totalViews = [];
  selectedView: any = {}
  isopenSettings : boolean = true;
  selectedViewSettings : any ={};
  selectedViewSettingsChange =  output<any>();

  
  ngOnInit(): void {
   
    this.getAllVIews()
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
    this.service_data.is_env_configure = true;
    this.router.navigate(['/environment']);
  }
 
  // @Input('child_data') set child_data({ totalViews,isopenSettings,selectedViewSettings }) {
  //   this.totalViews = totalViews
  //   this.isopenSettings = isopenSettings
  //   this.selectedViewSettings = selectedViewSettings
    
  // }

  onSettingsSelected = output<any>()
  onViewDelete = output<any>()

  settingsViewSelect(val){

    this.selectedViewSettings = val
    this.onSettingsSelected.emit(this.selectedViewSettings)
   

  }


  renameSelectedView(view){
    view['isRenamed'] = true
      setTimeout(() => {
        let ele = document.getElementById('renameInput')
        ele.focus()
      }, 0);
  
  }
  deleteSelectedView(view){
    this.onViewDelete.emit(view)

  }
  renameView(view){
    
    delete view['isRenamed']
  }

  getAllVIews() {

    window.loadingStart("#navigator-left", "Please wait");

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/TelemetryViewController/getAllViewsOfCurrentUser";

    let form_data = {
      userId: this.dataService.UserDto.UserDTO.U_ID,
      projectId: this.dataService.UserDto.ProjectDTO.P_ID
    }

    this.app_service.make_post_server_call(form_url, form_data).subscribe({
      next: (result: any) => {
        window.loadingStop("#navigator-left");
        if (result == null || result?.length == 0) {
          this.router.navigate(['environment/configure']);
        }
        console.log(result, "get all  views resultS")
        if (result?.length > 0) {
          this.service_data.viewsData = result
          this.totalViews = result
          this.selectedViewSettings = this.totalViews.length == 0 ? {}:this.totalViews[0]
          this.onSettingsSelected.emit(this.selectedViewSettings)
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

}
