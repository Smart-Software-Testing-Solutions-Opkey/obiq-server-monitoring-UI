import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-mr-ds-e-f-e-journey',
  templateUrl: './e-m-mr-ds-e-f-e-journey.component.html',
  styleUrl: './e-m-mr-ds-e-f-e-journey.component.scss'
})
export class EMMrDsEFEJourneyComponent {
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
  calsource:String=""
  @Input('child_data') set child_data({ selectedData }) {
    
    this.selectedData = selectedData
    this.dataKeys = Object.keys(this.selectedData)
    this.dataValues = Object.values(this.selectedData);
    this.obj_selected_journey.datasource = this.selectedData;
    this.calsource = "single_journey"
    console.log(this.selectedData, "this is selected Data in Functional journey tab")

  }
  obj_selected_journey = {
    datasource: [],
    isDisplay_main: false
  }
  ngOnInit(): void {
  }

 
}
