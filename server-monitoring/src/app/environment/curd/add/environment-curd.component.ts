import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConfigureCreateEnvironmentComponent } from '../../configure/configure-create-environment/configure-create-environment.component';
import { EnvironmentCurdServiceComponent } from '../service/environment-curd-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-environment-curd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './environment-curd.component.html',
  styleUrls: ['./environment-curd.component.scss']
})
export class EnvironmentCurdComponent {

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService
  ) { }

public accordionOpen: boolean[] = [false, false, false, false];

toggleAccordion(index: number, event: Event) {
  debugger;
  event.stopPropagation();
  this.accordionOpen[index] = !this.accordionOpen[index];
  console.log("accordionOpen", this.accordionOpen);
}

  // create_environment() {
  //   debugger;
  //   this.activeModal.dismiss('add_environment');
  // }

  close_model() {
    this.activeModal.dismiss('close modal');
  }

  // add_environment() {
  //   this.create_environment();
  //   this.router.navigate(['/environment-manager']);
  // }

  create_environment() {
    this.activeModal.dismiss('add_service');
  }

}
