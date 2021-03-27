import {Coord} from '../models/coord';

export class RayTraceUtils {

  public static calculateTransformForBulletToCoord(coord: Coord) {
    return `translate(${coord.xPos}px, ${coord.yPos}px)`;
  }

  public static calculateVectorWidth(dX: number, dY: number, offsetWidth: number): number {
    return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)) - offsetWidth / 2;
  }

  public static calculateAngleDegreesForVector(dX: number, dY: number): number {
    const radiansAngle = dX === 0 ? 1 : Math.atan(dY / dX);
    return radiansAngle * (180 / Math.PI);
  }

  public static calculateLeftMidPoint(elem: HTMLElement): Coord {
    const absPosRectangle = elem.getBoundingClientRect();
    const xPos = absPosRectangle.x;
    const yPos = absPosRectangle.y;
    const height = elem.offsetHeight;
    return new Coord(xPos, yPos + height / 2);
  }
}
