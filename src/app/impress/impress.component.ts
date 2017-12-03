import { Component, OnInit } from '@angular/core';
import { } from '@types/impress';
//import { } from 'impress.js';
import { AccessoComponent } from './steps/accesso/accesso.component';
import { ListComponent } from './steps/list/list.component';

@Component({
  selector: '[impress]',
  templateUrl: './impress.component.html',
  styleUrls: ['./impress.component.css']
})
export class ImpressComponent implements OnInit {

  //imp : Impress<Any>;
  
  constructor() {
    //Impress.init();
  //private imp:Impress 
    //impress().init();
	//Impress.init();//TypeError: Cannot read property 'init' of undefined
	//this.imp.init();
  }

  ngOnInit() {
     //this.imp.init();
	 impress().init();
  }

}
