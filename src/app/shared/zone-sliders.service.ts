import { Injectable } from '@angular/core';
import {TickSliderComponent,ToggleSliderComponent,UnknownDynamicComponent} from '../zone-sliders/zone-sliders.component';
import { ZoneSliderItem } from '../zone-slider-item';
import { ZonesService } from './index';

@Injectable()
export class ZoneSlidersService {

  constructor(private zonesService: ZonesService) { }

/*  
  getGeneralZoneSliders() {
//    this.http.get('https://jsonplaceholder.typicode.com/photos')
//      .map(response => response.json())
//      .subscribe(res => this.myPicMetaData = res);

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
*/
  
    getFactorSlidersForZoneAndContext(zone:any){ //,contextIndex) {	
		if(!this.zonesService.isColorable(zone))return [];
		console.log( "- getFactorSlidersForZoneAndContext (" + zone + /*","+contextIndex+ */")" );
		let factorsForContext = this.zonesService.getFactorsForSelectedContext(zone);
		if(factorsForContext != undefined){
			let factorIds = Object.keys(factorsForContext.factorsCoef); //this.zonesService.getFactors(zone); //,contextIndex);
			let lastImputedValues = Object.values(factorsForContext.lastImputedValues);
			console.log( "- lastImputedValues found ", lastImputedValues );
			if(factorIds != undefined){
				let nbFactors = Object.entries(factorIds).length;
				console.log( "- getFactorSlidersForZoneAndContext found " + nbFactors + " factorIds:", factorIds );
				//ko let zoneSliderItems:ZoneSliderItem[] = new Array(nbFactors);
				let zoneSliderItems = new Array(nbFactors);
				for (let i = 0; i < nbFactors; i++) {
					let factorId = factorIds[i];
					let factorConsts = this.zonesService.getFactorConsts(zone,factorId);
					zoneSliderItems[i] = new ZoneSliderItem(TickSliderComponent,{text:factorConsts.category+"/"+factorConsts.subCategory+"/"+factorConsts.name,unit:factorConsts.unit,min:factorConsts.min,max:factorConsts.max,default:lastImputedValues[i]});
				}
				console.log( "- getFactorSlidersForZoneAndContext returning " + zoneSliderItems.length + " zoneSliderItems", zoneSliderItems );
				return zoneSliderItems;
			}
		}
		return [];
/*			
			if ( zone == 'World' ) {
				return [new ZoneSliderItem(ToggleSliderComponent,{text:'Toggle Slider'})];
			}
 
    return [
        new ZoneSliderItem(TickSliderComponent,{text:'Tick Slider'}),
        new ZoneSliderItem(ToggleSliderComponent,{text:'Toggle Slider'}),
        new ZoneSliderItem(UnknownDynamicComponent,{text:zone +' ..'})
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Hiring for several positions', body: 'Submit your resume today!'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Openings in all departments',  body: 'Apply today'}),
    ];
	*/
  }
  
}
