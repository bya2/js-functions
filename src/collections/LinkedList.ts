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
  get length(): number;
}

interface ImplList<T> {
  at(index: number): T;

  unshift(...items: T[]): void;
  shift(): T | undefined;
  push(item: T): void;
  pop(): T | undefined;
  insert(item: T, index: number): void;
  extract(index: number): T | undefined;

  find<S extends T>(predicate: (value: T, index: number, obj: LinkedList<T>) => value is S, thisArg?: any): T | undefined;
  // find(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): T | undefined;
  findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number;
  every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  clone(): LinkedList<T>;
  toArray(): T[];
}

export default class LinkedList<T> implements ListStruct<T>, ImplList<T> {
  head?: NonNullable<Node<T>>;
  tail?: NonNullable<Node<T>>;
  #len: number = 0;

  get length() {
    return this.#len;
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node._inner;
    }
  }

  #validateIndex(index: number) {
    if (index < 0 && index >= this.#len) throw new Error();
  }

  #normalizeIndex(index: number): number {
    if (index < 0) index += this.#len;
    this.#validateIndex(index);
    return index;
  }

  #nodeAt(index: number): Node<T> {
    index = this.#normalizeIndex(index);

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
    index = this.#normalizeIndex(index);

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
    if (!this.tail) return;

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

  /**
   * 1. 인덱스 유효성 검사, 정규화
   * 2-1. 지정 노드의 전 노드의 next에 생성 노드를 바인딩
   * 2-2. 지정 노드의 prev에 생성 노드를 바인딩
   * @param item
   * @param index
   */
  insert(item: T, index: number): void {
    if (index === this.#len) {
      return this.push(item);
    }

    index = this.#normalizeIndex(index);

    if (index === 0) {
      return this.unshift(item);
    }

    const x = new Node(item);

    const next = this.#nodeAt(index);

    // 인덱스에 해당되는 노드의 전 노드의 NEXT에 생성된 노드를 바인딩
    if (next.prev) {
      const prev = next.prev;
      prev.next = x;
      x.prev = prev;
    }

    // 인덱스에 해당되는 노드의 PREV에 생성된 노드를 바인딩
    next.prev = x;
    x.next = next;

    this.#len++;
  }

  extract(index: number): T | undefined {
    index = this.#normalizeIndex(index);

    if (index === 0) {
      return this.shift();
    }

    if (index === this.#len - 1) {
      return this.pop();
    }

    const x = this.#nodeAt(index);
    const prev = x.prev!;
    const next = x.next!;

    prev.next = x;
    next.prev = x;
    x.prev = prev;
    x.next = next;

    this.#len--;

    return x._inner;
  }

  // find(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): T | undefined;
  find<S extends T>(predicate: (value: T, index: number, obj: LinkedList<T>) => value is S, thisArg?: any): T | undefined {
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (predicate.call(thisArg, node._inner, i, this)) {
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
  // every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
  // every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  // every(predicate: unknown, thisArg?: unknown): boolean {
  //   throw new Error("Method not implemented.");
  // }
  // some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
  //   throw new Error("Method not implemented.");
  // }
  // filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[] {
  //   throw new Error("Method not implemented.");
  // }
  // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  // reduce(callbackfn: unknown, initialValue?: unknown): T | U {
  //   throw new Error("Method not implemented.");
  // }

  clone(): LinkedList<T> {
    const clone = new LinkedList<T>();
    for (let node = this.head; node; node = node.next) clone.push(node._inner);
    return clone;
  }
}
