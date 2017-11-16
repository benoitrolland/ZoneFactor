import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'hammerjs/hammer';
import { FormControl }      from '@angular/forms';
	
import { ZoneSlidersService } from './zone-sliders.service';
import { ZoneSliderItem }     from './zone-slider-item';
	
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

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

  constructor(private http:Http, private zoneSlidersService: ZoneSlidersService) {
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
    this.zoneSliders = this.zoneSlidersService.getZoneSliders();
  } 
  
  changeName(newName:string) {
    this.name=newName;
  }
  
}
