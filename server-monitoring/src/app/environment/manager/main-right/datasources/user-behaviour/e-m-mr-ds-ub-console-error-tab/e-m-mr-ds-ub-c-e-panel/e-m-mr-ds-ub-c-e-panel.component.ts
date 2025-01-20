import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-e-m-mr-ds-ub-c-e-panel',
  templateUrl: './e-m-mr-ds-ub-c-e-panel.component.html',
  styleUrl: './e-m-mr-ds-ub-c-e-panel.component.scss'
})
export class EMMrDsUbCEPanelComponent {
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
