class Node<T> {
  _inner: T;
  prev?: NonNullable<Node<T>>;
  next?: NonNullable<Node<T>>;

  constructor(item: T) {
    this._inner = item;
  }
}

interface LinkedListStruct<T> {
  head?: NonNullable<Node<T>>;
  tail?: NonNullable<Node<T>>;
  get length(): number;
}

interface ImplLinkedList<T> {
  at(index: number): T | undefined;

  unshift(...items: T[]): void;

  shift(): T | undefined;

  push(item: T): void;

  pop(): T | undefined;

  insert(item: T, index: number): void;

  extract(index: number): T;

  find<S extends T>(predicate: (value: T, index: number, obj: LinkedList<T>) => value is S, thisArg?: any): T | undefined;
  // find(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): T | undefined;

  findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number;

  toArray(): T[];

  every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;

  some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;

  filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

  clone(): LinkedList<T>;
}

export default class LinkedList<T> implements LinkedListStruct<T>, ImplLinkedList<T> {
  head?: NonNullable<Node<T>>;
  tail?: NonNullable<Node<T>>;
  #len = 0;

  constructor(item?: T) {
    if (item) {
      this.tail = this.head = new Node(item);
      this.#len = 1;
      [].find;
    }
  }

  get length() {
    return this.#len;
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node._inner;
    }
  }

  #at(index: number): Node<T> | undefined {
    index = Math.max(Math.min(index, this.#len - 1), 0);

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

  at(index: number): T | undefined {
    index = Math.max(Math.min(index, this.#len - 1), 0);

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
    }

    this.#len += items.length;
  }

  shift(): T | undefined {
    if (!this.head) return;

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

  insert(item: T, index: number): void {
    // 인덱스 유효 여부
    // 해당 인덱스 전 노드의 next에 바인딩
    // 해당 인덱스 노드의 prev에 바인딩

    if (index >= this.#len) throw new Error();
    if (index < 0) index += this.#len;
    if (index === 0) this.unshift(item);

    const node = new Node(item);

    const curr = this.#at(index);

    this.#len++;
  }

  extract(index: number): T {
    throw new Error("Method not implemented.");
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
  every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  every(predicate: unknown, thisArg?: unknown): boolean {
    throw new Error("Method not implemented.");
  }
  some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
    throw new Error("Method not implemented.");
  }
  filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[] {
    throw new Error("Method not implemented.");
  }
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  reduce(callbackfn: unknown, initialValue?: unknown): T | U {
    throw new Error("Method not implemented.");
  }

  clone(): LinkedList<T> {
    const clone = new LinkedList<T>();
    for (let node = this.head; node; node = node.next) clone.push(node._inner);
    return clone;
  }
}
