import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() { }

  is_env_configure:boolean = false;
  showSelectedViewEnvironment: boolean = false;
  UserDto :any = null;
  setSelectedViewEnvironmentVisibility(visible: boolean) {
    this.showSelectedViewEnvironment = visible;
  }
}
