export class Node<T> {
  _o: T;
  _next: Node<T> | null = null;

  constructor(data: T) {
    this._o = data;
  }

  get data() {
    return this._o;
  }

  get next(): Node<T> | null {
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
}
