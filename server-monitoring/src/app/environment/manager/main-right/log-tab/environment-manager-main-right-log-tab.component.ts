import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagerRightPanelComponent } from '../../right-panel/manager-right-panel.component';

@Component({
  selector: 'app-environment-manager-main-right-log-tab',
  templateUrl: './environment-manager-main-right-log-tab.component.html',
  styleUrl: './environment-manager-main-right-log-tab.component.scss'
})
export class EnvironmentManagerMainRightLogTabComponent implements OnInit,OnDestroy {


  constructor(
    private modalService: NgbModal,
  ){}

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }
  onSelectionChange(e){
    debugger
   let dataItem = e.selectedRows[0].dataItem
   const modalRef = this.modalService.open( ManagerRightPanelComponent,{
    backdrop: 'static',
    keyboard: false,
    size: 'full',
    centered: true,
    windowClass: 'layout-modal-right panel-end w-50'
  });
  modalRef.result.then((result) => {
  }, (response) => {
    if (response == 'close modal') {
      return;
    }
  });
  modalRef.componentInstance.selectedItem = {callsource:'environmentManager',data:dataItem};
  }
  selectedKeys = []
  logDataSource = [
    {date:'Mar 02 13:52:10.288',host:'i-0b97ec477e7fe75b3e1',service:'kube-proxy',content:"k8s.io/client-go/informers/factory.go:132: Failed to list"},
    {date:'Mar 03 13:52:10.288',host:'i-0b9',service:'kube-p',content:"k8s.io/client-go/informers/factory.go:132: Failed to list"}
  ]
}
