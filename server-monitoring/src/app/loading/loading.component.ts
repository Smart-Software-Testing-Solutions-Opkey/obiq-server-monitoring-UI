import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/environment']);
    }, 2000);
  }


}
