import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-configure-right-panel',
  templateUrl: './configure-right-panel.component.html',
  styleUrl: './configure-right-panel.component.scss'
})
export class ConfigureRightPanelComponent {
 
  constructor() { }
  @Input() selectedItem: any;
  ngOnInit(): void {
    // Now you can use selectedItem here
    console.log('Received data:--------------------------------', this.selectedItem);
  }
}
