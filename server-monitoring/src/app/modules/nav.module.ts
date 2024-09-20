import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorBreadcrumbComponent } from '../navigator/breadcrumb/navigator-breadcrumb.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavigatorBreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[NavigatorBreadcrumbComponent]
})
export class NavModule { }
