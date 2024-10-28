import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manager-right-pannel-widjet',
  templateUrl: './manager-right-pannel-widjet.component.html',
  styleUrl: './manager-right-pannel-widjet.component.scss'
})
export class ManagerRightPannelWidjetComponent implements OnInit,OnDestroy,AfterViewInit {
  constructor(   
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public service_data: AppDataService,
    public app_service:AppService,
    public dataService:AppDataService,
    private cdr: ChangeDetectorRef,
    private httpClient: HttpClient,
  ){}
  widgets:any;
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.get_All_Widjets();
  }
  ngAfterViewInit(): void {
    
  }
  get_All_Widjets(){
   this.widgets =  this.service_data.widgets_data
  
  }

}



