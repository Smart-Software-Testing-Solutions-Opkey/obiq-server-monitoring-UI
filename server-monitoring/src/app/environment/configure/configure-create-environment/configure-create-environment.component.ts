import { Component } from '@angular/core';
import { EnvironmentCurdComponent } from '../../curd/add/environment-curd.component';

@Component({
  selector: 'app-configure-create-environment',
  standalone: true,
  imports: [EnvironmentCurdComponent],
  templateUrl: './configure-create-environment.component.html',
  styleUrl: './configure-create-environment.component.scss'
})
export class ConfigureCreateEnvironmentComponent {

}
