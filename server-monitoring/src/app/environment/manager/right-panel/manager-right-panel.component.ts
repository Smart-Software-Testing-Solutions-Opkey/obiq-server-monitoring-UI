
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
  panelHeader:string = ''
  selectedPanel:string = ''
  ngOnInit(): void {
     
    this.bindPanelData()
  }
  close_model() {
    this.activeModal.dismiss('close modal');
  }
  bindPanelData(){
    debugger;
    if(this.selectedItem?.callsource == "environmentManagerLogDetails"){
      this.panelHeader = 'Log Details'
      this.selectedPanel = 'LogDetails'
    }
    else if(this.selectedItem?.callsource == "addWidget"){
      this.panelHeader = 'Add Widgets'
      this.selectedPanel = 'AddWidgets'

    }
    else if(this.selectedItem?.callsource == "ErpDataSourceLogDetails"){
     this.panelHeader = 'Ess Details'
      this.selectedPanel = 'ErpLogDetails'
    }
    else if(this.selectedItem?.callsource == "Erp_functional_logs_Journey_pannel"){
      this.panelHeader = 'Functional Error Journey'
      this.selectedPanel = 'ErpFunctionalJourney'
    }
    else if(this.selectedItem?.callsource == "Erp_View_All_process"){
      this.panelHeader = 'ERP All Process'
      this.selectedPanel = 'ERPAllProcessWidget'
    }

  }

}
