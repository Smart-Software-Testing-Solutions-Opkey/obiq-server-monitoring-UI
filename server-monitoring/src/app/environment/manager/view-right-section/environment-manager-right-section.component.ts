import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-environment-manager-right-section',
  templateUrl: './environment-manager-right-section.component.html',
  styleUrl: './environment-manager-right-section.component.scss'
})
export class EnvironmentManagerRightSectionComponent {

  constructor(public appDataService: AppDataService) { }

}
