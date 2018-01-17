import { Injectable } from '@angular/core';
import {TickSliderComponent,ToggleSliderComponent,UnknownDynamicComponent} from '../zone-sliders/zone-sliders.component';
import { ZoneSliderItem } from '../zone-slider-item';
import { ZonesService } from './index';

@Injectable()
export class ZoneSlidersService {

  constructor(private zonesService: ZonesService) { }
  
  getGeneralZoneSliders() {
/*  
    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .map(response => response.json())
      .subscribe(res => this.myPicMetaData = res);
*/  
    return [
        new ZoneSliderItem(TickSliderComponent,{text:'Tick Slider',value:50}),
        new ZoneSliderItem(ToggleSliderComponent,{text:'Toggle Slider',value:'checked'}),
        new ZoneSliderItem(UnknownDynamicComponent,{text:'unknown ..'})
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Hiring for several positions', body: 'Submit your resume today!'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Openings in all departments',  body: 'Apply today'}),
    ];
  } 
  
    getFactorSlidersForZone(zone:any) {	
		if(!this.zonesService.isColorable(zone))return [];
		console.log( "- getFactorSlidersForZone (" + zone + ")" );
		let factors = this.zonesService.getFactors(zone);
		let zoneSliderItems:ZoneSliderItem[] = Array(factors.length);
		for (var i = 0, len = zoneSliderItems.length; i < len; i++) {
			let factor = factors[i];
			zoneSliderItems[i] = new ZoneSliderItem(TickSliderComponent,{text:'Toggle Slider',unit:'',min:'',max:'',default:''});
		}
		
		if ( zone == 'World' ) {
			return [new ZoneSliderItem(ToggleSliderComponent,{text:'Toggle Slider'})];
		}
/*  
    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .map(response => response.json())
      .subscribe(res => this.myPicMetaData = res);
*/  
    return [
        new ZoneSliderItem(TickSliderComponent,{text:'Tick Slider'}),
        new ZoneSliderItem(ToggleSliderComponent,{text:'Toggle Slider'}),
        new ZoneSliderItem(UnknownDynamicComponent,{text:zone +' ..'})
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Hiring for several positions', body: 'Submit your resume today!'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Openings in all departments',  body: 'Apply today'}),
    ];
  }
  
}
