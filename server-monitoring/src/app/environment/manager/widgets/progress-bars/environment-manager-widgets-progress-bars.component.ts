import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-environment-manager-widgets-progress-bars',
  templateUrl: './environment-manager-widgets-progress-bars.component.html',
  styleUrl: './environment-manager-widgets-progress-bars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvironmentManagerWidgetsProgressBarsComponent {
  datasourceProgressBar: Array<any> = [
    { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    { Name: "GuideName01", passpercent: 30, failpercent: 70 },
    { Name: "GuideName01", passpercent: 30, failpercent: 70 },
  ]
}
