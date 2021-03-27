import {Component, ElementRef, ViewChild} from '@angular/core';
import {Coord} from './models/coord';
import {RayTraceUtils} from './utils/ray-trace-utils';

@Component({
  selector: 'app-ray-trace-graph',
  templateUrl: './ray-trace-graph.component.html',
  styleUrls: ['./ray-trace-graph.component.scss']
})
export class RayTraceGraphComponent {
  @ViewChild('rotativeBar')
  public rotativeBar: ElementRef;

  @ViewChild('bubble')
  public bubble: ElementRef;

  @ViewChild('bullet')
  public bullet: ElementRef;
  @ViewChild('bullet2')
  public bullet2: ElementRef;

  private _barStartCoord: Coord | undefined;
  private _barEndCoord: Coord | undefined;
  private _rotation = 0;
  private _width = 0;
  public hidden = true;

  constructor(bullet: ElementRef, bullet2: ElementRef, bubble: ElementRef, rotativeBar: ElementRef) {
    this.bullet = bullet;
    this.bullet2 = bullet2;
    this.bubble = bubble;
    this.rotativeBar = rotativeBar;
  }

  get rotativeBarStyle(): string {
    return `transform: rotate(${this._rotation}deg); width: ${this._width}px;`;
  }

  get barStartCoord(): Coord {
    if (!this._barStartCoord) {
      if (this.rotativeBar) {
        const rotativeBar = this.rotativeBar.nativeElement.getBoundingClientRect();
        this._barStartCoord = new Coord(rotativeBar.x, rotativeBar.y);
      } else {
        return new Coord(0, 0);
      }
    }
    return this._barStartCoord;
  }

  public onMouseEnter(event: MouseEvent): void {
    this._barEndCoord = RayTraceUtils.calculateLeftMidPoint((event.target as HTMLElement));
    this.calculateWidthAndRotationDegrees(this.barStartCoord, this._barEndCoord);
  }

  public onMouseLeave(): void {
    this.hidden = true;
    this._barEndCoord = undefined;
    this.calculateWidthAndRotationDegrees(this.barStartCoord, this._barEndCoord);
  }

  private calculateWidthAndRotationDegrees(vStartCoord: Coord, vEndCoord?: Coord): void {
    if (!vStartCoord || !vEndCoord) {
      this._width = 0;
      return;
    }
    console.log(`vCoords [(${vStartCoord.xPos}, ${vStartCoord.yPos}); (${vEndCoord.xPos}, ${vEndCoord.yPos})] `);
    const dY = vEndCoord.yPos - vStartCoord.yPos;
    const dX = vEndCoord.xPos - vStartCoord.xPos;
    this.bullet.nativeElement.style.transform = RayTraceUtils.calculateTransformForBulletToCoord(vStartCoord);
    this.bullet2.nativeElement.style.transform = RayTraceUtils.calculateTransformForBulletToCoord(vEndCoord);
    this._rotation = RayTraceUtils.calculateAngleDegreesForVector(dX, dY);
    console.log(`rotation -> ${this._rotation}`);
    // 0.05 = lineStartOffset(30%) - bubbleRadius(25%)
    const bubbleSizeDiff = vEndCoord.xPos * 0.05;
    this._width = Math.abs(RayTraceUtils.calculateVectorWidth(Math.abs(dX), dY, this.bubble.nativeElement.offsetWidth)) - bubbleSizeDiff;
    console.log(`width -> ${this._width}`);
  }
}
