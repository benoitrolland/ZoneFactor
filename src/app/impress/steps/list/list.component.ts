import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
//https://www.angularjs4u.com/events/angular-2-keyboard-events/
@Component({
  selector: 'step-list',
  host: {'(window:keydown)': 'hotkeys($event)'},
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

//https://angular.io/api/core/Renderer2
  constructor(private renderer:Renderer2) {
  }
  
  hotkeys(event){
    if (event.keyCode == 'a'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .name');
      this.renderer.addClass(rey,'enter');
    }
	else if (event.keyCode == 'j'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .name');
      this.renderer.addClass(rey,'strikethrough');
    }
	else if (event.keyCode == 's'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .job');
      this.renderer.addClass(rey,'enter');
    }
	else if (event.keyCode == 'k'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .job');
      this.renderer.addClass(rey,'strikethrough');
    }
	else if (event.keyCode == 'd'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .github');
      this.renderer.addClass(rey,'enter');
    }
	else if (event.keyCode == 'l'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .github');
      this.renderer.addClass(rey,'strikethrough');
    }
	else if (event.keyCode == 'f'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .cars');
      this.renderer.addClass(rey,'enter');
    }
	else if (event.keyCode == ';'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .cars');
      this.renderer.addClass(rey,'strikethrough');
    }
	else if (event.keyCode == 'g'.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .pets');
      this.renderer.addClass(rey,'enter');
    }
	else if (event.keyCode == '\''.charCodeAt(0)){
      let rey = this.renderer.selectRootElement('.rey .pets');
      this.renderer.addClass(rey,'strikethrough');
    }
  }
  
  ngOnInit() {
  

 /*
        this.hotkeys.bindTo(this.$scope)
        //REY
            .add({
                combo      : 'a',
                description: 'Enter rey',
                callback   : () => {
                    let rey = document.querySelector('.rey .name');
                    angular.element(rey).addClass('enter')
                }
            })
            .add({
                combo      : 'j',
                description: 'Done rey',
                callback   : () => {
                    let rey = $('.rey .name');
                    rey.addClass('strikethrough')
                }
            })
            //JOB
            .add({
                combo      : 's',
                description: 'Enter rey',
                callback   : () => {
                    let rey = $('.rey .job');
                    rey.addClass('enter')
                }
            })
            .add({
                combo      : 'k',
                description: 'Done job',
                callback   : () => {
                    let rey = $('.rey .job');
                    rey.addClass('strikethrough')
                }
            })
            //GITHUB
            .add({
                combo      : 'd',
                description: 'Enter Github',
                callback   : () => {
                    let rey = $('.rey .github');
                    rey.addClass('enter')
                }
            })
            .add({
                combo      : 'l',
                description: 'Done github',
                callback   : () => {
                    let rey = $('.rey .github');
                    rey.addClass('strikethrough')
                }
            })

            //CARS
            .add({
                combo      : 'f',
                description: 'Enter Cars',
                callback   : () => {
                    let rey = $('.rey .cars');
                    rey.addClass('enter')
                }
            })
            .add({
                combo      : ';',
                description: 'Done Cars',
                callback   : () => {
                    let rey = $('.rey .cars');
                    rey.addClass('strikethrough')
                }
            })

            //DOGS
            .add({
                combo      : 'g',
                description: 'Enter pets',
                callback   : () => {
                    let rey = $('.rey .pets');
                    rey.addClass('enter')
                }
            })
            .add({
                combo      : '\'',
                description: 'Done pets',
                callback   : () => {
                    let rey = $('.rey .pets');
                    rey.addClass('strikethrough')
                }
            })
*/
  }

}
