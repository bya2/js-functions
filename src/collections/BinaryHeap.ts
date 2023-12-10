import Hole from "./Hole";

interface ImplList<T> {
  pop(): T | undefined;
  push(item: T): void;
}

interface ImplBinaryHeap<T> extends ImplList<T> {
  compareFn(a: T, b: T): boolean;
  siftUp(start: number, pos: number): number;

  /**
   * 'pos'에 있는 요소를 가져와 힙 아래로 이동하고 그 자식은 더 크게 이동.
   * @param pos
   * @param end
   */
  siftDownRange(pos: number, end: number): void;

  /**
   * 호출자는 `pos < this._inner.length`을 보장해야 함.
   * @param pos
   */
  siftDown(pos: number): void;

  /**
   * 'pos'에 있는 요소를 가져와 힙 아래로 끝까지 이동한 다음 해당 위치까지 선별.
   * @param pos
   */
  siftDownToBottom(pos: number): void;

  /**
   * 데이터[0..start]가 여전히 적절한 힙이라고 가정하고 다시 빌드.
   * @param start
   */
  rebuildTail(start: number): void;
  rebuild(): void;
  concat(other: BinaryHeap<T>): this;
}

export default class BinaryHeap<T> implements ImplBinaryHeap<T> {
  _inner: T[];

  constructor(compareFn: (a: T, b: T) => boolean, initialData: T[] = []) {
    this.compareFn = compareFn;
    this._inner = initialData;

    if (initialData.length > 0) {
      this.rebuildTail(0);
    }
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

  rebuildTail(start: number) {
    if (start === this._inner.length) {
      return;
    }

    const tailLen = this._inner.length - start;

    const log2Fast = (x: number): number => {
      if (x === 0) return -Infinity;
      return (x >>> 0).toString(2).length - 1;
    };

    const betterToRebuild =
      start < tailLen
        ? true
        : this._inner.length <= 2048
        ? 2 * this._inner.length < tailLen * log2Fast(start)
        : 2 * this._inner.length < tailLen * 11;

    if (betterToRebuild) this.rebuild();
    else {
      for (let i = start; i < this._inner.length; ++i) {
        this.siftUp(0, i);
      }
    }
  }

  rebuild() {
    let n = this._inner.length >> 1;
    while (n > 0) {
      n--;
      this.siftDown(n);
    }
  }

  concat(other: BinaryHeap<T>) {
    const start = this._inner.length;
    this._inner.concat(other.data);
    this.rebuildTail(start);
    return this;
  }
}
