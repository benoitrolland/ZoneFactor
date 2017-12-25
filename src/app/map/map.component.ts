import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/impress';
import { ImpressService } from '../shared/impress.service';
import { ImpressComponent } from '../impress/impress.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ImpressService]
})
export class MapComponent implements OnInit {
    //public data = {};
	@ViewChild(ImpressComponent) impressComponent : ImpressComponent;
	currentImpressStep : HTMLElement;
	
	currentImpressStep_id : String = "_";

  constructor(private impressService: ImpressService) { 
  
    this.impressService.stepEnter$.subscribe((event) => {
	        this.currentImpressStep = event.target; // And he have data here too!
			this.currentImpressStep_id = this.currentImpressStep.id
	        console.log( "Entered the Step Element '" + this.currentImpressStep.id + "'" );
                
            }
        );
		
  }

  ngOnInit() {
  
  }

}
