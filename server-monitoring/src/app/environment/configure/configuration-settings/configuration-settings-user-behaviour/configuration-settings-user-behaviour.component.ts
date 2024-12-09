import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-configuration-settings-user-behaviour',
  templateUrl: './configuration-settings-user-behaviour.component.html',
  styleUrl: './configuration-settings-user-behaviour.component.scss'
})
export class ConfigurationSettingsUserBehaviourComponent {
  constructor(
    public activeModal: NgbActiveModal,
   private router: Router,
   private route: ActivatedRoute,
   public service_data: AppDataService,
   public app_service: AppService,){

 }
 obj_configuration_setting:any;
 selected_System_User_behaviour: any[] = [];
 obj_error = {
  displayUserError: false,
}
  @Input('child_data') set child_data({ obj_configuration_setting,displayUserError }) {
    this.obj_configuration_setting = obj_configuration_setting;

    if(this.obj_configuration_setting.selected_user_behaviour_component.length>0)
      this.obj_error.displayUserError=false;
    else
       this.obj_error.displayUserError = displayUserError;
    console.log("In User Behaviour", obj_configuration_setting);
    this.agent_lists.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    this.bindData()
  }
  agent_lists = [
    {
      name: "Olivia Rhye",
      email: "olivia.rhye@opkey.com",
      status: "online"
    },
    {
      name: "Phoenix Baker",
      email: "phoenix.baker@opkey.com",
      status: "online"
    },
    {
      name: "Lana Steiner",
      email: "lana.steiner@opkey.com",
      status: "online"
    },
    {
      name: "Demi Wilkinson",
      email: "demi.wilkinson@opkey.com",
      status: "online"
    },
    {
      name: "Candice Wu",
      email: "candice.wu@opkey.com",
      status: "offline"
    },
    {
      name: "Natali Craig",
      email: "natali.craig@opkey.com",
      status: "offline"
    },
    {
      name: "Drew Cano",
      email: "drew.cano@opkey.com",
      status: "online"
    },
    {
      name: "Orlando Diggs",
      email: "orlando.diggs@opkey.com",
      status: "offline"
    },
    {
      name: "Andi Lane",
      email: "andi.lane@opkey.com",
      status: "offline"
    }
  ];


  on_Selection_Change_User_Behavious(event:any){
   
   

    const selectedRow = event.selectedRows;
    const deselectedRow = event.deselectedRows;

    selectedRow.forEach((row: any) => {
      this.selected_System_User_behaviour.push(row.dataItem);
    });

    deselectedRow.forEach((row: any) => {
      const index = this.selected_System_User_behaviour.findIndex(item => item.SystemIdentifier === row.dataItem.SystemIdentifier);
      if (index !== -1) {
        this.selected_System_User_behaviour.splice(index, 1);
      }
    });


    console.log('Selected Rows:', this.selected_System_User_behaviour);

    this.obj_configuration_setting.selected_user_behaviour_component = this.selected_System_User_behaviour;
    if(this.obj_configuration_setting.selected_user_behaviour_component.length>0)this.obj_error.displayUserError=false;
    this.selectedKeys
  }
  
  selectedKeys = []

  bindData(){
    this.selectedKeys = this.obj_configuration_setting?.selected_user_behaviour_component?.map(ele =>ele.email);
  }
}
