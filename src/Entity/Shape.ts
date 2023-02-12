export class Square {
  x: number;
  y: number;
  length: number;

  constructor(x: number, y: number, length: number) {
    this.x = x;
    this.y = y;
    this.length = length;
  }

  get area(): number {
    return this.length ** 2;
  }

  set area(a: number) {
    this.length = Math.sqrt(a);
  }

  get perimeter(): number {
    return this.length * 4;
  }

  contains(point: { x: number; y: number }): boolean {
    return (
      point.x >= this.x &&
      point.x < this.x + this.length &&
      point.y >= this.y &&
      point.y < this.y + this.length
    );
  }
}

export class Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }

  get area() {
    return this.w * this.h;
  }

  set area(a) {
    this.w = Math.sqrt((a * this.h) / this.w);
    this.h = a / this.w;
  }

  get perimeter() {
    return (this.w + this.h) * 2;
  }

  contains(point: { x: number; y: number }): boolean {
    return (
      point.x >= this.x &&
      point.x < this.x + this.w &&
      point.y >= this.y &&
      point.y < this.y + this.h
    );
  }
}

export class Circle {
  x: number;
  y: number;
  r: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  get diameter(): number {
    return this.r * 2;
  }

  set diameter(diameter: number) {
    this.r = diameter / 2;
  }

  get area(): number {
    return Math.PI * this.r * this.r;
  }

  set area(a: number) {
    this.r = Math.sqrt(a / Math.PI);
  }

  get circumference(): number {
    return 2 * Math.PI * this.r;
  }
}
