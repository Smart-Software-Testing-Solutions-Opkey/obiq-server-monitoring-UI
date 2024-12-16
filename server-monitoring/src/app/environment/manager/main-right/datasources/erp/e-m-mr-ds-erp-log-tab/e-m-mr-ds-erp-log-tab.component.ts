import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-e-m-mr-ds-erp-log-tab',
  templateUrl: './e-m-mr-ds-erp-log-tab.component.html',
  styleUrl: './e-m-mr-ds-erp-log-tab.component.scss'
})
export class EMMrDsErpLogTabComponent {
  constructor(){

  }
   @Input() view:any
}
