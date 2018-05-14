import { Injectable } from '@angular/core';
import { ContextSelectorComponent } from '../context-form/context-form.component';
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
	getContextSlidersForZone(zone:any){
		if(!this.zonesService.isColorable(zone))return [];
		console.log( "- getContextSlidersForZone (" + zone + /*","+contextIndex+ */")" );
		let factorsForContext = this.zonesService.getFactorsForContexts(zone);//getContextForSelectedZone(zone);
		if(factorsForContext != undefined){
			let nbContexts = factorsForContext.length;
		    console.log( "- getContextSlidersForZone factorsForContext ", factorsForContext );
		    console.log( "- getContextSlidersForZone factorsForContext.context ", factorsForContext.context );
			let contextNames = Object.keys(factorsForContext[0].context); //this.zonesService.getFactors(zone); //,contextIndex);
			//let lastImputedValues = Object.values(factorsForContext.lastImputedValues);
			//console.log( "- lastImputedValues found ", lastImputedValues );
			if(contextNames != undefined){
				let zoneSliderItems:ZoneSliderItem[] = new Array<ZoneSliderItem>(nbContexts);
				let j=0;
			    for(j=0;j<Object.entries(contextNames).length;j++){
					let contextName = contextNames[j];
					
					//console.log( "- getContextSlidersForZone found " + nbContexts + " contextNames:", contextNames );
					//ko let zoneSliderItems:ZoneSliderItem[] = new Array(nbContexts);
					
					//get list of possible values for given context element
					let zoneSliderValues = this.zonesService.getContextValues(zone,contextName);
					/*for (let i = 0; i < nbContexts; i++) {
						let factorId = contextNames[i];
						//let factorConsts = this.zonesService.getFactorConsts(zone,factorId);						
					}*/
					//La valeur par defaut est la première de la liste, 
					//sauf si une autre valeur a été enregistrée pour le contexte courant: zonesService
					let defaultValue = zoneSliderValues.values().next().value;
					console.log( "- new ZoneSliderItem(ContextSelectorComponent,{text:contextName=" + contextName + " default:defaultValue=" + defaultValue + " values:zoneSliderValues=" , zoneSliderValues );
					zoneSliderItems[j] = new ZoneSliderItem(ContextSelectorComponent,{contextName:contextName,default:defaultValue,values:zoneSliderValues}); //,default:lastImputedValues[i]});
				}
				console.log( "- getContextSlidersForZone returning " + zoneSliderItems.length + " zoneSliderItems", zoneSliderItems );
				return zoneSliderItems;
			}
		}
		return [];
	}
	
    getFactorSlidersForZoneAndContext(zone:any){ //,contextIndex) {	
		if(!this.zonesService.isColorable(zone))return [];
		console.log( "- getFactorSlidersForZoneAndContext (" + zone + /*","+contextIndex+ */")" );
		//let contextIndex = this.zonesService.selectedContextNums.get(zone);
		//console.log( "- getFactorSlidersForZoneAndContext (" + zone + ","+contextIndex+")" );
		let factorsForContext = this.zonesService.getFactorsForSelectedContext(zone);
		if(factorsForContext != undefined){
			let factorIds = Object.keys(factorsForContext.factorsCoef); //this.zonesService.getFactors(zone); //,contextIndex);
			let lastImputedValues = Object.values(factorsForContext.lastImputedValues);
			let contextIndex = this.zonesService.selectedContextNums.get(zone);
			console.log( "- lastImputedValues found ("+zone+","+contextIndex+")", lastImputedValues );
			if(factorIds != undefined){
				let nbFactors = Object.entries(factorIds).length;
				console.log( "- getFactorSlidersForZoneAndContext found " + nbFactors + " factorIds:", factorIds );
				//ko let zoneSliderItems:ZoneSliderItem[] = new Array(nbFactors);
				let zoneSliderItems:ZoneSliderItem[] = new Array<ZoneSliderItem>(nbFactors);
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
