const WHEEL30 = [1, 7, 11, 13, 17, 19, 23, 29];

export default class Wheel30 {
  base: number;
  ix: number;

  constructor(base: number, ix: number) {
    this.base = base;
    this.ix = ix;
  }

  next(): number {
    const value = this.base + WHEEL30[this.ix]!;
    if (++this.ix >= 8) {
      this.ix = 0;
      this.base += 30;
    }
    return value;
  }
}
