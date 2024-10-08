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
  selectedServices: { [key: string]: string[] } = {};
  select_datasource = [
    {
      displayname: "ERP Analytics",
      displayType: "ERPAnalytics",
      title: "ERP is a software system that integrates core business processes into a single platform to improve efficiency and decision-making.",
      subtitle: "To display more ERPs go to instance and select ESS logs.",
      display_services: true,
      showServices: false, 
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
      displayType: "UserBehaviorAnalytics",
      title: "ERP is a software system that integrates core business processes into a single platform to improve efficiency and decision-making.",
      subtitle: "",
      display_services: true,
      showServices: false, 
      services: [
        { displayname: "Olivia Rhye", email: 'Olivia.rhye@opkey.com', icon: 'profile'},
        { displayname: "Phoenix Baker", email: 'Phoenix.baker@opkey.com', icon: 'profile'},
        { displayname: "Lana Steiner", email: 'Lana.steiner@opkey.com', icon: 'profile'},
        { displayname: "Demi Wilkinson", email: 'Demi.wilkinson@opkey.com', icon: 'profile'},
        { displayname: "Candice Wu", email: 'Candice.wu@opkey.com', icon: 'profile'},
        { displayname: "Candice Wu", email: 'Candice.wu@opkey.com', icon: 'profile'},
        { displayname: "Oracle EBS", icon: 'OracleEBS'},

      ]
    },
];
isSelected(widgetName: string, serviceName: string): boolean {
  return this.selectedServices[widgetName] && this.selectedServices[widgetName].includes(serviceName);
}


onServiceSelection(widgetName: string, serviceName: string, event: any) {
  const isChecked = event.target.checked;

  if (isChecked) {
    
    if (!this.selectedServices[widgetName]) {
      this.selectedServices[widgetName] = [];
    }

   
    this.selectedServices[widgetName].push(serviceName);
  } else {
   
    this.selectedServices[widgetName] = this.selectedServices[widgetName].filter(item => item !== serviceName);

    
    if (this.selectedServices[widgetName].length === 0) {
      delete this.selectedServices[widgetName];
    }
  }

  console.log(this.selectedServices); 
}



  create_environment() {
    this.activeModal.dismiss('create_environment');
  }


}
