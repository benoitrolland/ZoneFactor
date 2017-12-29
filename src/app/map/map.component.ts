import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { } from '@types/impress';
import { ImpressService } from '../shared/impress.service';
import { ZonesService } from '../shared/zones.service';
import { ImpressComponent } from '../impress/impress.component';

import { Observable } from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ImpressService,ZonesService]
})
export class MapComponent implements OnInit {
	//public data = {};
	@ViewChild(ImpressComponent) impressComponent : ImpressComponent;
	currentImpressStep : HTMLElement;	
	currentImpressStep_id : String = "World";
	currentZoneName : any = "*";
	@Input() sidenav;	
	//to be used in parent html: <app-map (stepUpdate)="doSomething($event)"></app-map>
	@Output('stepUpdate') stepChange: EventEmitter<any> = new EventEmitter<any>(); //https://toddmotto.com/component-events-event-emitter-output-angular-2

  constructor(private impressService: ImpressService,private zonesService: ZonesService) { 
  
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

}
