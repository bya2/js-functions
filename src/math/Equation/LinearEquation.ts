import IEquation from "./IEquation";

export class LinearEquation implements IEquation {
  m: number;
  b: number;

  /**
   * 일차방정식
   * @param m 기울기
   * @param b 상수항
   */
  constructor(m: number, b: number) {
    if (m === 0 && b === 0) {
      throw new Error("부정 방정식: 모든 수를 해로 가집니다.");
    }

    if (m === 0) {
      throw new Error("불능 방정식: 어떤 해도 가지지 않습니다.");
    }

    this.m = m;
    this.b = b;
  }

  x(y: number): number {
    return (y - this.b) / this.m;
  }

  y(x: number): number {
    return this.m * x + this.b;
  }
}
