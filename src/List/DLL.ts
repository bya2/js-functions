class Node<T> {
  _inner: T;
  prev?: Node<T>;
  next?: Node<T>;

  constructor(data: T) {
    this._inner = data;
  }

  get data(): T {
    return this._inner;
  }
}

interface ListStruct<N> {
  head?: N;
  tail?: N;
  get length(): number;
}

interface ImplList<T> {
  unshift(item: T): void;
  shift(): T | undefined;
  push(item: T): void;
  pop(): T | undefined;
}

interface ImplLinkedList<T> {
  at(index: number): T | undefined;
  unshift(item: T): void;
  shift(): T | undefined;
  push(item: T): void;
  pop(): T | undefined;
  insert(data: T, index: number): boolean;
  popAt(index: number): T | undefined;
}

interface ImplClone {
  clone<CLS = any>(): ThisType<CLS>;
}

interface ImplPrint {
  print(): void;
}

export default class DLL<T> implements ListStruct<Node<T>>, ImplLinkedList<T> {
  head?: Node<T>;
  tail?: Node<T>;
  #len: number = 0;

  constructor(headData?: T) {
    if (headData) {
      const node = new Node(headData);
      this.head = node;
      this.tail = node;
      this.#len = 1;
    }
  }
  insert(data: T, index: number): boolean {
    throw new Error("Method not implemented.");
  }
  popAt(index: number): T | undefined {
    throw new Error("Method not implemented.");
  }

  get length() {
    return this.#len;
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node._inner;
    }
  }

  at(index: number): T | undefined {
    index = index >= 0 ? index : this.#len + index;

    if (index < 0 || index >= this.#len) return;

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

  find<S extends T>(predicate: (value: T, index: number) => value is S): S | undefined {
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (predicate(node._inner, i)) {
        return node._inner;
      }
    }
    return undefined;
  }

  findIndex<S extends T>(predicate: (value: T, index: number) => value is S): number {
    for (let node = this.head, i = 0; node; node = node.next, ++i) {
      if (predicate(node._inner, i)) {
        return i;
      }
    }
    return -1;
  }

  unshift(item: T) {
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

  shift(): T | undefined {
    if (!this.head) return undefined;

    const w = this.head._inner;

    if (this.#len === 1) {
      this.tail = this.head = undefined;
    } else {
      this.head = this.head.next!;
      this.head.prev = undefined;
    }

    this.#len--;

    return w;
  }

  push(item: T) {
    const node = new Node(item);

    if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = this.tail = node;
    }

    this.#len++;
  }

  pop(): T | undefined {
    if (!this.tail) return undefined;

    const w = this.tail._inner;

    if (this.#len === 1) {
      this.head = this.tail = undefined;
    } else {
      this.tail = this.tail.prev!;
      this.tail.next = undefined;
    }

    this.#len--;

    return w;
  }

  clear() {
    for (let node = this.head; node; ) {
      const tmp = node.next;
      node.next = undefined;
      node = tmp;
    }

    this.tail = this.head = undefined;
    this.#len = 0;
  }
}
