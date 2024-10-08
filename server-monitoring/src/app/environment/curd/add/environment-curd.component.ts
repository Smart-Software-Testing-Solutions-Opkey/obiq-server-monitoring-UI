import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-environment-curd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './environment-curd.component.html',
  styleUrls: ['./environment-curd.component.scss']
})
export class EnvironmentCurdComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }
  
  close_model() {
    this.activeModal.dismiss('close modal');
  }

  next() {

  }

  select_datasource = [
    {
      displayname: "ERP Analytics",
      title: "ERP is a software system that integrates core business processes into a single platform to improve efficiency and decision-making.",
      subtitle: "To display more ERPs go to instance and select ESS logs.",
      display_services: true,
      services: [
        { displayname: "Oracle Fusion", icon: 'OracleFusion'},
        { displayname: "SAP", icon: 'SAP'},
        { displayname: "Salesforce", icon: 'Salesforce'},
        { displayname: "Workday", icon: 'Workday'},
        { displayname: "PeopleSoft", icon: 'PeopleSoft'},
        { displayname: "Oracle EBS", icon: 'OracleEBS'},
      ]
    },
    {
      displayname: "User Behavior Analytics",
      title: "ERP is a software system that integrates core business processes into a single platform to improve efficiency and decision-making.",
      subtitle: "",
      display_services: true,
      services: [
        { displayname: "Oracle Fusion", icon: 'OracleFusion'},
        { displayname: "SAP", icon: 'SAP'},
        { displayname: "Salesforce", icon: 'Salesforce'},
        { displayname: "Workday", icon: 'Workday'},
        { displayname: "PeopleSoft", icon: 'PeopleSoft'},
        { displayname: "Oracle EBS", icon: 'OracleEBS'},
      ]
    },
  ]

}
