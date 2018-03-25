import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { } from '@types/impress';
import { ImpressService } from '../shared/impress.service';
import { ZonesService } from '../shared/zones.service';
import { ImpressComponent } from '../impress/impress.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

import { Observable } from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	//public data = {};
	@ViewChild(ImpressComponent) impressComponent : ImpressComponent;
	currentImpressStep : HTMLElement;	
	currentImpressStep_id : String = "World";
	currentZoneName : any = "*";
	//currentIncidence : number = 10;
	//how-to-detect-when-an-input-value-changes-in-angular
	//https://stackoverflow.com/questions/38571812/how-to-detect-when-an-input-value-changes-in-angular
	@Input() sidenav;	
	//to be used in parent html: <app-map (stepUpdate)="doSomething($event)"></app-map>
	@Output('stepUpdate') stepChange: EventEmitter<any> = new EventEmitter<any>(); //https://toddmotto.com/component-events-event-emitter-output-angular-2

  constructor(private impressService: ImpressService,private zonesService: ZonesService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
	//https://github.com/angular/material2/blob/master/src/demo-app/icon/icon-demo.ts
	iconRegistry
        .addSvgIcon('color-scale',
            sanitizer.bypassSecurityTrustResourceUrl('/assets/img/color_scale.svg'))
//        .addSvgIconSetInNamespace('core',
//            sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/core-icon-set.svg'))
        .registerFontClassAlias('fontawesome', 'fa');
    this.impressService.stepEnter$.subscribe((event) => {
				this.currentImpressStep = event.target; // And he have data here too!
				console.log( "Map Entered the Step Element '" + this.currentImpressStep.id + "'" );
				this.currentImpressStep_id = this.currentImpressStep.id
				this.currentZoneName = zonesService.getZoneName(this.currentImpressStep_id); //.subscribe((zone: any) => this.currentZoneName = zone);               
				this.stepChange.emit(event);
            }
        );
  }

  ngOnInit() {
  
  }
  //called by html
  getCurrentIncidence(zoneId:String){
    console.log("======= getCurrentIncidence ====== " + zoneId);
	return this.zonesService.getZoneIncidence(zoneId);
  }

}
