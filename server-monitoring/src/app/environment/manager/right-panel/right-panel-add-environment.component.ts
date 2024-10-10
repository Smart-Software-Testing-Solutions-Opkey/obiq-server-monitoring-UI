import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentManagerModule } from '../module/environment-manager.module';

@Component({
  selector: 'app-right-panel-add-environment',
  templateUrl: './right-panel-add-environment.component.html',
  styleUrl: './right-panel-add-environment.component.scss'
})
export class RightPanelAddEnvironmentComponent implements OnInit,OnDestroy {

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
