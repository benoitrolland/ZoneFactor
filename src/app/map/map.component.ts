import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
	
	currentImpressStep_id : String = "";
	currentZoneName : any = "*";
	@Input() sidenav;

  constructor(private impressService: ImpressService,private zonesService: ZonesService) { 
  
    this.impressService.stepEnter$.subscribe((event) => {
	        this.currentImpressStep = event.target; // And he have data here too!
			console.log( "Entered the Step Element '" + this.currentImpressStep.id + "'" );
			this.currentImpressStep_id = this.currentImpressStep.id
			this.currentZoneName = zonesService.getZoneName(this.currentImpressStep_id); //.subscribe((zone: any) => this.currentZoneName = zone);

	        console.log( "Entered the Step Element '" + this.currentImpressStep.id + "'" );
                
            }
        );
		
  }

  ngOnInit() {
  
  }

}
