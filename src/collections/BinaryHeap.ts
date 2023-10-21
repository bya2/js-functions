interface ImplList<T> {
  pop(): T | undefined;
  push(item: T): void;
}

interface ImplArr<T> {}

interface ImplBinaryHeap<T> extends ImplArr<T>, ImplList<T> {
  siftUp(): void;
  siftDown(): void;
  swap(i: number, j: number): void;
  compare(a: T, b: T): boolean;
  compareChildren(i: number): number;
}

class BinaryHeap<T> implements ImplBinaryHeap<T> {
  _inner: T[];

  constructor(compareFn: (a: T, b: T) => boolean, initialData: T[] = []) {
    this.compare = compareFn;
    this._inner = initialData;
  }

  get length() {
    return this._inner.length;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this._inner.length; ++i) {
      yield this._inner[i];
    }
  }

  pop(): T | undefined {
    if (this._inner.length <= 1) return this._inner.pop();
    const data = this._inner[0];
    this._inner[0] = this.pop()!;
    this.siftDown();
    return data;
  }

  push(item: T): void {
    this._inner.push(item);
    this.siftUp();
  }

  siftUp() {
    let i = this._inner.length - 1;
    let pi = (i - 1) >> 1;

    while (i > 0 && this.compare(this._inner[i], this._inner[pi])) {
      this.swap(i, pi);
      i = pi;
      pi = (i - 1) >> 1;
    }
  }

  siftDown() {
    let i = 0;
    let ci = this.compareChildren(i);

    while (ci < this._inner.length && this.compare(this._inner[ci], this._inner[i])) {
      this.swap(i, ci);
      i = ci;
      ci = this.compareChildren(i);
    }
  }

  swap(i: number, j: number) {
    [this._inner[i], this._inner[j]] = [this._inner[j], this._inner[i]];
  }

  compare: (a: T, b: T) => boolean;

  compareChildren(i: number): number {
    const li = i * 2 + 1;
    const ri = li + 1;
    return ri in this._inner && this.compare(this._inner[ri], this._inner[li]) ? ri : li;
  }
}

export default BinaryHeap;
