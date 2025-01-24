import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { ConfigureRightPanelComponent } from '../../configure-right-panel/configure-right-panel.component';
@Component({
  selector: 'app-configuration-settings-view-summary',
  templateUrl: './configuration-settings-view-summary.component.html',
  styleUrl: './configuration-settings-view-summary.component.scss'
})
export class ConfigurationSettingsViewSummaryComponent implements OnInit, OnDestroy {

  constructor(
    public app_service: AppService,
    public dataService: AppDataService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {
  }

  obj_configuration_setting: any;
  Selected_grid_dataSource: any;
  selected_grid_System_Diagnostics: any;
  selected_user_behaviour_component = []
  selected_test_automation_analysis = []
  Show_Project_Access: boolean = false;
  receivedAccessType: any;
  searchText : any;
  @Input('child_data') set child_data({ obj_configuration_setting }) {

    
    this.obj_configuration_setting = obj_configuration_setting;
    console.log("obj_configuration_setting===++++++++++++++++++++++++++++++++++++++++++++", obj_configuration_setting);
  }

  subscriptions: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  
  ngOnInit() {
    let data_receiver = this.app_service.dataReceiver().subscribe(data => {
      if (data !== null) {
       
        this.receivedAccessType = data;
        console.log(this.receivedAccessType, "recived==========")
        if(this.receivedAccessType == "viewCreated"){
          this.selectedAccessType = this.receivedAccessType?.AccessType
          this.dataService.changedAccessType=this.selectedAccessType
          this.obj_configuration_setting.AccessType = this.receivedAccessType.AccessType;
        }
        else{
          if(this.receivedAccessType?.AccessType != null){
            this.selectedAccessType = this.receivedAccessType?.AccessType
          }
          this.dataService.changedAccessType=this.selectedAccessType
          this.obj_configuration_setting.AccessType = this.selectedAccessType;
        }
        if (this.obj_configuration_setting.AccessType == "SHARED") {
          this.obj_configuration_setting.selectedUids = this.receivedAccessType.map(item => ({
            userId: item.U_ID,
            permmission: item.permission === "EDIT" ? "ALL" : item.permission
          }));
        }
        else if (this.obj_configuration_setting.AccessType == "PUBLIC") {

          this.obj_configuration_setting.selectedUids.userId = "00000000-0000-0000-0000-000000000000"
          if (this.receivedAccessType.AccessPermisions.EDIT == true) {
            this.obj_configuration_setting.selectedUids.permmission = "ALL";
          }
          else {
            this.obj_configuration_setting.selectedUids.permmission = "VIEW"
          }
        }
        else {
          this.obj_configuration_setting.selectedUids.userId = "00000000-0000-0000-0000-000000000000"
          this.obj_configuration_setting.selectedUids.permmission = "ALL";

        }
        this.cdr.detectChanges();
      }
    });
    this.get_all_summary(this.obj_configuration_setting)
    this.subscriptions.push(data_receiver);
  }

  ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
  clearSearch(){
    this.searchText = ''
    this.filterSearchResults()
  }
  filterSearchResults(){

      if(this.searchText == null){
        return
      }
      if(this.searchText == ''){
        this.selected_user_behaviour_component = this.obj_configuration_setting.selected_user_behaviour_component;
        this.Selected_grid_dataSource = this.obj_configuration_setting.selected_erp_analytics;
        this.selected_test_automation_analysis = this.obj_configuration_setting.selected_test_automation_analysis;
        this.selected_grid_System_Diagnostics = this.obj_configuration_setting.selected_system_diagnostics;
      }
      if( this.searchText ){

        // for user behaviour
        this.selected_user_behaviour_component = this.obj_configuration_setting?.selected_user_behaviour_component.filter( (data)=>data?.Name.toLowerCase().includes(this.searchText.toLowerCase()) ||data?.CreatedBy.toLowerCase().includes(this.searchText.toLowerCase()) || data?.email_ID.toLowerCase().includes(this.searchText.toLowerCase()) )

        // for erp analytics
        this.Selected_grid_dataSource = this.obj_configuration_setting?.selected_erp_analytics.filter( (data)=>
          data?.SystemIdentifier.toLowerCase().includes(this.searchText.toLowerCase()) || data?.CreatedBy.toLowerCase().includes(this.searchText.toLowerCase()) || data?.CreatedByName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.CreatedOn.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ModifiedBy.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ModifiedByName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ModifiedOn.toLowerCase().includes(this.searchText.toLowerCase()))

        // for test automation
        this.selected_test_automation_analysis = this.obj_configuration_setting?.selected_test_automation_analysis.filter( (data)=>data?.AgentName.toLowerCase().includes(this.searchText.toLowerCase()))

        // for system diagonostics
        this.selected_grid_System_Diagnostics = this.obj_configuration_setting?.selected_system_diagnostics.filter( (data)=>data?.agentName.toLowerCase().includes(this.searchText.toLowerCase()) || data?.ipAddress.toLowerCase().includes(this.searchText.toLowerCase()))
        
      }
        

  }
  get_all_summary(selectionData) {
  
    this.Selected_grid_dataSource = selectionData.selected_erp_analytics;
    this.selected_grid_System_Diagnostics = selectionData.selected_system_diagnostics;
    if(selectionData?.selected_user_behaviour_component){

      this.selected_user_behaviour_component = selectionData?.selected_user_behaviour_component
    }
    if(selectionData.selected_test_automation_analysis){

      this.selected_test_automation_analysis = selectionData.selected_test_automation_analysis
    }

    console.log(this.Selected_grid_dataSource);

  }
  OnAccessTypeClick() {

    const modalRef = this.modalService.open(ConfigureRightPanelComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'full',
      centered: true,
      windowClass: 'layout-modal-right panel-end'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
    });
    modalRef.componentInstance.selectedItem = { callsource: this.obj_configuration_setting };
  }
  selectedAccessType: string = 'PRIVATE';
  accessTypes: string[] = ['PUBLIC', 'PRIVATE', 'SHARED'];
  users: any[] = [];
  selectedUsers: any[] = [];

  onAccessTypeChange(selectedOption: string) {
    
   if(selectedOption) this.selectedAccessType = selectedOption;
    if (this.selectedAccessType == "SHARED") {
      this.getAllProjects()
    }
    else {
      this.Show_Project_Access = false
    }
    this.obj_configuration_setting.AccessType = this.selectedAccessType
    console.log('Access Type Changed:', selectedOption);

  }

  onUserSelect(user: any, event: Event): void {
    
    if ((event.target as HTMLInputElement).checked) {

      this.selectedUsers.push({
        userId: user.U_ID,
        permmission: "ALL" // abhi ke liye sabke liye All 
      });
    } else {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.userId !== user.U_ID);
    }
    this.obj_configuration_setting.selectedUids = this.selectedUsers;

    console.log(this.selectedUsers);
  }

  getAllProjects() {
    
    let form_url = environment.BASE_OPKEY_URL + "Profile/GetAssignedUsersInProject";

    let form_data = { P_ID: this.dataService.UserDto.ProjectDTO.P_ID };

    this.app_service.make_get_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {

          this.Show_Project_Access = true
          this.users = result;
        },
        error: (error: any) => {

          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });
  }

  onCellClick(event) {

  }

  onSelectionChange(event) {

  }


}
