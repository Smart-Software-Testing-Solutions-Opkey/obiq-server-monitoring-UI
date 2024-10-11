
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manager-right-panel',
  templateUrl: './manager-right-panel.component.html',
  styleUrl: './manager-right-panel.component.scss'
})
export class ManagerRightPanelComponent implements OnInit,OnDestroy {
  constructor(
    public activeModal: NgbActiveModal
  ) { }
  selectedItem:any
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    debugger 
    this.selectedItem
  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }

}
