import { Component, OnInit, AfterViewInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'hammerjs/hammer';
import { FormControl }      from '@angular/forms';
import { ZoneSlidersComponent } from './zone-sliders/zone-sliders.component';
import { ZoneSlidersService } from './zone-sliders.service';
import { ZoneSliderItem }     from './zone-slider-item';
import { ImpressService } from './shared/impress.service';
import { ZonesService } from './shared/zones.service';
import { MapComponent } from './map/map.component';
import { ImpressComponent } from './impress/impress.component';
	
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ImpressService,ZonesService]
//https://stackoverflow.com/questions/39410417/how-to-import-component-into-another-root-component-in-angular-2/39410510#39410510
//  ,  directives: [MapComponent] 
//  , declarations: [MapComponent] 
})
//,  directives: [MapComponent] 

export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {

  //imp : Impress;
  title = 'Resultats';
  searchControl: FormControl;
  myPicMetaData: Array<any>;
  worldMapURL: "assets/img/world.svg";
  continent: Array<any>;
  country: Array<any>;
  state: Array<any>;
  region: Array<any>;  
  departement: Array<any>;
  currentCountry='France';
  private name: string;
  //zoneSliders: ZoneSliderItem[];
  zones: String[];
  @ViewChild(ZoneSlidersComponent) zoneSlidersComponent : ZoneSlidersComponent;
  //currentImpressStep : HTMLElement;
  
  @ViewChild(MapComponent) mapComponent:MapComponent;
  //https://stackoverflow.com/questions/47559141/angular-2-viewchild-not-working-cannot-read-property-title-of-undefined?rq=1
  //@ViewChild(ImpressComponent) impressComponent:ImpressComponent;
  impressComponent:ImpressComponent;
  
  currentImpressStep_id : String = "World";

  constructor(private http:Http, private zoneSlidersService: ZoneSlidersService, private impressService: ImpressService, private zonesService: ZonesService, private _changeDetectionRef : ChangeDetectorRef) {//OnInit?
    
  console.log( "AppComponent Constructor" );  
  
  //constructor(private zoneSlidersService: ZoneSlidersService) {
    //this.zoneSliders = this.zoneSlidersService.getZoneSliders();
	
    this.name='default';
    this.searchControl = new FormControl();
	/*
	this.impressService.stepEnter$.subscribe((event) => {
				this.currentImpressStep_id = event.target.id; // And he have data here too!
				console.log( "App Entered the Step Element '" + this.currentImpressStep_id + "'" );
				this.zoneSliders = this.zoneSlidersService.getZoneSliders(event.target.id);    
				this.zoneSlidersComponent.reLoadComponent();
				this._changeDetectionRef.detectChanges();//https://github.com/angular/angular/issues/17572

				//console.log( "App Entered the Step Element '" + this.currentImpressStep_id + "'" );
                
            }
        );
	*/
	
	/*
    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .map(response => response.json())
      .subscribe(res => this.myPicMetaData = res);
    */
//	https://stackoverflow.com/questions/36368405/how-to-parse-xml-in-angular-2
//	xml2js = require('xml2js');
//	var parser = new xml2js.Parser({explicitArray : false});
//	used xml2js parser from npm (https://www.npmjs.com/package/xml2js)
//	and in my service i used this 
//	autocompleteGeoZones = this.http.get(this.worldMapURL)
//					.flatMap(res=>{
//							return Observable.fromPromise(this.getJSON(res.text()))
//					})
//					.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
//	autocompleteGeoZones
//loadComponent()	
  }
  
  ngOnInit() {
  
    console.log( "AppComponent ngOnInit" );
	this.zonesService.getAllZones().subscribe((zones: any[]) => this.zones = zones);

    //this.zoneSliders = this.zoneSlidersService.getGeneralZoneSliders();
	/*
	this.impressService.stepEnter$.subscribe((event) => {
	        this.currentImpressStep_id = event.target.id; // And he have data here too!
	        console.log( "App Entered the Step Element '" + this.currentImpressStep_id + "'" );
                
            }
        );
   */		
  } 
    ngAfterViewInit() {
		console.log( "- ngAfterViewInit " );
        //this.currentImpressStep_id = this.mapComponent.currentImpressStep_id;
		/*
			this.impressService.stepEnter$.subscribe((event) => {
				this.currentImpressStep_id = event.target.id; // And he have data here too!
				console.log( "App Entered the Step Element '" + this.currentImpressStep_id + "'" );
				this.zoneSliders = this.zoneSlidersService.getZoneSliders(event.target.id);    
				this.zoneSlidersComponent.reLoadComponent();
				this._changeDetectionRef.detectChanges();//https://github.com/angular/angular/issues/17572
            });
		*/
		// this.zoneSliders = this.zoneSlidersService.getZoneSliders(this.mapComponent.currentZoneName); 
		 //this.zoneSlidersComponent.reLoadComponent();
		// this._changeDetectionRef.detectChanges();//https://github.com/angular/angular/issues/17572
           // this.zoneSliders = this.zoneSlidersService.getZoneSliders(this.mapComponent.currentZoneName);  
			
    }
	
	ngAfterViewChecked(){
		this.impressComponent = this.mapComponent.impressComponent;
		//this.zoneSliders = this.zoneSlidersService.getZoneSliders(this.mapComponent.currentZoneName); 
		//this.zoneSlidersComponent.reLoadComponent();
		//this._changeDetectionRef.detectChanges();//https://github.com/angular/angular/issues/17572
		//console.log( "- ngAfterViewChecked " + this.mapComponent.currentZoneName);
	}
	
	onStepUpdate(event:any){
		console.log( "App onStepUpdate: " , event.target.id );
		this.currentImpressStep_id = event.target.id;
		this.zoneSlidersComponent.setSliders(this.zoneSlidersService.getZoneSliders(event.target.id), event.target.id); 
		//sidenav.open();
		//this._changeDetectionRef.detectChanges();
	}
  
	changeName(newName:string) {
		this.name=newName;
	}
  
	public goto(index:any) {
		this.impressComponent.imp.goto(index); 
	}
	
	public getzoneSlidersLength() {
	    if (this.zoneSlidersComponent.sliders === undefined) return 0;
		return this.zoneSlidersComponent.sliders.length;
	}
}
