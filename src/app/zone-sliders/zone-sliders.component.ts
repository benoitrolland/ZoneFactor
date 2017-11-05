import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core'; 
//OnInit , 
import { ZoneSlider }           from '../zone-slider.interface';  
import { ZoneSliderItem }       from '../zone-slider-item';
import { ZoneSlidersDirective } from '../zone-sliders.directive';
import { ChangeDetectorRef,ViewContainerRef } from '@angular/core';

@Component({
    selector: 'tick-slider',
	styleUrls: ['./TickSliderComponent.component.css'],
//    template: '<mat-grid-tile colspan="1" rowspan="1">&nbsp;10<mat-slider tickInterval="5" min="10" max="100" step="5" value="75">{{data?.text}}</mat-slider>100</mat-grid-tile>'
//    template: '<div>&nbsp;{{data?.text}}&nbsp;</div>'
//      template: '10<mat-slider tickInterval="5" min="10" max="100" step="5" value="75">{{data?.text}}</mat-slider>100<h4 style="align:right">a</h4>'
    template: '<mat-grid-list cols="6" rowHeight="25px" gutterSize="1" ><mat-grid-tile colspan="4" rowspan="1"  class="grid-right">&nbsp;10<mat-slider tickInterval="5" min="10" max="100" step="5" value="75">F2</mat-slider>100</mat-grid-tile><mat-grid-tile colspan="2" rowspan="1" class="grid-left">&nbsp;&nbsp;{{data?.text}}</mat-grid-tile></mat-grid-list>'
})
export class TickSliderComponent implements ZoneSlider {
  @Input() data: any; 
}

@Component({
    selector: 'toggle-slider',
    template: '<mat-grid-list cols="6" rowHeight="25px" gutterSize="1"><mat-grid-tile colspan="4" rowspan="1" ><mat-slide-toggle>F4</mat-slide-toggle></mat-grid-tile><mat-grid-tile  colspan="2" rowspan="1" >&nbsp;&nbsp;Fd</mat-grid-tile></mat-grid-list>'
})
export class ToggleSliderComponent implements ZoneSlider {
  @Input() data: any; 
}
@Component({
    selector: 'unknown-component',
    template: `<mat-grid-list cols="6" rowHeight="25px" gutterSize="1"><mat-grid-tile colspan="4" rowspan="1" >Unknown component </mat-grid-tile><mat-grid-tile colspan="2" rowspan="1" >{{data?.text}}</mat-grid-tile></mat-grid-list>`
})
export class UnknownDynamicComponent implements ZoneSlider {
  @Input() data: any; 
}

@Component({
  selector: 'app-zone-sliders',
  templateUrl: './zone-sliders.component.html',
  styleUrls: ['./zone-sliders.component.css']
})

export class ZoneSlidersComponent implements AfterViewInit, OnDestroy {
  @Input() sliders: ZoneSliderItem[];
  //@Input() mode: string="all";//any or "cycling" 
  @Input() cycling: number = -1; 
  currentSliderIndex: number = -1;
  @ViewChild(ZoneSlidersDirective) sliderHost: ZoneSlidersDirective; //<ng-template slider-host></ng-template>
  //@ViewChild('container', { read: ViewContainerRef }) //<div><div #container></div></div>
  subscription: any;
  interval: any;
  //data:any; 

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private _changeDetectionRef : ChangeDetectorRef) { 
    //working ok =-1console.log("this.currentSliderIndex=" + this.currentSliderIndex);
  }
  
  ngOnInit() { //https://github.com/angular/angular/issues/6005  e-oz commented on 12 Mar 2016: @tandu just replace ngAfterViewInit to ngOnInit
   //this.sliders = [new ZoneSliderItem(UnknownDynamicComponent,{text:'unknown ..'})]; //for this.sliders to have a length
    this.loadComponent();
	if(this.cycling > 0) this.reLoadComponent();
//  }
  
//  ngOnDestroy() {
    clearInterval(this.interval);
  }
  


  reLoadComponent() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, this.cycling);
  }

   loadComponent() {
   
     let viewContainerRef = this.sliderHost.viewContainerRef;
     
	 viewContainerRef.clear();
	 let len = this.sliders.length;
	 if(this.cycling >= 0)  {viewContainerRef.clear();len = 1;}
	 var i = 0;
	 for (; i < len; i++) { 
      this.loadNextComponent(viewContainerRef);
	 }
   }
   
   loadNextComponent(viewContainerRef: ViewContainerRef){ //ComponentRef<{}>) {
    //recupère le prochin indexe de la liste et reprend à 0 si currentSliderIndex est au max
    this.currentSliderIndex = (this.currentSliderIndex + 1) % this.sliders.length;

    let zoneSliderItem = this.sliders[this.currentSliderIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(zoneSliderItem.component);


    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ZoneSlider>componentRef.instance).data = zoneSliderItem.data;
  } 
  
} 


//export abstract class DynamicComponent {
//    context: any;
//}


