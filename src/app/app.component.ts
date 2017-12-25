import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'hammerjs/hammer';
import { FormControl }      from '@angular/forms';
	
import { ZoneSlidersService } from './zone-sliders.service';
import { ZoneSliderItem }     from './zone-slider-item';
import { ImpressService } from './shared/impress.service';
import { MapComponent } from './map/map.component';
	
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ImpressService]
//https://stackoverflow.com/questions/39410417/how-to-import-component-into-another-root-component-in-angular-2/39410510#39410510
//  ,  directives: [MapComponent] 
//  , declarations: [MapComponent] 
})
//,  directives: [MapComponent] 

export class AppComponent implements OnInit, AfterViewInit {

  title = 'Resultats';
  myControl: FormControl;
  myPicMetaData: Array<any>;
  worldMapURL: "assets/img/world.svg";
  continent: Array<any>;
  country: Array<any>;
  state: Array<any>;
  region: Array<any>;  
  departement: Array<any>;
  currentCountry='France';
  private name: string;
  zoneSliders: ZoneSliderItem[];
  //currentImpressStep : HTMLElement;
  
  @ViewChild(MapComponent) mapComponent:MapComponent;
  currentImpressStep_id : String = "_";

  constructor(private http:Http, private zoneSlidersService: ZoneSlidersService, private impressService: ImpressService) {//OnInit?
    
  console.log( "AppComponent Constructor" );
	
  
  
  //constructor(private zoneSlidersService: ZoneSlidersService) {
    //this.zoneSliders = this.zoneSlidersService.getZoneSliders();
	
    this.name='default';
    this.myControl = new FormControl();
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

	
  }
  
  ngOnInit() {
  
    console.log( "AppComponent ngOnInit" );
    this.zoneSliders = this.zoneSlidersService.getZoneSliders();
	/*
	this.impressService.stepEnter$.subscribe((event) => {
	        this.currentImpressStep_id = event.target.id; // And he have data here too!
	        console.log( "App Entered the Step Element '" + this.currentImpressStep_id + "'" );
                
            }
        );
*/		
  } 
  ngAfterViewInit() {
        //this.currentImpressStep_id = this.mapComponent.currentImpressStep_id;
			this.impressService.stepEnter$.subscribe((event) => {
	        this.currentImpressStep_id = event.target.id; // And he have data here too!
	        console.log( "App Entered the Step Element '" + this.currentImpressStep_id + "'" );
                
            });
    }
  
  changeName(newName:string) {
    this.name=newName;
  }
  
}
