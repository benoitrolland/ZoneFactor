import { Component, OnInit } from '@angular/core';
import { } from '@types/impress';
//import { } from 'impress.js';
//import { AccessoComponent } from './steps/accesso/accesso.component';
//import { ListComponent } from './steps/list/list.component';
import { ImpressService } from '../shared/impress.service';

@Component({
  selector: '[impress]',
  templateUrl: './impress.component.html',
  styleUrls: ['./impress.component.css']
})
export class ImpressComponent implements OnInit {

  imp : Impress;
  impressElement : HTMLElement;
  currentImpressStep : HTMLElement;
  myImpressService:ImpressService;
  
  constructor(myImpressService:ImpressService) {
   this.myImpressService = myImpressService;
   console.log("this.myImpressService constructeur ", this.myImpressService);
    //Impress.init();
  //private imp:Impress 
    //impress().init();
	//Impress.init();//TypeError: Cannot read property 'init' of undefined
	//this.imp.init();
	//this.imp = impress();
  }

  ngOnInit() {
    this.imp = impress();
     //this.imp.init();
	 //impress().init();
	this.imp.init();
	//this.imp.computeWindowScale ({maxScale = 2});
	this.impressElement = document.getElementById( "impress" );
	//https://github.com/impress/impress.js/blob/master/DOCUMENTATION.md
	//this.impressElement.addEventListener( "impress:stepenter", event => function(event) {
	console.log( "this.myImpressService ngOnInit a ", this.myImpressService );
	this.impressElement.addEventListener( "impress:stepenter", () => this.ngOnImpressStepEnter(event) );
	/*
	this.impressElement.addEventListener( "impress:stepenter", function(event) {
	//this.impressElement.addEventListener( "stepenter", function(event) {
	  this.currentImpressStep = event.target;
	  console.log( "Entered the Step Element '" + this.currentImpressStep.id + "'" );
	  console.log( "this.myImpressService ngOnInit ", this.myImpressService );
	  this.myImpressService.stepEnter();
	 });
	*/
  }
  //function 
  ngOnImpressStepEnter(event:any) {
    this.currentImpressStep = event.target;	
	  console.log( "Entered the Step Element '" + this.currentImpressStep.id + "'" );
	  console.log( "this.myImpressService ngOnInit ", this.myImpressService );
      this.myImpressService.stepEnter(event);
  }
  goto(index:any) {
     this.imp.goto(index); 
  }
}
