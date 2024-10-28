import { Component, Input, OnInit ,output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationSettingsComponent } from 'src/app/environment/configure/configuration-settings/configuration-settings.component';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';


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
    public dataService:AppDataService


  ) { }
  ngOnInit(): void {
    
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
  totalViews:any
  isopenSettings:boolean = false
  @Input('child_data') set child_data({ totalViews,isopenSettings,selectedViewSettings }) {
    debugger
    this.totalViews = totalViews
    this.isopenSettings = isopenSettings
    this.selectedViewSettings = selectedViewSettings
    
  }
  selectedViewSettings:any = {}
  onSettingsSelected = output<any>()
  onViewDelete = output<any>()

  settingsViewSelect(val){
    debugger;
    this.selectedViewSettings = val
    this.onSettingsSelected.emit({isOpen:this.isopenSettings,selectedViewSettings:this.selectedViewSettings})

  }
  Rename_Selected_View(view){

  }
  Delete_Selected_View(view){
    this.onViewDelete.emit(view)

  }

}
