import { Component } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-persister-modal',
  standalone : true,
  templateUrl: './persister-modal.component.html',
  styleUrl: './persister-modal.component.scss'
})
export class PersisterModalComponent {
  constructor(public service_data: AppDataService, private activeModal: NgbActiveModal){

  }
  msg = ''
  ngOnInit(): void {
    this.msg = this.service_data.persistermsg
  }

  closeModal(selected){
    this.activeModal.dismiss(selected)
  }
}
