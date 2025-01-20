import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-e-m-ds-ub-f-e-panel',
  templateUrl: './e-m-ds-ub-f-e-panel.component.html',
  styleUrl: './e-m-ds-ub-f-e-panel.component.scss'
})
export class EMDsUbFEPanelComponent {
   trace_Selected_data: any;
    tabSelected: any;
  constructor(
      public activeModal: NgbActiveModal,
        private router: Router,
        private route: ActivatedRoute,
        public service_data: AppDataService,
        public app_service: AppService,
        private cdr: ChangeDetectorRef
  ){
  
  }
   selectedData: any
    dataKeys: any = []
    dataValues: any = []
    receivedTimeRange: any
    @Input('child_data') set child_data({ selectedData }) {
      
      this.selectedData = selectedData
      this.dataKeys = Object.keys(this.selectedData)
      this.dataValues = Object.values(this.selectedData);
      console.log(this.selectedData, "this is selected Data in Log tab details main right")
  
    }
     ngOnInit(): void {
      // this.tabSelected = 'ubFunctionalError';
        this.app_service.dataReceiver().subscribe(data => {
          if (data !== null) {
            if(data.callsource == 'timeExplorerChart'){
    
              this.receivedTimeRange = data.data;
              console.log('Received Data:', this.receivedTimeRange);
      
              // Manually trigger change detection
              this.cdr.detectChanges();
            }
          }
        });
        
      }
    
      onCellClick(event: any) {
    
      }
      on_trace_Selection_Change_(event: any) {
    
      }
      
      ngOnDestroy(): void {
    
      }
      changeSelectedTab(tab) {
        this.tabSelected = tab
      }

}
