import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-environment-curd-service',
  templateUrl: './environment-curd-service.component.html',
  styleUrls: ['./environment-curd-service.component.scss']
})
export class EnvironmentCurdServiceComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  download_all() {
    debugger;
  }

  create_service() {
    debugger;
    this.close_model();
  }

  close_model() {
    this.activeModal.dismiss('close modal');
  }

  seleted_from_environment = [
    {title: "Business Unit", name: "Opkey"},
    {title: "Cloud", name: "AWS"},
    {title: "Physical Location", name: "Noida"},
    {title: "Product", name: "Opkey"}
  ];

  datasource_service = [
    {icon: "OracleEBS", name: "Oracle EBS", status: "Not Configured"},
    {icon: "ISS", name: "IIS", status: "Not Configured" },
    {icon: "MySQL", name: "MySQL", status: "Not Configured"},
  ];

}
