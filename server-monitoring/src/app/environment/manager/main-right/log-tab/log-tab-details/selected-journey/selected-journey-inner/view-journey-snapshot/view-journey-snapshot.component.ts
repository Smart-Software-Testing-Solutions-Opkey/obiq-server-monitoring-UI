import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-journey-snapshot',
  templateUrl: './view-journey-snapshot.component.html',
  styleUrl: './view-journey-snapshot.component.scss'
})
export class ViewJourneySnapshotComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  @Input() selectedScreenshot_url: any;

  ngOnInit(): void {
  }

  close_model() {
    this.activeModal.dismiss('close modal');
  }

}
