import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-mr-ds-e-f-e-journey',
  templateUrl: './e-m-mr-ds-e-f-e-journey.component.html',
  styleUrl: './e-m-mr-ds-e-f-e-journey.component.scss'
})
export class EMMrDsEFEJourneyComponent implements OnDestroy{

  trace_Selected_data: any;
  tabSelected: any;
constructor(
  public activeModal: NgbActiveModal,
  private router: Router,
  private route: ActivatedRoute,
  public service_data: AppDataService,
  public app_service: AppService,
  public dataService: AppDataService,
  private cdr: ChangeDetectorRef
){

}
 selectedData: any
  dataKeys: any = []
  dataValues: any = []
  receivedTimeRange: any
  calsource:String=""
  @Input('child_data') set child_data({ selectedData }) {
    
    this.selectedData = selectedData
    this.dataKeys = Object.keys(this.selectedData)
    this.dataValues = Object.values(this.selectedData);
    // this.obj_selected_journey.datasource = this.selectedData;
    // this.calsource = "single_journey"
    // console.log(this.selectedData, "this is selected Data in Functional journey tab")

  }
  // obj_selected_journey = {
  //   datasource: [],
  //   isDisplay_main: false
  // }

  ngOnDestroy() {
    this.dataService.isEnablePersister = false
    this.disposeAllSubscriptions();
  }
 
  subscriptions: Subscription[] = [];
 
  disposeAllSubscriptions() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
 
  ngOnInit(): void {
    // this.tabSelected = 'ubFunctionalError';
      let data_receiver = this.app_service.dataReceiver().subscribe(data => {
        if (data !== null) {
          if(data.callsource == 'timeExplorerChart'){
  
            this.receivedTimeRange = data.data;
            console.log('Received Data:', this.receivedTimeRange);
    
            // Manually trigger change detection
            this.cdr.detectChanges();
          }
        }
      });
      this.subscriptions.push(data_receiver);
    }
  
    onCellClick(event: any) {
  
    }
    on_trace_Selection_Change_(event: any) {
  
    }
    
    changeSelectedTab(tab) {
      this.tabSelected = tab
    }

 
}
