import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core'; 
import { ContextSelectorsDirective  } from './context-selectors.directive';
import { ZoneSlider }           from '../zone-slider.interface';   
import { ZoneSliderItem }       from '../zone-slider-item';
import { ZoneSlidersDirective } from '../zone-sliders.directive';
import { ZonesService } from '../shared/index';
import { ZoneSlidersService } from '../shared/zone-sliders.service';
import { FormControl }      from '@angular/forms';
import { ChangeDetectorRef, ViewContainerRef, OnChanges} from '@angular/core';//, SimpleChanges, SimpleChange } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material';

@Component({
    selector: 'context-selector',
//	styleUrls: './ContextSelectorComponent.css',
/*
    template: '	<mat-grid-list cols="6" rowHeight="15px" gutterSize="1" >\
					<mat-grid-tile  colspan="6" rowspan="1"  class="grid-right"><font size="1"></font></mat-grid-tile>\
					<mat-grid-tile style="justify-content: initial;align-items: initial;" colspan="6" rowspan="1" class="grid-left"><font size="0.5">{{data?.text}}</font></mat-grid-tile>\
					<mat-grid-tile colspan="6" rowspan="1"  class="grid-right">&nbsp;{{data?.min}}\
						<mat-slider tickInterval="1" min="{{data?.min}}" max="{{data?.max}}" step="5" value="[{data?.default}]" (change)="onChange($event, data.value)"></mat-slider>{{data?.max}}\
					</mat-grid-tile>\
					<mat-grid-tile  colspan="6" rowspan="1"  class="grid-right"><font size="2">{{data.value}}  ({{data?.unit}})</font></mat-grid-tile>\
				</mat-grid-list>'
zonesService.getContextName( 
<!--[disabled]="contextValue.disabled"
						  <mat-select [(ngModel)]="currentSelected_id"  #zoneControl="ngModel"  (change)="latestChangeEvent = $event; goto($event.value);" >\
--> 
#zoneControl="ngModel"*/				
	template: ' <mat-grid-list cols="6" rowHeight="15px" gutterSize="1" >\
					<mat-grid-tile  colspan="6" rowspan="1"  class="grid-right"><font size="1"></font></mat-grid-tile>\
					<mat-grid-tile style="justify-content: initial;align-items: initial;" colspan="6" rowspan="1" class="grid-left"><font size="1">{{data?.contextName}}</font></mat-grid-tile>\
					<mat-grid-tile colspan="6" rowspan="1"  class="grid-right">&nbsp;{{data?.min}}\
						<mat-form-field  width="100%" cols="6" rowHeight="20px" gutterSize="1" style="text-align: center;  align: center;" shouldPlaceholderFloat="false">\
						  <mat-select [(ngModel)]="data.default" (change)="onChange($event, data.value)" >\
							<mat-placeholder>{{data.name}}</mat-placeholder>\
							<mat-option *ngFor="let contextValue of data.values" [value]="contextValue" style="align:center; text-align: center;"><font size="1">{{ contextValue }}</font></mat-option>\
						  </mat-select>\
						  <mat-hint>hint</mat-hint>\
						  <mat-error>You must make a selection</mat-error>\
						</mat-form-field>\
					</mat-grid-tile><!--\
					<mat-grid-tile  colspan="6" rowspan="1"  class="grid-right"><font size="2">{{data?.value}}:({{data?.unit}})</font></mat-grid-tile> -->\
				</mat-grid-list>'

})
export class ContextSelectorComponent implements OnInit, ZoneSlider {
	@Input() data: any;
	@Output('change') change:EventEmitter<any> = new EventEmitter<any>();
	@ViewChild(MatSelect) public valueSelector: MatSelect;
	
	//currentSelected_id : String ; //= this.data.default;
	//selectedId; //: String[];
	//values; //: String[];
	//searchControl: FormControl;
	//name:String = this.data.default;
	
	constructor( private zoneSlidersService: ZoneSlidersService, private zonesService: ZonesService) {//OnInit?
    
		console.log( "AppComponent Constructor" );  
		//this.data.name='default';
		//this.searchControl = new FormControl();  
	
	}
  
	ngOnInit() {  
		console.log( "ContextSelectorComponent ngOnInit" );
		//this.zonesService.getAllZones().subscribe((zones: any[]) => this.zones = zones);
		//this.zonesService.getContextValues(this.data.text).subscribe((contextValues: any[]) => this.contextValues = contextValues);
		//KO? this.contextValues = this.zonesService.getContextValues(this.data.text,this.data.name);
	}
	
	onChange($event){
		console.log("onChange $event=",$event);	
		if($event != undefined){
			this.data.value=$event.value;
			this.valueSelector.value=$event.value;
		}	
		this.change.emit($event);
	}
  
}

@Component({
  selector: 'app-context-form',
  template: '<div class="ctxSelectors" (change)="onChildChange($event)">\
				<ng-template ctxSelectors-host ></ng-template>\
			</div>',
  styleUrls: ['./context-form.component.css']
})

export class ContextFormComponent  implements AfterViewInit, OnDestroy  {

	public sliders: ZoneSliderItem[];
	@Input() cycling: number = -1; 
	currentSliderIndex: number = -1;
	@ViewChild(ContextSelectorsDirective) ctxSelectorsHost: ContextSelectorsDirective;
	interval: any;
	zoneId: String;
	slidersValues:number[] = [];
	
	constructor(private zonesService: ZonesService, private componentFactoryResolver: ComponentFactoryResolver, private _changeDetectionRef : ChangeDetectorRef) { 
	}

	ngOnInit() {
		this.setSliders([],"none");
	}
	
	setSliders(sliders: ZoneSliderItem[], id:String) { 
		console.log( "contextFormComp setSliders: " , sliders );
		this.zoneId = id;
		this.sliders = sliders;
		this.loadComponent();
		if(this.cycling > 0) this.reLoadComponent();
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
	//TODO 
	//setSelectedContext(zoneId,num);
  }
  
/* UNUSED when Angular (re)sets data-bound @Input properties 
   ngOnChanges(changes: SimpleChanges) {
	 console.log('ngOnChanges(): SimpleChanges: ', changes);
 //   const name: SimpleChange = changes.name;
 //   console.log('prev value: ', name.previousValue);
 //   console.log('got name: ', name.currentValue);
    //this._name = name.currentValue.toUpperCase();
   } 
 */ 
   reLoadComponent() {
     this.interval = setInterval(() => {
       this.loadComponent();
     }, this.cycling);
   }

   loadComponent() {
   
     let viewContainerRef = this.ctxSelectorsHost.viewContainerRef;     
	 viewContainerRef.clear();
	 let len = this.sliders.length;
	 this.slidersValues = Array(len) ;
	 if(this.cycling >= 0)  {viewContainerRef.clear();len = 1;}
	 
	 var i = 0;
	 for (; i < len; i++) { 
      this.loadNextComponent(viewContainerRef,i);
	 }
	 //this.zonesService.setZoneValues(this.zoneId, this.slidersValues);
	 this.slidersValues = this.zonesService.getZoneValues(this.zoneId);
	 
	 //this.onLoadedComponent();
   }
   
   loadNextComponent(viewContainerRef: ViewContainerRef, index:number){ //ComponentRef<{}>) {
     // recupère le prochain indexe de la liste et reprend à 0 si currentSliderIndex est au max 
	 // permet un affichage "circulaire" de composants
     this.currentSliderIndex = (this.currentSliderIndex + 1) % this.sliders.length;

     let zoneSliderItem = this.sliders[this.currentSliderIndex];
	 let contextName = this.zonesService.getContextName(this.zoneId,this.currentSliderIndex);
     let componentFactory = this.componentFactoryResolver.resolveComponentFactory(zoneSliderItem.component);
	 
     let componentRef = viewContainerRef.createComponent(componentFactory);
	 let zoneSlider:ZoneSlider = (<ZoneSlider>componentRef.instance);
     zoneSlider.data = zoneSliderItem.data;	
	 zoneSlider.change.subscribe(msg => this.onChildChange(msg,index));
	 if(zoneSlider.valueSelector instanceof MatSelect){ 
		//zoneSlider.data.default=zoneSlider.data.default;
		//zoneSlider.data.contextValues=zoneSlider.data.values;
		//zoneSlider.valueSelector.values=zoneSlider.data.values;
		console.log("getContextValues("+this.zoneId+","+this.currentSliderIndex+"):");
		zoneSlider.data.values = this.zonesService.getContextValues(this.zoneId,contextName); //this.currentSliderIndex);//this.currentSliderIndex);//zoneSlider.data.index);
		console.log("zoneSlider.data.values:",zoneSlider.data.values);
		//zoneSlider.data.default=zoneSlider.data.values[0];
		zoneSlider.data.name = contextName;
	 }
	 /*
	 if(zoneSlider.valueSelector instanceof MatSlider){ 
		zoneSlider.data.value=zoneSlider.data.default;
		zoneSlider.valueSelector.value=zoneSlider.data.default;
	 }else if(zoneSlider.valueSelector instanceof MatSlideToggle){	 
		zoneSlider.data.value=zoneSlider.data.default;
		zoneSlider.valueSelector.checked=zoneSlider.data.default;
	 }
	 */
   }
}
