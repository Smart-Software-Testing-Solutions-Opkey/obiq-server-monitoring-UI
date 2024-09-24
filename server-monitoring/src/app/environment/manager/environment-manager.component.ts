import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-environment-manager',
  templateUrl: './environment-manager.component.html',
  styleUrls: ['./environment-manager.component.scss']
})
export class EnvironmentManagerComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.check_env_configuration();
  }

  is_env_configure:boolean = true;
  check_env_configuration() {
    debugger;
    if(this.is_env_configure) {
      this.router.navigate(['configure'], { relativeTo: this.route });
    }
  }

}
