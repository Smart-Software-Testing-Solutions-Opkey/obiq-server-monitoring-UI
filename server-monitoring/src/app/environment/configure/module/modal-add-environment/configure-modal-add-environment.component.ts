import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnvironmentCurdComponent } from 'src/app/environment/curd/add/environment-curd.component';

@Component({
  selector: 'app-configure-modal-add-environment',
  standalone: true,
  imports: [CommonModule, EnvironmentCurdComponent],
  templateUrl: './configure-modal-add-environment.component.html',
  styleUrl: './configure-modal-add-environment.component.scss'
})
export class ConfigureModalAddEnvironmentComponent {

  
}
