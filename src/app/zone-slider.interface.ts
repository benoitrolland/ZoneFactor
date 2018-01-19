import { Type, EventEmitter } from '@angular/core';
import { MatSliderModule, MatSlider, MatSlideToggle, MatSliderChange, MatSlideToggleChange } from '@angular/material';

export interface ZoneSlider {
  matSlide: MatSlider | MatSlideToggle;
  data: any; 
  change:EventEmitter<any>;
  //component: Type<any>;
  onChange($event:MatSliderChange|MatSlideToggleChange);
}
