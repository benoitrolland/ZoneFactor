import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
//https://stackoverflow.com/questions/45186469/get-value-from-another-component-angular-4
//http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
@Injectable()
export class ImpressService {

  stepEnter$: Observable<any>;
  private stepEnterSubject = new Subject<any>();
  
  constructor() { 
	this.stepEnter$ = this.stepEnterSubject.asObservable();
  }
  public stepEnter(event:any) {
  console.log("service: stepEnter");
	    this.stepEnterSubject.next(event);
	 };
}
