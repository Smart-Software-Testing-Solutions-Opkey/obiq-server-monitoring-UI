import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configuration-settings',
  templateUrl: './configuration-settings.component.html',
  styleUrl: './configuration-settings.component.scss'
})
export class ConfigurationSettingsComponent {

  constructor( public activeModal: NgbActiveModal,){
    
  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }

  showSelectionComponent = true;  
  passedData: any;  

 
  Navigate_Child_comp() {

    this.showSelectionComponent = false;
  }

 
  handleDataCompletion(data: any) {
    this.passedData = data;  
  }
}
