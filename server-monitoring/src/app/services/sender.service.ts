
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor(
    public http: HttpClient,
   // private service_sender: SenderService
  ) {
    this.transfterSubject = new Subject<any>();

   }
  private transfterSubject: Subject<any>;


  dataTransmitter(data: any) {
    return this.transfterSubject.next(data);
  }

  dataReceiver(): Observable<any> {
    return this.transfterSubject.asObservable();
  }

  make_post_server_call(form_url: string, form_data: any) {
    return this.http.post(form_url, form_data, {});
  }

  make_get_server_call(form_url: string, form_data: any) {
    return this.http.get(form_url, { params: form_data });
  }

}
