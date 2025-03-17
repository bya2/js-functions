import IEquation from "./IEquation";

export class QuadraticEquation {
  a: number;
  b: number;
  c: number;

  /**
   * 이차방정식
   * @param a 2차 계수
   * @param b 1차 계수
   * @param c 상수항
   */
  constructor(a: number, b: number, c: number) {
    if (a === 0) {
      throw new Error("");
    }

    this.a = a;
    this.b = b;
    this.c = c;
  }

  x(y: number): number[] {
    const a = this.a;
    const b = this.b;
    const c = this.c;

    const t = Math.sqrt(b * b - 4 * a * (c - y));

    const x1 = (-b + t) / (2 * a);
    const x2 = (-b - t) / (2 * a);

    return [x1, x2];
  }

  y(x: number): number {
    return this.a * x * x + this.b * x + this.c;
  }
}
