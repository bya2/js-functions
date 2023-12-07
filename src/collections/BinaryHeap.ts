interface ImplList<T> {
  pop(): T | undefined;
  push(item: T): void;
}

interface ImplBinaryHeap<T> extends ImplList<T> {
  siftUp(): void;
  siftDown(): void;
  swap(i: number, j: number): void;
  compareFn(a: T, b: T): boolean;

  compareChildren(i: number): number;
}

class BinaryHeap<T> implements ImplBinaryHeap<T> {
  _inner: T[];

  constructor(compareFn: (a: T, b: T) => boolean, initialData: T[] = []) {
    this.compareFn = compareFn;
    this._inner = initialData;
  }

  get data() {
    return this._inner;
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
    this._inner[0] = this._inner.pop()!;
    this.siftDown();
    return data;
  }

  push(item: T): void {
    const oldLen = this._inner.length;
    this._inner.push(item);
    this.siftUp(0, oldLen);
  }

  siftUp(start: number, pos: number) {
    let i = this._inner.length - 1;
    let parent = (i - 1) >> 1;

    while (i > start && this.compareFn(this._inner[i], this._inner[parent])) {
      this.swap(i, parent);
      i = parent;
      parent = (i - 1) >> 1;
    }
  }

  siftDown() {
    let i = 0;
    let child = this.compareChildren(i);

    while (child < this._inner.length && this.compareFn(this._inner[child], this._inner[i])) {
      this.swap(i, child);
      i = child;
      child = this.compareChildren(i);
    }
  }

  swap(i: number, j: number) {
    [this._inner[i], this._inner[j]] = [this._inner[j], this._inner[i]];
  }

  compareFn: (a: T, b: T) => boolean;

  compareChildren(i: number): number {
    const li = i * 2 + 1;
    const ri = li + 1;
    return ri in this._inner && this.compareFn(this._inner[ri], this._inner[li]) ? ri : li;
  }
}

export default BinaryHeap;
