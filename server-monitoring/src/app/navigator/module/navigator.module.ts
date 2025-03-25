import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorLeftComponent } from '../left/navigator-left.component';
import { NavigatorLeftTreeViewComponent } from '../navigator-left-tree-view/navigator-left-tree-view.component';
import { NavigatorLeftSettingsComponent } from '../left/navigator-left-settings/navigator-left-settings.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';



@NgModule({
  declarations: [
    NavigatorLeftComponent,
    NavigatorLeftTreeViewComponent,
    NavigatorLeftSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule,
    GridModule,
    NgApexchartsModule,
    DropDownsModule
  ],
  exports: [
    NavigatorLeftComponent,
    NavigatorLeftTreeViewComponent,
    NavigatorLeftSettingsComponent,
  ]
})
export class NavigatorModule { }
