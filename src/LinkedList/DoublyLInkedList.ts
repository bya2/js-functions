interface NodeInterface<D> {
  data: D;
  prev: NodeInterface<D> | null;
  next: NodeInterface<D> | null;
}

export class Node<D = any> implements NodeInterface<D> {
  data;
  prev;
  next;

  constructor(data: D, prev?: NodeInterface<D>, next?: NodeInterface<D>) {
    this.data = data;
    this.prev = prev || null;
    this.next = next || null;
  }
}

const IndenOutOfBoundsEnception = "";
// const NoSuchElementEnception = "";

const isEqual = (a: any, b: any): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

interface DoublyLinkedListInterface<E> {}

export default class DoublyLinkedList<E = any> implements DoublyLinkedListInterface<E> {
  head: NodeInterface<E> | null = null;
  tail: NodeInterface<E> | null = null;
  size: number = 0;

  constructor(head?: NodeInterface<E>) {
    if (typeof head !== "undefined") {
      this.head = head;
      this.tail = head;
      this.size = 1;
    }
  }

  /**
   * 인덱스에 대응하는 위치의 노드를 반환
   * @param index
   */
  search(index: number): Node<E> {
    if (index < 0 || index >= this.size) throw new Error(IndenOutOfBoundsEnception);

    let node = this.head!;
    for (let i = 0; i < index; ++i) node = node.next!;
    return node;
  }

  /**
   * Head에 노드 추가
   * @param data
   */
  addFirst(data: E): void {
    const node = new Node<E>(data);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head!.prev = node;
      this.head = node;
    }
    this.size++;
  }

  /**
   * Tail에 노드 추가
   * @param data
   */
  addLast(data: E): void {
    const node = new Node<E>(data);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }
    this.size++;
  }

  /**
   * 인덱스에 대응하는 위치에 노드 추가
   * @param index
   * @param data
   * @returns
   */
  add(index: number, data: E): void {
    if (index < 0 || index > this.size) throw new Error(IndenOutOfBoundsEnception);

    if (index === 0) {
      this.addFirst(data);
      return;
    }

    if (index === this.size) {
      this.addLast(data);
      return;
    }

    const prev = this.search(index - 1);
    const next = prev.next;
    const curr = new Node<E>(data);

    prev.next = null;
    prev.next = curr;
    curr.next = next;

    this.size++;
  }

  /**
   * 리스트의 Head을 추출하고 반환
   */
  pollFirst(): E | null {
    if (this.size === 0) return null;

    const data = this.head!.data;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = null;
    }

    this.size--;

    return data;
  }

  /**
   * 리스트의 Tail을 추출하고 반환
   */
  pollLast(): E | null {
    if (this.size === 0) return null;

    const data = this.tail!.data;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    }

    return data;
  }

  /**
   * 인덱스에 대응하는 위치의 노드를 추출해서 반환. 없으면 null을 반환
   * @param index
   * @returns
   */
  pollAt(index: number): E | null {
    if (index < 0 || index >= this.size) throw new Error(IndenOutOfBoundsEnception);

    if (index === 0) {
      return this.pollFirst();
    }

    if (index === this.size - 1) {
      return this.pollLast();
    }

    const prev = this.search(index - 1);
    const curr = prev.next!;
    const data = curr.data;
    const next = curr.next;

    prev.next = null;
    prev.next = next;
    curr.next = null;
    this.size--;

    return data;
  }

  findBy(data: E) {}

  /**
   * 데이터에 해당하는 노드 중
   * @param data
   */
  removeBy(data: E) {
    if (this.size === 0) return;

    const curr = this.head;

    if (curr === null) {
      return;
    }

    if (curr.data === data) {
      //
    }
  }

  get(index: number): E {
    return this.search(index).data;
  }

  set(index: number, data: E): void {
    const node = this.search(index);
    node.data = data;
  }

  indexOf(data: E): number {
    for (let node = this.head, index = 0; node !== null; node = node.next, ++index) {
      if (isEqual(data, node.data)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * 데이터를 포함하는 노드의 존재 여부를 반환
   * @param data
   */
  contain(data: E): boolean {
    return this.indexOf(data) >= 0;
  }

  /**
   * 리스트의 크기가 0인지 여부를 반환
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * 리스트의 모든 노드 제거
   */
  clear(): void {
    for (let node = this.head; node !== null; ) {
      const nextNode = node.next;
      // node.data = null; // garbage
      node.next = null;
      node = nextNode;
    }
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * 리스트 깊은 복사
   * @returns new DoublyLinkedList
   */
  clone() {
    const clone = new DoublyLinkedList<E>();
    for (let node = this.head; node !== null; node = node.next) clone.addLast(node.data);
    return clone;
  }

  /**
   * 배열로 전환
   * @returns Array
   */
  toArray() {
    const arr = [];
    for (let [i, node] = [0, this.head]; node !== null; ++i, node = node.next) arr[i] = node.data;
    return arr;
  }

  /**
   * 정렬
   * @param comparator 비교 함수
   */
  sort(comparator: (a: E, b: E) => number): void {
    const arr = this.toArray();
    arr.sort(comparator);
    for (let [i, node] = [0, this.head]; node !== null; ++i) {
      node.data = arr[i];
    }
  }
}
