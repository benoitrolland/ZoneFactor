import { Injectable } from '@angular/core';
import {TickSliderComponent,ToggleSliderComponent,UnknownDynamicComponent} from './zone-sliders/zone-sliders.component';
import { ZoneSliderItem } from './zone-slider-item';

@Injectable()
export class ZoneSlidersService {

  constructor() { }
  getZoneSliders() {
    return [
        new ZoneSliderItem(TickSliderComponent,{text:'Tick Slider'}),
        new ZoneSliderItem(ToggleSliderComponent,{text:'Toggle Slider'}),
        new ZoneSliderItem(UnknownDynamicComponent,{text:'unknown ..'})
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
//      new ZoneSliderItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Hiring for several positions', body: 'Submit your resume today!'}),
//      new ZoneSliderItem(HeroJobAdComponent,   {headline: 'Openings in all departments',  body: 'Apply today'}),
    ];
  } 
}
