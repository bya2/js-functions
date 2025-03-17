class Node<T> {
  element: T;
  prev: Option<Node<T>> = None;
  next: Option<Node<T>> = None;

  constructor(data: T) {
    this.element = data;
  }
}

export default class ODLL<T> {
  head: Option<Node<T>> = None;
  tail: Option<Node<T>> = None;
  length: number = 0;

  *[Symbol.iterator]() {
    let $node = this.head;
    while ($node.isSome()) {
      const node = $node.unwrap();
      yield node.element;
      $node = node.next;
    }
  }

  front(): Option<T> {
    return this.head.map((node) => node.element);
  }

  back(): Option<T> {
    return this.tail.map((node) => node.element);
  }

  get(index: number): Option<T> {
    return this.at(index).map((node) => node.element);
  }

  set(index: number, item: T): this {
    this.at(index).inspect((node) => {
      node.element = item;
    });
    return this;
  }

  at(index: number): Option<Node<T>> {
    const len = this.length;
    const half = len / 2;
    const pos = index >= 0 ? index % len : (index % len) + len;

    if (pos <= half) {
      let $node = this.head;
      let i = -1;
      while (++i <= pos) $node = $node.unwrap().next;
      return $node;
    } else {
      let $node = this.tail;
      let i = len;
      while (--i > pos) $node = $node.unwrap().prev;
      return $node;
    }
  }

  unlink(node: Node<T>) {
    const $prev = node.prev;
    const $next = node.next;

    $prev.unwrap().next = $next;
    $next.unwrap().prev = $prev;

    node.prev = None;
    node.next = None;
  }

  pushFront(item: T) {
    const node = new Node(item);

    node.prev = None;
    node.next = this.head;

    const $node = Some(node);

    this.head.mapOrElse(
      () => {
        this.tail = $node;
      },
      (head) => {
        head.prev = $node;
      }
    );

    this.head = $node;
    this.length++;
  }

  pushBack(item: T) {
    const node = new Node(item);

    node.prev = this.tail;
    node.next = None;

    const $node = Some(node);

    this.tail.mapOrElse(
      () => {
        this.head = $node;
      },
      (tail) => {
        tail.next = $node;
      }
    );

    this.tail = $node;
    this.length++;
  }

  pushAt(index: number, item: T) {
    if (index === 0) return this.pushFront(item);
    if (index === this.length - 1) return this.pushBack(item);

    const $next = this.at(index);
    const $prev = $next.unwrap().prev;

    const node = new Node(item);

    node.prev = $prev;
    node.next = $next;

    const $node = Some(node);

    $prev.unwrap().next = $node;
    $next.unwrap().prev = $node;

    this.length++;
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

      this.length--;
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

      this.length--;
      return node;
    });
  }

  popBack(): Option<T> {
    return this.popBackNode().map((node) => node.element);
  }

  popNodeAt(index: number): Option<Node<T>> {
    return this.at(index).map((node) => {
      this.unlink(node);
      this.length--;
      return node;
    });
  }

  popAt(index: number): Option<T> {
    if (index === 0) return this.popFront();
    if (index === this.length - 1) return this.popBack();
    return this.popNodeAt(index).map((node) => node.element);
  }

  /**
   * `predicate`을 호출한 결과값이 'Truthy'인 노드의 내부 값를 반환합니다.
   * - O(1~n)
   * @param predicate
   */
  find(predicate: (value: T, index: number) => unknown): Option<T> {
    let i = 0;
    let $node = this.head;

    while ($node !== None) {
      const node = $node.unwrap();
      if (predicate(node.element, i)) break;
      i++;
      $node = node.next;
    }

    return $node.map((node) => node.element);
  }

  /**
   * `predicate`을 호출한 결과값이 'Truthy'인 노드의 위치를 반환합니다.
   * - O(1~n)
   * @param predicate
   * @returns
   */
  findIndex(predicate: (value: T, index: number) => unknown): number {
    let i = 0;
    let $node = this.head;

    while ($node.isSome()) {
      const node = $node.unwrap();
      if (predicate(node.element, i)) return i;
      i++;
      $node = node.next;
    }
    return -1;
  }

  /**
   * `predicate`을 호출한 결과값이 'Falsy'인 노드를 제거하고, `this`를 반환합니다.
   * @param predicate
   */
  filter(predicate: (value: T, index: number) => unknown): this {
    let i = 0;
    let option = this.head;

    while (option !== None) {
      const node = option.unwrap();
      predicate(node.element, i) || this.unlink(node);
      i++;
    }

    return this;
  }

  /**
   * `Array.prototype.every`와 유사한 기능을 합니다.
   * - O(n)
   * @param predicate
   */
  every(predicate: (value: T, index: number) => unknown): boolean {
    let i = 0;
    let $node = this.head;

    while ($node.isSome()) {
      const node = $node.unwrap();
      if (!predicate(node.element, i)) return false;
      i++;
      $node = node.next;
    }

    return true;
    // let option = this.head;
    // let i = 0;
    // while (option.isSome()) {}
    // return this.head;
  }

  map<U>(op: (value: T, index: number) => U): ODLL<U> {
    const list = new ODLL<U>();
    let $node = this.head;
    let i = 0;
    while ($node.isSome()) {
      const node = $node.unwrap();
      list.pushBack(op(node.element, i));
      $node = node.next;
      i++;
    }
    return list;
  }

  /**
   * @returns [`Array`]
   */
  toArray(): T[] {
    return [...this];
  }

  print() {}
}
