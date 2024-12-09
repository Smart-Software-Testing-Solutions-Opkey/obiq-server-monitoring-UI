import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-environment-manager-widgets-stat-widget',
  templateUrl: './environment-manager-widgets-stat-widget.component.html',
  styleUrl: './environment-manager-widgets-stat-widget.component.scss'
})
export class EnvironmentManagerWidgetsStatWidgetComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    
  }
  title:string = ''
  data:string = ''
  @Input('child_data') set child_data({ title,data }) {
    
   this.title = title
   this.data = data
  }
}
