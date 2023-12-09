import Hole from "./Hole";

interface ImplList<T> {
  pop(): T | undefined;
  push(item: T): void;
}

interface ImplBinaryHeap<T> extends ImplList<T> {
  compareFn(a: T, b: T): boolean;
  siftUp(start: number, pos: number): number;
  siftDownRange(pos: number, end: number): void;
  siftDown(pos: number): void;
  siftDownToBottom(pos: number): void;
}

export default class BinaryHeap<T> implements ImplBinaryHeap<T> {
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
    let item = this._inner.pop();

    if (this._inner.length && item !== undefined) {
      [item, this._inner[0]] = [this._inner[0], item];
      this.siftDownToBottom(0);
    }

    return item;
  }

  push(item: T): void {
    const oldLen = this._inner.length;
    this._inner.push(item);
    this.siftUp(0, oldLen);
  }

  compareFn: (a: T, b: T) => boolean;

  siftUp(start: number, pos: number): number {
    const hole = new Hole(this._inner, pos);

    while (hole.pos > start) {
      const parent = (hole.pos - 1) >> 1;
      if (this.compareFn(hole.element, hole.get(parent))) break;
      hole.moveTo(parent);
    }

    return hole.pos;
  }

  siftDownRange(pos: number, end: number) {
    const hole = new Hole(this._inner, pos);
    let child = 2 * hole.pos + 1;

    const eend = end - 2 || 0;

    while (child <= eend) {
      if (this.compareFn(hole.get(child + 1), hole.get(child))) child++;
      if (hole.element >= hole.get(child)) return;
      hole.moveTo(child);
      child = 2 * hole.pos + 1;
    }

    if (child === end - 1 && hole.element < hole.get(child)) {
      hole.moveTo(child);
    }
  }

  siftDown(pos: number) {
    this.siftDownRange(pos, this._inner.length);
  }

  siftDownToBottom(pos: number) {
    const end = this._inner.length;
    const start = pos;

    const hole = new Hole(this._inner, pos);
    let child = 2 * hole.pos + 1;

    const eend = end - 2 || 0;

    while (child <= eend) {
      if (this.compareFn(hole.get(child), hole.get(child + 1))) child++;
      hole.moveTo(child);
      child = 2 * hole.pos + 1;
    }

    if (child === end - 1) {
      hole.moveTo(child);
    }

    pos = hole.pos;

    this.siftUp(start, pos);
  }
}

// siftUp(start: number, pos: number) {
//   let i = this._inner.length - 1;
//   let parent = (i - 1) >> 1;

//   while (i > start && this.compareFn(this._inner[i], this._inner[parent])) {
//     this.swap(i, parent);
//     i = parent;
//     parent = (i - 1) >> 1;
//   }
// }

// siftDown() {
//   let i = 0;
//   let child = this.compareChildren(i);

//   while (child < this._inner.length && this.compareFn(this._inner[child], this._inner[i])) {
//     this.swap(i, child);
//     i = child;
//     child = this.compareChildren(i);
//   }
// }

// compareChildren(i: number): number {
//   const li = i * 2 + 1;
//   const ri = li + 1;
//   return ri in this._inner && this.compareFn(this._inner[ri], this._inner[li]) ? ri : li;
// }
