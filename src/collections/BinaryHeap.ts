interface ImplList<T> {
  pop(): T;
  push(item: T): void;
}

interface ImplBinaryHeap<T> {
  siftUp(): void;
  siftDownRagne(): void;
  siftDown(): void;
}

Object.defineProperties(Array.prototype, {
  swap: {
    value(i: number, j: number) {
      const temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    },
  },
});

class BinaryHeap<T> implements ImplList<T>, ImplBinaryHeap<T> {
  _inner: T[];

  constructor(initialData: T[] = []) {
    this._inner = initialData;
  }

  get length() {
    return this._inner.length;
  }

  pop(): T {
    throw new Error("Method not implemented.");
  }

  push(item: T): void {
    const oldLen = this._inner.length;
    this._inner.push(item);
    try {
      this.siftUp();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  siftUp() {
    let i = this._inner.length - 1;
    let pi = (i - 1) >> 1;

    while (i > 0) {
      this._inner.swap(i, pi);
      i = pi;
      pi = (i - 1) >> 1;
    }
  }
  siftDownRagne(): void {
    throw new Error("Method not implemented.");
  }
  siftDown(): void {
    throw new Error("Method not implemented.");
  }
}
