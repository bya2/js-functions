interface NodeStruct<T> {
  item: T;
  prev?: Node<T>;
  next?: Node<T>;
}

interface ImplNode<T> {
  movesBy(n: number): Node<T> | undefined;
}

class Node<T> implements NodeStruct<T>, ImplNode<T> {
  _inner: T;
  prev?: Node<T>;
  next?: Node<T>;

  constructor(item: T) {
    this._inner = item;
  }

  set item(value: T) {
    this._inner = value;
  }

  get item(): T {
    return this._inner;
  }

  movesBy(n: number): Node<T> | undefined {
    if (n === 0) return this;

    if (n > 0) {
      let node = this.next;
      for (let i = 1; node && i < n; ++i) {
        node = node.next;
      }
      return node;
    } else {
      let node = this.prev;
      for (let i = n; node && i < -1; ++i) {
        node = node.prev;
      }
      return node;
    }
  }
}

interface ListStruct<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;
}

interface ImplList<T> {
  at(index: number): Node<T> | undefined;

  move(node: Node<T>, from: number, to: number): Node<T> | undefined;

  get(index: number): T | undefined;

  set(index: number, value: T): Node<T>;

  unshift(...items: T[]): void;

  shift(): T | undefined;

  push(item: T): void;

  pop(): T | undefined;

  insert(index: number, item: T): void;

  extract(index: number): T | undefined;

  slice(start?: number, end?: number): LinkedList<T>;

  find<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): S | undefined;
  find(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): T | undefined;

  findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number;

  every<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;

  some(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;

  fill(value: T, start?: number, end?: number): this;

  forEach(callbackfn: (value: T, index: number, obj: this) => void, thisArg?: any): void;

  filter(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): LinkedList<T>;

  map<U = any>(callbackfn: (value: T, index: number, obj: this) => U, thisArg?: any): LinkedList<U>;

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, obj: this) => U, initialValue: U): U;

  // sort(compareFn?: (a: T, b: T) => number): this;

  includes(searchElement: T, fromIndex?: number): boolean;

  indexOf(searchElement: T, fromIndex?: number): number;

  join(separator?: string): string;

  reverse(): LinkedList<T>;

  clone(): LinkedList<T>;

  toArray(): T[];

  print(): void;
}

export const indexUtil = {
  normalize: function (index: number, length: number): number {
    return index < 0 ? (index % length) + length : ((index + 1) % length) - 1;
  },

  validate: function (index: number, length: number): void {
    if (index < 0 || index >= length) {
      throw new Error();
    }
  },
};

export default class LinkedList<T> implements ListStruct<T>, ImplList<T> {
  head?: Node<T>;
  tail?: Node<T>;
  #len: number = 0;

  get length() {
    return this.#len;
  }

  set length(value: number) {
    let node = this.at(value) as Node<T> | undefined;

    while (node) {
      const tmp = node.next;
      node.next = undefined;
      node = tmp;
      this.#len--;
    }
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node._inner;
    }
  }

  at(index: number): Node<T> | undefined {
    index = indexUtil.normalize(index, this.#len);
    return index <= this.#len / 2 ? this.head!.movesBy(index)! : this.tail!.movesBy(index - this.#len + 1)!;
  }

  move(node: Node<T>, fromIndex: number, toIndex: number): Node<T> | undefined {
    fromIndex = indexUtil.normalize(fromIndex, this.#len);
    toIndex = indexUtil.normalize(toIndex, this.#len);

    return node.movesBy(toIndex - fromIndex);
  }

  get(index: number): T | undefined {
    index = indexUtil.normalize(index, this.#len);
    return this.at(index)?._inner;
  }

  set(index: number, value: T): Node<T> {
    index = indexUtil.normalize(index, this.#len);

    const node = this.at(index);
    if (!node) throw new Error();

    node._inner = value;

    return node;
  }

  unshift(...items: T[]): void {
    for (const item of items) {
      const node = new Node(item);
      if (this.head) {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      } else {
        this.tail = this.head = node;
      }
      this.#len++;
    }
  }

  shift(): T | undefined {
    if (!this.head) return undefined;

    const value = this.head._inner;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = undefined;
    } else {
      this.tail = this.head = undefined;
    }

    this.#len--;

    return value;
  }

  push(item: T): void {
    const node = new Node(item);

    if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      this.tail = this.head = node;
    }

    this.#len++;
  }

  pop(): T | undefined {
    if (!this.tail) return undefined;

    const value = this.tail._inner;

    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = undefined;
    } else {
      this.tail = this.head = undefined;
    }

    this.#len--;

    return value;
  }

  insert(index: number, item: T): void {
    index = indexUtil.normalize(index, this.#len);

    if (index === 0) return this.unshift(item);
    if (index === this.#len) return this.push(item);

    const newX = new Node(item);
    const nextX = this.at(index)!;

    // 인덱스에 해당되는 노드의 전 노드의 NEXT에 생성된 노드를 바인딩
    if (nextX.prev) {
      const prevX = nextX.prev;
      prevX.next = newX;
      newX.prev = prevX;
    }

    // 인덱스에 해당되는 노드의 PREV에 생성된 노드를 바인딩
    nextX.prev = newX;
    newX.next = nextX;

    this.#len++;
  }

  delete(node: Node<T>): void {
    node.prev && (node.prev.next = node.next);
    node.next && (node.next.prev = node.prev);

    node.prev = undefined;
    node.next = undefined;

    this.#len--;
  }

  extract(index: number): T | undefined {
    index = indexUtil.normalize(index, this.#len);

    if (index === 0) return this.shift();
    if (index === this.#len - 1) return this.pop();

    const node = this.at(index);

    if (!node) throw new Error();

    this.delete(node);

    return node._inner;
  }

  /**
   * 얕은 복사
   * @param start 
   * @param end 

  * @returns 
   */
  slice(start: number = 0, end: number = this.#len): LinkedList<T> {
    const newList = new LinkedList<T>();

    start = indexUtil.normalize(start, this.#len);
    end = indexUtil.normalize(end, this.#len);

    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }

    let node = this.at(start)!;
    newList.head = node;
    node = this.move(node, start, end)!;
    newList.tail = node;

    return newList;
  }

  find<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): S | undefined;
  find(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): T | undefined;
  find(predicate: unknown, thisArg?: unknown): T | undefined {
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if ((<(value: T, index: number, obj: this) => T | undefined>predicate).call(thisArg, node._inner, i, this)) {
        return node._inner;
      }
    }
    return undefined;
  }

  findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number {
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (predicate.call(thisArg, node._inner, i, this)) {
        return i;
      }
    }
    return -1;
  }

  toArray(): T[] {
    return [...this];
  }

  every<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;
  every(predicate: unknown, thisArg?: unknown): boolean {
    if (typeof predicate !== "function") throw new Error();

    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (!(<(value: T, index: number, obj: this) => boolean>predicate).call(thisArg, node._inner, i, this)) {
        return false;
      }
    }

    return true;
  }

  some(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean {
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (predicate.call(thisArg, node._inner, i, this)) {
        return true;
      }
    }

    return false;
  }

  fill(value: T, start?: number, end?: number): this {
    start ||= 0;
    end ||= this.length;

    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }

    let node: Node<T> | undefined = this.at(start);

    for (let i = start; node && i < end; node = node.next, ++i) {
      node._inner = value;
    }

    return this;
  }

  forEach(callbackfn: (value: T, index: number, obj: this) => void, thisArg?: any): void {
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      callbackfn.call(thisArg, node._inner, i, this);
    }
  }

  filter(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): LinkedList<T> {
    const ins = new LinkedList<T>();

    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (predicate.call(thisArg, node._inner, i, ins)) {
        ins.push(node._inner);
      }
    }

    return ins;
  }

  map<U>(callbackfn: (value: T, index: number, obj: this) => U, thisArg?: any): LinkedList<U> {
    const ins = new LinkedList<U>();
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      ins.push(callbackfn.call(thisArg, node._inner, i, this));
    }
    return ins;
  }

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, obj: this) => U, initialValue: U): U;
  reduce(callbackfn: unknown, initialValue?: any): T {
    if (typeof callbackfn !== "function") throw new Error();

    if (!this.head && initialValue === undefined) throw new Error();

    const head = this.head!;

    let accu = initialValue !== undefined ? initialValue : head;
    const sn = initialValue !== undefined ? head : head.next;
    const si = initialValue !== undefined ? 0 : 1;

    for (let node = sn, i = si; node; node = node.next, ++i) {
      accu = (<(previousValue: any, currentValue: T, currentIndex: number, obj: LinkedList<T>) => T>callbackfn)(accu, node._inner, i, this);
    }

    return accu;
  }

  includes(searchElement: T, fromIndex?: number): boolean {
    fromIndex ||= 0;

    let node = this.head;
    for (let i = 0; node && i < fromIndex; node = node.next) {}

    for (let i = fromIndex; node; node = node.next, ++i) {
      if (node._inner === searchElement) {
        return true;
      }
    }

    return false;
  }

  indexOf(searchElement: T, fromIndex?: number | undefined): number {
    fromIndex ||= 0;

    let node = this.head;
    for (let i = 0; node && i < fromIndex; node = node.next) {}

    for (let i = fromIndex; node; node = node.next, ++i) {
      if (node._inner === searchElement) {
        return i;
      }
    }

    return -1;
  }

  join(separator?: string | undefined): string {
    if (!this.head) return "";

    separator ||= ",";

    let s = "" + this.head._inner;

    for (let node = this.head.next; node; node = node.next) {
      s += separator + node._inner;
    }

    return s;
  }

  clone(): LinkedList<T> {
    const clone = new LinkedList<T>();
    for (let node = this.head; node; node = node.next) clone.push(node._inner);
    return clone;
  }

  reverse(): LinkedList<T> {
    const ins = new LinkedList<T>();

    for (let node = this.tail; node; node.prev) {
      ins.push(node._inner);
    }

    return ins;
  }

  print() {
    const s = [];
    for (let node = this.head; node; node = node.next) s.push(node._inner);
    return `[ ${s.join(" <=> ")} ]`;
  }
}
