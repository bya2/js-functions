

class Node<T> {
  _inner: T;
  prev: Node<T> | null = null;
  next: Node<T> | null = null;

  constructor(data: T) {
    this._inner = data;
  }

  get data(): T {
    return this._inner;
  }
}

export default class DLL<T> implements List {
  _head: Node<T> | null = null;
  _tail: Node<T> | null = null;
  _length: number = 0;

  constructor(headData?: T) {
    if (headData) {
      const node = new Node(headData);
      this._head = node;
      this._tail = node;
      this._length = 1;
    }
  }

  get head() {
    return this._head?._inner;
  }

  get tail() {
    return this._tail?._inner;
  }

  get length() {
    return this._length;
  }

  *[Symbol.iterator]() {
    for (let node = this._head; node; node = node.next) {
      yield node._inner;
    }
  }

  at(index: number): T | undefined {
    index = index >= 0 ? index : this._length + index;

    if (index < 0 || index >= this._length) return undefined;

    let node: Node<T>;
    if (index <= this._length / 2) {
      node = this._head!;
      for (let i = 0; i < index; ++i) node = node.next!;
    } else {
      node = this._tail!;
      for (let i = this.length - 1; i > index; --i) node = node.prev!;
    }

    return node._inner;
  }

  find<S extends T>(predicate: (value: T, index: number) => value is S): S | undefined {
    for (let node = this._head, i = 0; node; node = node.next, ++i) {
      if (predicate(node._inner, i)) {
        return node._inner;
      }
    }
    return undefined;
  }

  unshift(item: T) {
    const node = new Node(item);
  }
}
