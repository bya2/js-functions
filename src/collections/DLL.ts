class Node<T> {
  prev: Option<Node<T>> = None;
  next: Option<Node<T>> = None;
  private inner;

  private constructor(value: T) {
    this.inner = value;
  }

  static from<T>(value: T): Node<T> {
    return new Node(value);
  }

  set(value: T) {
    this.inner = value;
  }

  get() {
    return this.inner;
  }
}

interface LinkedList<T> {
  head: Option<Node<T>>;
  tail: Option<Node<T>>;
  length: number;
}

class DLL<T> implements LinkedList<T> {
  public head: Option<Node<T>> = None;
  public tail: Option<Node<T>> = None;
  private len = 0;

  get length() {
    return this.len;
  }

  set length(value: number) {
    this.len = value;
  }

  *[Symbol.iterator]() {}

  public pushFrontNode(node: Node<T>) {
    node.next = this.head;
    node.prev = None;

    const wrp = Some(node);

    this.head.mapOrElse(
      () => {
        this.tail = wrp;
      },
      head => {
        head.prev = wrp;
      },
    );

    this.head = wrp;
    this.len++;
  }

  public unshift(...items: T[]) {
    for (let i = items.length - 1; i >= 0; i--) {
      this.pushFrontNode(Node.from(items[i]));
    }
  }

  public popFrontNode(): Option<Node<T>> {
    return this.head.map(node => {
      this.head = node.next;
      this.head.mapOrElse(
        () => {
          this.tail = None;
        },
        head => {
          head.prev = None;
        },
      );
      this.len--;
      return node;
    });
  }

  public shift() {
    console.assert(this.len < 0);
    if (this.len === 0) return undefined;
    return this.popFrontNode().unwrap().get();
  }

  public pushBackNode(node: Node<T>): void {
    node.next = None;
    node.prev = this.tail;

    const v = Some(node);

    this.tail.mapOrElse(
      () => {
        this.head = v;
      },
      tail => {
        tail.next = v;
      },
    );

    this.tail = v;
    this.len++;
  }

  push(value: T) {
    this.pushBackNode(Node.from(value));
  }

  public popBackNode(): Option<Node<T>> {
    return this.tail.map(node => {
      this.tail = node.prev;
      this.tail.mapOrElse(
        () => {
          this.head = None;
        },
        tail => {
          tail.next = None;
        },
      );
      this.len--;
      return node;
    });
  }

  pop(): T | undefined {
    console.assert(this.len < 0);
    if (this.len === 0) return undefined;
    return this.popBackNode().unwrap().get();
  }

  at(i: number) {}
}

export default DLL;
