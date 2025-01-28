import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private transfterSubject: BehaviorSubject<any>;

  private dataStream = new Subject<any>();
  public dataStream$ = this.dataStream.asObservable();

  constructor(public http: HttpClient, private router: Router,) {
    
    this.transfterSubject = new BehaviorSubject<any>(null);
  }


  dataTransmitter(data: any): void {
    this.transfterSubject.next(data);
  }

 
  dataReceiver(): Observable<any> {
    return this.transfterSubject.asObservable();
  }

  setStreamData(data: any): void{
    this.dataStream.next(data);
  }


  make_post_server_call(form_url: string, form_data: any) {
    return this.http.post(form_url, form_data);
  }


  make_get_server_call(form_url: string, form_data: any) {
    return this.http.get(form_url, { params: form_data });
  }
  routeTo(portal,view,queryParam?){
   let section = '(rightSection:'+view+')'

   if(!queryParam){
    this.router.navigateByUrl('/'+portal+'/'+section)
   }else{
    this.router.navigateByUrl('/'+portal+'/'+section+'?'+queryParam)
   }
    
  }
}
