import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-e-m-mr-ds-erp-o-v-f-p',
  templateUrl: './e-m-mr-ds-erp-o-v-f-p.component.html',
  styleUrl: './e-m-mr-ds-erp-o-v-f-p.component.scss'
})
export class EMMrDsErpOVFPComponent {
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
}
