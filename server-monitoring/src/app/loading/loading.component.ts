import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  add_environment() {
    this.router.navigate(['/environment'], { relativeTo: this.route });
  }


}
