import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'step-paramount',
  templateUrl: './paramount.component.html',
  styleUrls: ['./paramount.component.css']
})
export class ParamountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'step-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./paramount.component.css']
})
export class GreetingsComponent implements OnInit {

  constructor() {}
  
  ngOnInit() {
  }
}
