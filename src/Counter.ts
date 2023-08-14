// Number에서 계산 가져오기

export default class Counter {
  _count: number;

  constructor(initialValue: number = 0) {
    this._count = initialValue;
  }

  get count() {
    return this._count;
  }

  increase() {
    this._count++;
  }

  decrease() {
    this._count--;
  }
}
