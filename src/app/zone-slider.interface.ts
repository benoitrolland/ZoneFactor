import { Type, EventEmitter } from '@angular/core';
import { MatSlider, MatSlideToggle, MatSelect, MatSliderChange, MatSlideToggleChange, MatSelectChange } from '@angular/material';

export interface ZoneSlider {
  valueSelector: MatSlider | MatSlideToggle | MatSelect; // valueSelector.value
  data: any;
  change: EventEmitter<any>;
  // component: Type<any>;
  onChange($event: MatSliderChange | MatSlideToggleChange | MatSelectChange);
}
