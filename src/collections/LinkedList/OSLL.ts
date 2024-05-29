class Node<T> {
  element: T;
  next: Option<Node<T>> = None;

  constructor(x: T) {
    this.element = x;
  }
}

export default class OSLL<T> {
  head: Option<Node<T>>;
  tail: Option<Node<T>>;
  length: number;

  constructor(headItem?: T) {
    if (headItem == undefined) {
      this.head = this.tail = None;
      this.length = 0;
    } else {
      this.head = this.tail = Some(new Node(headItem));
      this.length = 1;
    }
  }

  pushFront(item: T): this {
    const node = new Node(item);

    node.next = this.head;

    const $node = Some(node);

    this.head.mapOrElse(
      () => {
        this.tail = $node;
      },
      (head) => {}
    );

    this.length++;

    return this;
  }
}
