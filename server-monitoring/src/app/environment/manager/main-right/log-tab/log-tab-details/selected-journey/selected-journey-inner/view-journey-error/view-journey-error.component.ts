import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-journey-error',
  templateUrl: './view-journey-error.component.html',
  styleUrl: './view-journey-error.component.scss'
})
export class ViewJourneyErrorComponent implements OnInit {

  @Input() dataItem: any;
  isExpend: boolean = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  @Input() datasource_errors: any;
  @Input() errorType: any;

  ngOnInit() {
    if(this.datasource_errors.length !=0) {
      this.bind_header();
    }
  }


  header_text = "";
  bind_header() {
  
    if(this.errorType == 'functionalErrors') {
      this.header_text = "Functional Error";

    } else if(this.errorType == 'consloleErrors') {
      this.header_text = "Conslole Error";

    } else if(this.errorType == 'apiRequestError') {
      this.header_text = "API Request Error";

    }
  
  }


  close_model() {
    this.activeModal.dismiss('close modal');
  }

  // shouldShowMoreButton(description: string): boolean {
  //   const charCount = description.trim().length;
  //   return charCount > 90;
  // }

}
