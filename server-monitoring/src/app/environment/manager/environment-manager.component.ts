import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-environment-manager',
  templateUrl: './environment-manager.component.html',
  styleUrls: ['./environment-manager.component.scss']
})
export class EnvironmentManagerComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service_data: AppDataService
  ) { }

  ngOnInit(): void {
    this.check_env_configuration();
  }

  
  check_env_configuration() {
    debugger;
    if(!this.service_data.is_env_configure) {
      this.router.navigate(['configure'], { relativeTo: this.route });
    } else {
      
    }
  }

}
