import {Component, ElementRef, ViewChild} from '@angular/core';

class Coord {
  xPos: number = 0;
  yPos: number = 0;

  constructor(x: number, y: number) {
    this.xPos = x;
    this.yPos = y;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
