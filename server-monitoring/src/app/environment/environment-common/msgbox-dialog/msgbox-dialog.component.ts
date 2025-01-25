import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';


@Component({
  selector: 'app-msgbox-dialog',
  templateUrl: './msgbox-dialog.component.html',
  styleUrl: './msgbox-dialog.component.scss'
})
export class MsgboxDialogComponent implements OnInit {
  constructor(
    public service_data: AppDataService,
    private activeModal: NgbActiveModal,

  ) {
  }

  errorId: any = ''

  @Input() type: string;
  @Input() msg: string;
  @Input() buttons: Array<any>

  ngOnInit(): void { 
  }
  
  closeModal(selected) {
    this.activeModal.close(selected)
  }


}
