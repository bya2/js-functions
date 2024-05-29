class Node<T> {
  element: T;
  prev?: Node<T>;
  next?: Node<T>;

  constructor(x: T) {
    this.element = x;
  }
}

export default class DLL<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;

  constructor(headItem?: T) {
    if (headItem === undefined) {
      this.length = 0;
    } else {
      this.head = this.tail = new Node(headItem);
      this.length = 1;
    }
  }

  front(): T | undefined {
    return this.head?.element;
  }

  back(): T | undefined {
    return this.tail?.element;
  }

  pushFront(item: T): this {
    const node = new Node(item);

    node.prev = undefined;
    node.next = this.head;

    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }

    this.head = node;
    ++this.length;

    return this;
  }

  pushBack(item: T): this {
    const node = new Node(item);

    node.prev = this.tail;
    node.next = undefined;

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
    const node = this.head;

    if (!node) {
      console.assert(this.length === 0);
      return;
    }

    this.head = node.next;

    if (this.head) {
      this.head.prev = undefined;
    } else {
      this.tail = undefined;
    }

    --this.length;

    return node.element;
  }

  popBack(): T | undefined {
    const node = this.tail;

    if (!node) {
      console.assert(this.length === 0);
      return;
    }

    this.tail = node.prev;

    if (this.tail) {
      this.tail.next = undefined;
    } else {
      this.tail = undefined;
    }

    --this.length;

    return node.element;
  }

  clear(): void {
    let node = this.head;

    if (!node) {
      console.assert(this.length === 0);
      return;
    }

    while (node) {
      const next = node.next;
      node.prev = node.next = undefined;
      node = next;
    }

    this.head = this.tail = undefined;
  }
}
