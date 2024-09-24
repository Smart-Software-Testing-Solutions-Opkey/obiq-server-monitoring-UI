import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator-left',
  templateUrl: './navigator-left.component.html',
  styleUrls: ['./navigator-left.component.scss']
})
export class NavigatorLeftComponent implements OnInit {


  ngOnInit(): void {
  
  }

  array_sidebar_menu = [
    {
      display: true,
      displayname: "PROD_US",
      view: "PROD_US",
      submenu: [
        { display: true, displayname: "Oracle EBS", view: "OracleEBS"},
        { display: true, displayname: "IIS", view: "IIS"},
        { display: true, displayname: "MySQL", view: "MySQL"},
      ]
    },
    {
      display: true,
      displayname: "Opkey QA",
      view: "OpkeyQA",
      submenu: [
        { display: true, displayname: "Workday", view: "Workday"},
        { display: true, displayname: "IIS 01", view: "IIS"},
        { display: true, displayname: "IIS 02", view: "IIS"},
        { display: true, displayname: "Redis", view: "redis"},
      ]
    }
  ];


  change_view(view:any) {
    debugger
    console.log("view==", view);
  }

}
