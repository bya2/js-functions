export interface NodeInterface {}

export class SinglyLinkedListNode<T = any> implements NodeInterface {
  _data: T;
  next: SinglyLinkedListNode<T> | null;

  constructor(data: T) {
    this._data = data;
    this.next = null;
  }

  get data(): T {
    return this._data;
  }
}

export class DoublyLinkedListNode<T = any> implements NodeInterface {
  _data: T;
  prev: DoublyLinkedListNode<T> | null;
  next: DoublyLinkedListNode<T> | null;

  constructor(data: T) {
    this._data = data;
    this.prev = null;
    this.next = null;
  }

  get data(): T {
    return this._data;
  }
}
