const IndenOutOfBoundsEnception = "";

export class Node<T> {
  _o: T;
  _next: Node<T> | null = null;

  constructor(data: T) {
    this._o = data;
  }

  get data() {
    return this._o;
  }

  next(): Node<T> | null {
    return this._next || null;
  }
}

export default class SLL<DT> {
  _head: Node<DT> | null = null;
  _tail: Node<DT> | null = null;
  _capacity: number = 0;

  constructor(head?: Node<DT>) {
    if (head) {
      this._head = head;
      this._tail = head;
      this._capacity = 1;
    }
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }

  get capacity() {
    return this._capacity;
  }

  *[Symbol.iterator]() {
    let curr = this._head;
    while (curr) {
      yield curr._o;
      curr = curr._next;
    }
  }

  _checkIndexOut(index: number): boolean {
    return index < 0 || index >= this._capacity;
  }

  get(index: number): Node<DT> {
    if (this._checkIndexOut(index)) throw new Error(IndenOutOfBoundsEnception);

    let node = this._head!;
    for (let i = 0; i < index; ++i) node = node._next!;
    return node;
  }

  shift(data: DT) {
    const tmp = new Node<DT>(data);
    tmp._next = this._head;
    this._head = tmp;

    this._capacity++;

    if (this._head._next === null) {
      this._tail = this._head;
    }
  }

  push(data: DT) {
    if (this._capacity === 0) {
      this.shift(data);
      return;
    }

    const tmp = new Node<DT>(data);
    this._tail = tmp;
    this._tail._next = null;

    this._capacity++;
  }
}
