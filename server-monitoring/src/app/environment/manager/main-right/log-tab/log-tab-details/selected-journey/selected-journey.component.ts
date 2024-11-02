import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-selected-journey',
  templateUrl: './selected-journey.component.html',
  styleUrl: './selected-journey.component.scss'
})
export class SelectedJourneyComponent implements OnInit {

  constructor(
    public app_service: AppService
  ) { }

  ngOnInit() {

    this.getUserJourneyDtoByUserIdSessionId()

  }

  calsource = null;
  obj_selected_journey = null;
  selected_sessionId = null
  @Input('child_data') set child_data({ obj_selected_journey, calsource }) {
    this.calsource = calsource;
    this.obj_selected_journey = obj_selected_journey;
    this.selected_sessionId = this.obj_selected_journey.datasource.sessionId;
  }

  totalPage = 0;
  totalPageError = 0;
  totalDuration = 0;
  is_fullscreen: boolean = false;
  isPageErrorDetails: boolean = false;
  isLayoutCardVisible: boolean = false;
  pageDetails: any;
  datasource_journey_overview: any[] = [];

  getUserJourneyDtoByUserIdSessionId() {

    let form_url = environment.BASE_OBIQ_SERVER_URL + "OpkeyObiqServerApi/OpkeyTraceIAAnalyticsApi/UserJourneyController/getUserJourneyDtoByUserIdSessionId";
    let form_data = {
      "sessionId": this.selected_sessionId
    }

    this.app_service.make_post_server_call(form_url, form_data)
      .subscribe({

        next: (result: any) => {
          this.datasource_journey_overview = result.nodes;
          this.pageInformation(this.datasource_journey_overview);
        },
        error: (error: any) => {
          console.warn(error);
        },
        complete: () => {
          console.log("Completed");
        }
      });

  }


  pageInformation(res) {
    debugger;
    let total_error = 0;
    let total_page = res.length;
    let total_duration = 0;


    res.forEach((item, index) => {

      total_duration = total_duration + item.usageTime;
      item.pageDetail.headers.forEach(item => {
        total_error = total_error + item.totalErrors;
      })

    })

    this.totalPage = total_page;
    this.totalPageError = total_error;
    this.totalDuration = total_duration;

  }

  pageErrorDetails(event) {
    debugger;
    this.pageDetails = event;
    this.isPageErrorDetails = true;
    this.isLayoutCardVisible = true;

  }

  goBack(): void {
    debugger;
    this.obj_selected_journey.isDisplay_main = true;
    // this.obj_selected_journey.datasource = [];
  }

  backToErrorPage() {
    this.isPageErrorDetails = false;
    this.isLayoutCardVisible = false;
  }

  toal_error(error) {
    let error_count = 0;
    error.forEach(item => {
      error_count = error_count + item.appApiRequestErrors.length + item.appConsoleErrors.length + item.appFunctionalErrors.length;
    })
    return error_count;
  }


  // Scroll to journey on selected tab on head
  private activeButton: HTMLElement | null = null;

  scrolltoelement(dataItems): void {
    const elemntId = 'panel_' + dataItems.key;
    const element = document.getElementById(elemntId);
    element.scrollIntoView({ behavior: 'smooth' });

    // Remove highlighted class from all panel-tiles
    const allPanelTiles = document.querySelectorAll('.panel-tile');
    allPanelTiles.forEach(panelTile => {
      panelTile.classList.remove('highlighted');
    });

    // Change background color of the panel-tile
    const panelTile = document.getElementById(elemntId);
    panelTile.classList.add('highlighted');

    // Handle highlight effect on the button
    if (this.activeButton) {
      this.activeButton.classList.remove('selected');
    }

    // Add selected class to the clicked button
    const button = event.currentTarget as HTMLElement;
    button.classList.add('selected');
    this.activeButton = button;
  }

}
