
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { IBreadCrumb } from './Ibreadcrumb';

@Component({
  selector: 'app-navigator-breadcrumb',
  templateUrl: './navigator-breadcrumb.component.html',
  styleUrls: ['./navigator-breadcrumb.component.scss']
})
export class NavigatorBreadcrumbComponent  implements OnInit {


  constructor(   
     private router: Router,
    private activatedRoute: ActivatedRoute,  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.bind_data();
  }

  bind_data() {

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    })



  }

  public breadcrumbs: IBreadCrumb[]

  /**
   * Recursively build breadcrumb according to activated route.
   * @param route
   * @param url
   * @param breadcrumbs
   */
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    
    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path: any = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');

    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      // label = route.snapshot.params[paramName];

      // set breadcrumb dynamic lable and url
      if(Array.isArray(label)) {
        label[label.length - 1].url =  `${url}/${path}`;
        label[label.length - 1].label =  route.snapshot.queryParams['itemName'];
      }
      else {
        label = route.snapshot.data['breadcrumb'];
      }
      
    }

    // If the breadcrumb is array
    if (Array.isArray(label)) {
      return label;
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    console.log("newBreadcrumbs", newBreadcrumbs)

    return newBreadcrumbs;
  }
}

