const MSG__INVALID_LENGTH = "";

class Node<T> {
  element: T;
  next?: Node<T>;

  constructor(x: T) {
    this.element = x;
  }
}

export default class SLL<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;

  constructor(item?: T) {
    if (item === undefined) {
      this.length = 0;
    } else {
      this.head = this.tail = new Node(item);
      this.length = 1;
    }
  }

  pushFront(item: T): this {
    const node = new Node(item);

    if (this.head) {
      node.next = this.head;
    } else {
      this.tail = node;
    }

    this.head = node;
    ++this.length;

    return this;
  }

  pushBack(item: T): this {
    const node = new Node(item);

    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }

    this.tail = node;
    ++this.length;

    return this;
  }

  popFront(): T | undefined {
    if (!this.head) {
      console.assert(this.length === 0, MSG__INVALID_LENGTH);
      return;
    }

    const node = this.head;

    this.head = node.next;
    if (!this.head) this.tail = undefined;

    node.next = undefined;
    --this.length;

    return node.element;
  }

  popBack(): T | undefined {
    const head = this.head;

    if (!head) {
      console.assert(this.length === 0, MSG__INVALID_LENGTH);
      return;
    }

    if (!head.next) {
      console.assert(this.length === 1, MSG__INVALID_LENGTH);
      const elt = head.element;
      this.head = this.tail = undefined;
      --this.length;
      return elt;
    }

    console.assert(this.length >= 2, MSG__INVALID_LENGTH);

    let prev = head;
    let curr = prev.next!;

    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    prev.next = undefined;
    this.tail = prev;

    --this.length;

    return curr.element;
  }

  clear(): void {
    let node = this.head;

    if (!node) {
      console.assert(this.length === 0);
      return;
    }

    while (node) {
      const next = node.next;
      node.next = undefined;
      node = next;
    }

    this.head = this.tail = undefined;
  }
}
