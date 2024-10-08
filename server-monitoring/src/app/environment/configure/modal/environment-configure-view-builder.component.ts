import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-environment-configure-view-builder',
  templateUrl: './environment-configure-view-builder.component.html',
  styleUrl: './environment-configure-view-builder.component.scss'
})
export class EnvironmentConfigureViewBuilderComponent {

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
      display_subitem: true,
      subitem: [
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
      display_subitem: true,
      subitem: [
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
