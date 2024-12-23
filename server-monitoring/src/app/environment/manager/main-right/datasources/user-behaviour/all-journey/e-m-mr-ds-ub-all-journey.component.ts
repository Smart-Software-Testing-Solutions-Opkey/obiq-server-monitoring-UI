import { Component } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-e-m-mr-ds-ub-all-journey',
  templateUrl: './e-m-mr-ds-ub-all-journey.component.html',
  styleUrl: './e-m-mr-ds-ub-all-journey.component.scss'
})
export class EMMrDsUbAllJourneyComponent {

constructor(  
    public app_service: AppService,
    private dataService:AppDataService){}

  ngOnInit(): void {
   
  }

  journeyDataSourceTemp: any[] = [];
  public pageSize = 20;
  journeyDataSource: GridDataResult;


  grid_load_more = false;
  
  private loadItems(): void {
    this.journeyDataSource = {
      data: this.journeyDataSourceTemp,
      total: this.journeyDataSourceTemp.length,
    };
  }
  public skip = 0;
  load_more() {
    if (!this.grid_load_more) { return; }
    this.skip += this.pageSize;
   
  }
  openInNewTab(){
    
  }
  backtomenu(){
    this.app_service.routeTo('environment','summary')
  }

}

