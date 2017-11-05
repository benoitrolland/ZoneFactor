import { Directive, ViewContainerRef } from '@angular/core'; 
@Directive({
  selector: '[slider-host]'
})
export class ZoneSlidersDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }  

}
