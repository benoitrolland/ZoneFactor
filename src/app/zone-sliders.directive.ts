import { Directive, ViewContainerRef,Output, EventEmitter, } from '@angular/core'; 
@Directive({
  selector: '[slider-host]'
})
export class ZoneSlidersDirective {

  @Output('change') change:EventEmitter<any> = new EventEmitter<any>();
  
  constructor(public viewContainerRef: ViewContainerRef) { }  
  
  onChildChange(event){
	console.log('D onChildChange(event): event: ', event);
  }
}
