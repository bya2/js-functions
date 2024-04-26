interface ILinkedList<T> {
  front: Option<T>;
  back: Option<T>;
  popFrontNode(): Option<Node<T>>;
  popFront(): Option<T>;
  popBackNode(): Option<Node<T>>;
  popBack(): Option<T>;
  pushFront(item: T): void;
  pushBack(item: T): void;
  toArray(): T[];
}

class Node<T> {
  element: T;
  prev: Option<Node<T>> = None;
  next: Option<Node<T>> = None;

  constructor(data: T) {
    this.element = data;
  }

  isFront() {
    return this.prev.isNone();
  }

  isBack() {
    return this.next.isNone();
  }
}

export default class LinkedList<T> implements ILinkedList<T> {
  head: Option<Node<T>> = None;
  tail: Option<Node<T>> = None;
  len: number = 0;

  [Symbol.toPrimitive](hint: any) {
    if (hint === "string") {
    }
  }

  *[Symbol.iterator]() {
    let option = this.head;
    while (option.isSome()) {
      const node = option.unwrap();
      yield node.element;
      option = node.next;
    }
  }

  get front(): Option<T> {
    return this.head.map((node) => node.element);
  }

  get back(): Option<T> {
    return this.tail.map((node) => node.element);
  }

  popFrontNode(): Option<Node<T>> {
    return this.head.map((node) => {
      this.head = node.next;
      this.head.mapOrElse(
        () => {
          this.tail = None;
        },
        (head) => {
          head.prev = None;
        }
      );

      this.len--;
      return node;
    });
  }

  popFront(): Option<T> {
    return this.popFrontNode().map((node) => node.element);
  }

  popBackNode(): Option<Node<T>> {
    return this.tail.map((node) => {
      this.tail = node.prev;
      this.tail.mapOrElse(
        () => {
          this.head = None;
        },
        (tail) => {
          tail.next = None;
        }
      );

      this.len--;
      return node;
    });
  }

  popBack(): Option<T> {
    return this.popBackNode().map((node) => node.element);
  }

  pushFront(item: T) {
    const node = new Node(item);

    node.prev = None;
    node.next = this.head;

    const option = Some(node);

    this.head.mapOrElse(
      () => {
        this.tail = option;
      },
      (head) => {
        head.prev = option;
      }
    );

    this.head = option;
    this.len++;
  }

  pushBack(item: T) {
    const node = new Node(item);

    node.prev = this.tail;
    node.next = None;

    const option = Some(node);

    this.tail.mapOrElse(
      () => {
        this.head = option;
      },
      (tail) => {
        tail.next = option;
      }
    );

    this.tail = option;
    this.len++;
  }

  toArray(): T[] {
    return [...this];
  }
}
