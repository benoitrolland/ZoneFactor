import { Type, EventEmitter } from '@angular/core';
import { ZoneSlider } from './zone-slider.interface';

export class ZoneSliderItem {

  constructor(public component: Type<ZoneSlider>, public data: any) {
  }

}
