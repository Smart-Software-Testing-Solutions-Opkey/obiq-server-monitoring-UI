import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-e-m-mr-ds-ub-all-console-error',
  templateUrl: './e-m-mr-ds-ub-all-console-error.component.html',
  styleUrl: './e-m-mr-ds-ub-all-console-error.component.scss'
})
export class EMMrDsUbAllConsoleErrorComponent {
  constructor(  
          public app_service: AppService
      ){}
      
      backToMenu(){
        this.app_service.routeTo('environment','summary')
      }

}
