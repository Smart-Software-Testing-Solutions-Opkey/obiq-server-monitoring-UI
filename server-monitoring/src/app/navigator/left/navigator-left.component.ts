import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RightPanelAddEnvironmentComponent } from 'src/app/environment/manager/right-panel/right-panel-add-environment.component';

@Component({
  selector: 'app-navigator-left',
  templateUrl: './navigator-left.component.html',
  styleUrls: ['./navigator-left.component.scss']
})
export class NavigatorLeftComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  
  }

  array_sidebar_menu = [
    {
      display: true,
      displayname: "PROD_US",
      view: "PROD_US",
      submenu: [
        { display: true, displayname: "Oracle EBS", status: "Not configured", view: "OracleEBS"},
        { display: true, displayname: "IIS", status: "Not configured", view: "IIS"},
        { display: true, displayname: "MySQL", status: "Not configured", view: "MySQL"},
      ]
    },
    {
      display: true,
      displayname: "Opkey QA",
      view: "OpkeyQA",
      submenu: [
        { display: true, displayname: "Workday", status: "Not configured", view: "Workday"},
        { display: true, displayname: "IIS 01", status: "Not configured", view: "IIS"},
        { display: true, displayname: "IIS 02", status: "Not configured", view: "IIS"},
        { display: true, displayname: "Redis", status: "Not configured", view: "redis"},
      ]
    }
  ];


  change_view(view:any) {
    debugger
    console.log("view==", view);
  }


  add_environment() {
    const modalRef = this.modalService.open(RightPanelAddEnvironmentComponent, {
      windowClass: 'layout-modal-right panel-end',
      backdropClass: 'modal-overlay-bg-light',
      backdrop: 'static',
      size: 'xl'
    });
    modalRef.result.then((result) => {
    }, (response) => {
      if (response == 'close modal') {
        return;
      }
    });
  }

}
