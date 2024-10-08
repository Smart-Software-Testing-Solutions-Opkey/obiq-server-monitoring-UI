import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { RightPanelAddEnvironmentComponent } from '../right-panel/right-panel-add-environment.component';

@Component({
  selector: 'app-environment-manager-left-menu',
  templateUrl: './environment-manager-left-menu.component.html',
  styleUrl: './environment-manager-left-menu.component.scss'
})
export class EnvironmentManagerLeftMenuComponent {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private appDataService: AppDataService
  ) { }
  
  ngOnInit(): void {
    this.setInitialActiveState();
  }

  array_sidebar_menu = [
    {
      display: true,
      displayname: "View 01",
      view: "View_01",
      submenu: [
            { display: true, displayname: "ERP Analytics", view: ""},
            { display: true, displayname: "User Behaviour Analytics", view: ""},
            { display: true, displayname: "System Diagnostics", view: ""},
          ]
    },
    {
      display: true,
      displayname: "View 03",
      view: "View_03",
      submenu: [
            { display: true, displayname: "ERP Analytics", view: ""},
            { display: true, displayname: "User Behaviour Analytics", view: ""},
            { display: true, displayname: "System Diagnostics", view: ""},
          ]
    },
    {
      display: true,
      displayname: "View 02",
      view: "View_02",
      submenu: [
            { display: true, displayname: "ERP Analytics", view: ""},
            { display: true, displayname: "User Behaviour Analytics", view: ""},
            { display: true, displayname: "System Diagnostics", view: ""},
          ]
    }
  ];

  activeMenuIndex: number = 0;
  activeSubmenuIndex: number = 0;

  setInitialActiveState(): void {
    this.activeMenuIndex = 0;
    if (this.array_sidebar_menu[0].submenu && this.array_sidebar_menu[0].submenu.length > 0) {
      this.activeSubmenuIndex = 0;
    }
  }

  change_view(selected_item:any, menuIndex: number, submenuIndex?: number): void {
    this.activeMenuIndex = menuIndex;
    if (submenuIndex !== undefined) {
      this.activeSubmenuIndex = submenuIndex;
    }

    if (selected_item.view === 'View_01') {
      this.appDataService.setProdUsEnvironmentVisibility(true);
    } else {
      this.appDataService.setProdUsEnvironmentVisibility(false);
    }
  }

}
