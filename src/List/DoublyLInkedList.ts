class Node<D = any> {
  data;
  prev: Node<D> | null;
  next: Node<D> | null;

  constructor(data: D, prev?: Node<D>, next?: Node<D>) {
    this.data = data;
    this.prev = prev || null;
    this.next = next || null;
  }
}

interface DoublyLinkedListInterface<E> {
  get(index: number): E;
  set(index: number, data: E): void;
  isEmpty(): boolean;
  contain(data: E): boolean;
  search(data: E): Node<E> | null;
  searchIndexOf(data: E): number;
  searchBy(index: number): Node<E> | null;
  unshift(data: E): void;
  push(data: E): void;
  insert(data: E, index: number): boolean;
  shift(): E | null;
  pop(): E | null;
  popAt(index: number): E | null;
  filter(callback: Function): DoublyLinkedList<E>;
  clear(): void;
  copy(): DoublyLinkedList<E>;
  sort(comparator?: (a: E, b: E) => number): void;
}

class DoublyLinkedList<E = any> implements DoublyLinkedListInterface<E> {
  head: Node<E> | null = null;
  tail: Node<E> | null = null;
  length: number = 0;

  constructor(head?: Node<E>) {
    if (typeof head !== "undefined") {
      this.head = head;
      this.tail = head;
      this.length = 1;
    }
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  get(index: number): E {
    return this.searchBy(index)!.data;
  }

  set(index: number, data: E): void {
    this.searchBy(index)!.data = data;
  }
  /**
   * 리스트의 크기가 0인지 여부를 반환
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * 데이터를 포함하는 노드의 존재 여부를 반환
   * @param data
   */
  contain(data: E): boolean {
    return this.searchIndexOf(data) >= 0;
  }

  /**
   * 데이터에 해당하는 노드를 반환
   * @param data
   */
  search(data: E): Node<E> | null {
    for (let current = this.head; current !== null; current = current.next) {
      if (current.data === data) {
        return current;
      }
    }
    return null;
  }

  /**
   * 데이터에 해당하는 노드의 인덱스를 반환
   * @param data
   */
  searchIndexOf(data: E): number {
    for (let current = this.head, index = 0; current !== null; current = current.next, ++index) {
      if (current.data === data) {
        return index;
      }
    }
    return -1;
  }

  /**
   * 인덱스에 대응하는 위치의 노드를 반환
   * @param index
   */
  searchBy(index: number): Node<E> | null {
    if (index < 0 || index >= this.length) return null;

    let current: Node<E>;
    if (index <= this.length / 2) {
      current = this.head!;
      for (let i = 0; i < index; ++i) {
        current = current.next!;
      }
    } else {
      current = this.tail!;
      for (let i = this.length - 1; i > index; --i) {
        current = current.prev!;
      }
    }

    return current;
  }

  /**
   * Head에 노드 추가
   * @param data
   */
  unshift(data: E): void {
    const node = new Node<E>(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }

  /**
   * Tail에 노드 추가
   * @param data
   */
  push(data: E): void {
    const node = new Node<E>(data);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }
    this.length++;
  }

  /**
   * 인덱스에 대응하는 위치에 노드 추가
   * @param index
   * @param data
   * @returns isSuccess
   */
  insert(data: E, index: number = this.length): boolean {
    if (index < 0 || index > this.length) return false;

    if (index === 0) {
      this.unshift(data);
      return true;
    }

    if (index === this.length) {
      this.push(data);
      return true;
    }

    const newNode = new Node(data);
    const prevNode = this.searchBy(index - 1)!;
    const nextNode = prevNode.next!;
    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    nextNode.prev = newNode;
    this.length++;

    return true;
  }

  /**
   * 리스트의 Head을 추출하고 반환
   */
  shift(): E | null {
    if (this.length === 0) return null;

    const data = this.head!.data;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = null;
    }

    this.length--;

    return data;
  }

  /**
   * 리스트의 Tail을 추출하고 반환
   */
  pop(): E | null {
    if (this.head === null) return null;

    const node = this.tail!;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = node.prev;
      this.tail!.next = null;
    }
    this.length--;

    return node.data;
  }

  /**
   * 인덱스에 대응하는 위치의 노드를 추출해서 반환. 없으면 null을 반환
   * @param index
   */
  popAt(index: number): E | null {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const node = this.searchBy(index)!;
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    this.length--;

    return node.data;
  }

  /**
   * 콜백함수에 대해 필터링해서 반환
   * @param callback
   */
  filter(callback: Function): DoublyLinkedList<E> {
    let current = this.head!;
    let filteredList = new DoublyLinkedList();
    for (let i = 0; i < this.length; ++i) {
      if (callback(current.data, i, this)) {
        filteredList.push(current.data);
      }
      current = current.next!;
    }
    return filteredList;
  }

  /**
   * 모든 노드 제거
   * 나머지는 가비지 컬렉션
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * 리스트 깊은 복사
   * @returns new DoublyLinkedList
   */
  copy() {
    const copiedList = new DoublyLinkedList<E>();
    for (let node = this.head; node !== null; node = node.next) copiedList.push(node.data);
    return copiedList;
  }

  /**
   * 정렬
   * @param comparator 비교 함수
   */
  sort(comparator?: (a: E, b: E) => number): void {
    const values = [...this];
    values.sort(comparator);
    this.clear();
    for (const value of values) this.push(value);
  }
}

export default DoublyLinkedList;
