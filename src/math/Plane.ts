interface SPlaneCoordinate {
  x: number;
  y: number;
}

interface IPlaneCoordinate {
  moveTo(x: number, y: number): unknown;
  slope(other: SPlaneCoordinate): number;
}

export class PlaneCoord implements SPlaneCoordinate, IPlaneCoordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  slope(other: SPlaneCoordinate): number {
    return (other.y - this.y) / (other.x - this.x);
  }
}
