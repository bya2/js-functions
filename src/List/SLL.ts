const IndenOutOfBoundsEnception = "";

export class Node<T> {
  _inner: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this._inner = data;
  }

  get data() {
    return this._inner;
  }
}

export default class SLL<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  _capacity: number = 0;

  constructor(head?: Node<T>) {
    if (head) {
      this.head = head;
      this.tail = head;
      this._capacity = 1;
    }
  }

  get capacity() {
    return this._capacity;
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node._inner;
    }
  }

  _checkIndexOut(index: number): boolean {
    return index < 0 || index >= this._capacity;
  }

  get(index: number): Node<T> {
    if (this._checkIndexOut(index)) throw new Error(IndenOutOfBoundsEnception);

    let node = this.head!;
    for (let i = 0; i < index; ++i) node = node.next!;
    return node;
  }

  shift(data: T) {
    const tmp = new Node<T>(data);
    tmp.next = this.head;
    this.head = tmp;

    this._capacity++;

    if (this.head.next === null) {
      this.tail = this.head;
    }
  }

  push(data: T) {
    if (this._capacity === 0) {
      this.shift(data);
      return;
    }

    const tmp = new Node<T>(data);
    this.tail = tmp;
    this.tail.next = null;

    this._capacity++;
  }
}
