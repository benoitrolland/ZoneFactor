import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core'; 
//OnInit , 
import { ZoneSlider }           from '../zone-slider.interface';  
import { ZoneSliderItem }       from '../zone-slider-item';
import { ZoneSlidersDirective } from '../zone-sliders.directive';
import { ZonesService } from '../shared/index';
//import { ZoneSlidersService } from '../shared/zone-sliders.service';
import { ChangeDetectorRef, ViewContainerRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'tick-slider',
	styleUrls: ['./TickSliderComponent.component.css'],
//   thumbLabel	
//    template: '<mat-grid-tile colspan="1" rowspan="1">&nbsp;10<mat-slider tickInterval="5" min="10" max="100" step="5" value="75">{{data?.text}}</mat-slider>100</mat-grid-tile>'
//    template: '<div>&nbsp;{{data?.text}}&nbsp;</div>'
//      template: '10<mat-slider tickInterval="5" min="10" max="100" step="5" value="75">{{data?.text}}</mat-slider>100<h4 style="align:right">a</h4>'
    template: '<mat-grid-list cols="6" rowHeight="25px" gutterSize="1" ><mat-grid-tile colspan="4" rowspan="1"  class="grid-right">&nbsp;10<mat-slider thumbLabel tickInterval="5" min="10" max="100" step="5" value="{{data?.value}}" (change)="onChange($event, data.value)">F2</mat-slider>100</mat-grid-tile><mat-grid-tile colspan="2" rowspan="1" class="grid-left">&nbsp;={{data?.text}}:{{data.value}}=</mat-grid-tile></mat-grid-list>'
})
export class TickSliderComponent implements ZoneSlider {
  @Input() data: any; 
  @Output('change') change:EventEmitter<any> = new EventEmitter<any>();

  onChange($event){
	console.log("onChange $event=",$event);
    this.data.value=$event.value;
	this.change.emit($event);
  }
}

@Component({
    selector: 'toggle-slider',
    template: '<mat-grid-list cols="6" rowHeight="25px" gutterSize="1"><mat-grid-tile colspan="4" rowspan="1" ><mat-slide-toggle [checked]="data?.value" (change)="onChange($event, data.value)" >F4</mat-slide-toggle></mat-grid-tile><mat-grid-tile  colspan="2" rowspan="1" >&nbsp;&nbsp;=Fd:{{checked}}-{{data.value}}=</mat-grid-tile></mat-grid-list>'
})
export class ToggleSliderComponent implements ZoneSlider {
//inpout used for initialisation rather than for update
  @Input() data: any; 
  @Output('change') change:EventEmitter<any> = new EventEmitter<any>();

  onChange($event){
	console.log("onChange $event=",$event);
    this.data.value=$event.checked;
	this.change.emit($event);
  }
}
@Component({
    selector: 'unknown-component',
    template: `<mat-grid-list cols="6" rowHeight="25px" gutterSize="1"><mat-grid-tile colspan="4" rowspan="1" >Unknown component </mat-grid-tile><mat-grid-tile colspan="2" rowspan="1" >{{data?.text}}</mat-grid-tile></mat-grid-list>`
})
export class UnknownDynamicComponent implements ZoneSlider {
  @Input() data: any; 
  @Output('change') change:EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'app-zone-sliders',
  templateUrl: './zone-sliders.component.html',
  styleUrls: ['./zone-sliders.component.css']
})

export class ZoneSlidersComponent implements AfterViewInit, OnDestroy {
  //@Input() 
  public sliders: ZoneSliderItem[];
  @Input() cycling: number = -1; 
  currentSliderIndex: number = -1;
  @ViewChild(ZoneSlidersDirective) sliderHost: ZoneSlidersDirective; //<ng-template slider-host></ng-template>
  //@ViewChild('container', { read: ViewContainerRef }) //<div><div #container></div></div>
  subscription: any;
  interval: any;
  zoneId: String;
  slidersValues:number[] = [];
  //data:any; 

  constructor(private zonesService: ZonesService, private componentFactoryResolver: ComponentFactoryResolver, private _changeDetectionRef : ChangeDetectorRef
  //, private zoneSlidersService: ZoneSlidersService
  ) { 
    //working ok =-1console.log("this.currentSliderIndex=" + this.currentSliderIndex);
	
  }
  
  setSliders(sliders: ZoneSliderItem[], id:String) { 
    console.log( "zonesliderComp setSliders: " , sliders );
	this.zoneId = id;
  	this.sliders = sliders;
	this.loadComponent();
	if(this.cycling > 0) this.reLoadComponent();
  }
  
  getSlidersDatas() { 
  
  }
  
  ngOnInit() { 
  	//this.sliders = this.zoneSlidersService.getGeneralZoneSliders();
	//this.setSliders(this.zoneSlidersService.getGeneralZoneSliders());
	this.setSliders([],"none");
  }
  
  ngAfterViewInit() {
    this.loadComponent();
	if(this.cycling > 0) this.reLoadComponent();	
	this._changeDetectionRef.detectChanges();//https://github.com/angular/angular/issues/6005
  }
  
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  
  //needed on selector: (change)="onChildChange($event)
  onChildChange(event, index:number){
	console.log('onChildChange(event,' + index + '): event: ', event);
	var val = 0;
	if(event.Checked != undefined) val = (event.checked == "true")?1:0;
	if(event.value != undefined) {
	/*
		val unite = event.value % 10;
		val dizaine = event.value / 10 % 10;
		val centaine = event.value / 100 % 10;
		val centaine = event.value / 100 % 10;
		val = (event.checked == "true")?1:0;
	*/
		console.log('onChildChange: _min: ' + event.source._min + ' _max: ' + event.source._max);
		//10 --- 20 --------- 110 -> 0.1
		val = (event.value - event.source._min) / (event.source._max - event.source._min);
	}
	
	//if(typeof event.value  === "string")
	this.zonesService.setZoneValue(this.zoneId, index, val);
  }
  
  /* UNUSED when Angular (re)sets data-bound @Input properties */
  ngOnChanges(changes: SimpleChanges) {
	console.log('ngOnChanges(): SimpleChanges: ', changes);
 //   const name: SimpleChange = changes.name;
 //   console.log('prev value: ', name.previousValue);
 //   console.log('got name: ', name.currentValue);
    //this._name = name.currentValue.toUpperCase();
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
	 this.slidersValues = Array(len) ;
	 if(this.cycling >= 0)  {viewContainerRef.clear();len = 1;}
	 var i = 0;
	 for (; i < len; i++) { 
      this.loadNextComponent(viewContainerRef,i);
	  this.slidersValues[i] = 0.5;
	 }
	 this.zonesService.setZoneValues(this.zoneId, this.slidersValues);
	 //this.onLoadedComponent();
   }
   
   loadNextComponent(viewContainerRef: ViewContainerRef, index:number){ //ComponentRef<{}>) {
    // recupère le prochain indexe de la liste et reprend à 0 si currentSliderIndex est au max 
	// permet un affichage "circulaire" de composants
    this.currentSliderIndex = (this.currentSliderIndex + 1) % this.sliders.length;

    let zoneSliderItem = this.sliders[this.currentSliderIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(zoneSliderItem.component);


    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ZoneSlider>componentRef.instance).data = zoneSliderItem.data;	
	(<ZoneSlider>componentRef.instance).change.subscribe(msg => this.onChildChange(msg,index));
  }
  
  /*
  onLoadedComponent() {
	console.log("onLoadedComponent");
	var i = 0;
	for (; i < this.sliders.length; i++) { 
		let zoneSliderItem = this.sliders[i];
		console.log("zoneSliderItem.data.value: ",zoneSliderItem.data.value);
	}
  }
  */
} 


//export abstract class DynamicComponent {
//    context: any;
//}


