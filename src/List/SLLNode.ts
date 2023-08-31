interface INode<T> {
  next(): Node<T> | null;
}

export class Node<T> implements INode<T> {
  _o: T;
  _next: Node<T> | null;

  constructor(o: T) {
    this._o = o;
    this._next = null;
  }

  get data() {
    return this._o;
  }

  next() {
    return this._next;
  }
}
