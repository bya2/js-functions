class Node<T> {
  _inner: T;
  prev?: Node<T>;
  next?: Node<T>;

  constructor(item: T) {
    this._inner = item;
  }

  get item(): T {
    return this._inner;
  }
}

interface ListStruct<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;
}

interface ImplList<T> {
  at(index: number): T;

  unshift(...items: T[]): void;

  shift(): T | undefined;

  push(item: T): void;

  pop(): T | undefined;

  insert(index: number, item: T): void;

  extract(index: number): T | undefined;

  find<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): S | undefined;
  find(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): T | undefined;

  findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number;

  every<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;

  some(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;

  filter(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): LinkedList<T>;

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, obj: this) => U, initialValue: U): U;

  clone(): LinkedList<T>;
  toArray(): T[];
}

export default class LinkedList<T> implements ListStruct<T>, ImplList<T> {
  head?: Node<T>;
  tail?: Node<T>;
  #len: number = 0;

  get length() {
    return this.#len;
  }

  set length(n: number) {
    let node = this.head;

    for (let i = 0; node && i < n; ++i) node = node.next;

    while (node) {
      const temp = node.next;
      node.next = undefined;
      node = temp;
      this.#len--;
    }
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node._inner;
    }
  }

  #validate(index: number) {
    if (index < 0 && index >= this.#len) throw new Error();
  }

  #normalize(index: number): number {
    if (index < 0) index += this.#len;
    this.#validate(index);
    return index;
  }

  #nodeAt(index: number): Node<T> {
    index = this.#normalize(index);

    let node: Node<T>;

    if (index <= this.#len / 2) {
      node = this.head!;
      for (let i = 0; i < index; ++i) node = node.next!;
    } else {
      node = this.tail!;
      for (let i = this.#len - 1; i > index; --i) node = node.prev!;
    }

    return node;
  }

  at(index: number): T {
    index = this.#normalize(index);

    let node: Node<T>;

    if (index <= this.#len / 2) {
      node = this.head!;
      for (let i = 0; i < index; ++i) node = node.next!;
    } else {
      node = this.tail!;
      for (let i = this.#len - 1; i > index; --i) node = node.prev!;
    }

    return node._inner;
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
    if (index === this.#len) return this.push(item);
    index = this.#normalize(index);
    if (index === 0) return this.unshift(item);

    const x = new Node(item);
    const nx = this.#nodeAt(index);

    // 인덱스에 해당되는 노드의 전 노드의 NEXT에 생성된 노드를 바인딩
    if (nx.prev) {
      const px = nx.prev;
      px.next = x;
      x.prev = px;
    }

    // 인덱스에 해당되는 노드의 PREV에 생성된 노드를 바인딩
    nx.prev = x;
    x.next = nx;

    this.#len++;
  }

  delete(node: Node<T>): void {
    const px = node.prev!;
    const nx = node.next!;

    px.next = nx;
    nx.prev = px;

    node.prev = undefined;
    node.next = undefined;

    this.#len--;
  }

  extract(index: number): T | undefined {
    index = this.#normalize(index);

    if (index === 0) return this.shift();
    if (index === this.#len - 1) return this.pop();

    const x = this.#nodeAt(index);
    this.delete(x);

    return x._inner;
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
  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
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

  filter(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): LinkedList<T> {
    const ins = new LinkedList<T>();

    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (predicate.call(thisArg, node._inner, i, ins)) {
        ins.push(node._inner);
      }
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

  clone(): LinkedList<T> {
    const clone = new LinkedList<T>();
    for (let node = this.head; node; node = node.next) clone.push(node._inner);
    return clone;
  }

  print() {
    const s = [];
    for (let node = this.head; node; node = node.next) s.push(node._inner);
    return `[ ${s.join(" <=> ")} ]`;
  }
}
