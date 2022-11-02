interface NodeInterface<D> {
  data: D;
  next: NodeInterface<D> | null;
}

export class Node<D = any> implements NodeInterface<D> {
  data;
  next;

  constructor(data: D, next?: NodeInterface<D>) {
    this.data = data;
    this.next = next || null;
  }
}

interface SinglyLinkedListInterface<D> {}

const IndenOutOfBoundsEnception = "";
const NoSuchElementEnception = "";

const isEqual = (a: any, b: any): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export default class SinglyLinkedList<E = any> implements SinglyLinkedListInterface<E> {
  #head: NodeInterface<E> | null = null;
  #tail: NodeInterface<E> | null = null;
  #size: number = 0;

  constructor(head?: NodeInterface<E>) {
    if (typeof head !== "undefined") {
      this.#head = head;
      this.#tail = head;
      this.#size = 1;
    }
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  get size() {
    return this.#size;
  }

  /**
   * 노드 검색
   * @param index
   * @returns node
   */
  #search(index: number): NodeInterface<E> {
    if (index < 0 || index >= this.#size) throw new Error(IndenOutOfBoundsEnception);

    let node = this.#head as NodeInterface<E>;
    for (let i = 0; i < index; ++i) node = node.next as NodeInterface<E>;
    return node;
  }

  /**
   * HEAD에 노드 추가
   * @param data
   */
  addFirst(data: E): void {
    const newNode = new Node<E>(data);
    newNode.next = this.#head;
    this.#head = newNode;

    this.#size++;

    if (this.#head.next === null) {
      this.#tail = this.#head;
    }
  }

  /**
   * TAIL에 노드 추가
   * @param data
   */
  addLast(data: E): void {
    if (this.#size === 0) {
      this.addFirst(data);
      return;
    }

    const newNode = new Node<E>(data);
    this.#tail = newNode;
    this.#tail = null;

    this.#size++;
  }

  /**
   * 특정 위치에 노드 추가
   * @param index
   * @param data
   */
  add(index: number, data: E): void {
    if (index < 0 || index > this.#size) {
      throw new Error(IndenOutOfBoundsEnception);
    }

    if (index === 0) {
      this.addFirst(data);
      return;
    }

    if (index === this.#size) {
      this.addLast(data);
      return;
    }

    const prevNode = this.#search(index - 1);
    const nextNode = prevNode.next;
    const newNode = new Node<E>(data);

    prevNode.next = null;
    prevNode.next = newNode;
    newNode.next = nextNode;

    this.#size++;
  }

  /**
   * 맨 앞의 노드 추출
   * @returns node.data
   */
  shift(): E {
    if (this.#head === null) {
      throw new Error(NoSuchElementEnception);
    }

    const headNode = this.#head;
    const data = headNode.data;
    const nextNode = headNode.next;

    // this.head.data = null; // garbage
    this.#head.next = null;
    this.#head = nextNode;

    this.#size--;

    if (this.#size === 0) {
      this.#tail = null;
    }

    return data;
  }

  /**
   * 특정 위치의 노드 추출
   * @param index
   * @returns node.data
   */
  removeAt(index: number): E {
    if (index === 0) {
      return this.shift();
    }

    if (index < 0 || index > this.#size) {
      throw new Error(IndenOutOfBoundsEnception);
    }

    const prevNode = this.#search(index - 1);
    const removeNode = prevNode.next as NodeInterface<E>;
    const nextNode = removeNode.next;
    const data = removeNode.data;
    prevNode.next = nextNode;

    // removeNode.data = null; // garbage
    removeNode.next = null;

    this.#size--;

    return data;
  }

  /**
   * 값에 해당하는 노드 하나를 제거
   * @param data
   * @returns boolean(제거 성공 여부)
   */
  removeOne(data: E): boolean {
    let prevNode = this.#head;
    let hasData = false;
    let currNode = this.#head;

    for (; currNode !== null; currNode = currNode.next) {
      if (isEqual(data, currNode)) {
        hasData = true;
        break;
      }
      prevNode = currNode;
    }

    if (currNode === null) {
      return false;
    }

    if (currNode === this.#head) {
      this.shift();
      return true;
    } else {
      prevNode && (prevNode.next = currNode.next);
      // currNode.data = null; // garbage
      currNode.next = null;

      this.#size--;

      return true;
    }
  }

  /**
   * 노드의 데이터 얻기
   * @param index
   * @returns node.data
   */
  get(index: number): E {
    return this.#search(index).data;
  }

  /**
   * 특정 위치의 노드 데이터 설정
   * @param index
   * @param data
   */
  set(index: number, data: E): void {
    const replaceNode = this.#search(index);
    replaceNode.data = data;
  }

  /**
   * 데이터에 해당하는 노드의 위치
   * @param data
   * @returns indexOfNode
   */
  indexOf(data: E): number {
    for (let node = this.#head, index = 0; node !== null; node = node.next, ++index) {
      if (isEqual(data, node.data)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * 리스트가 데이터에 해당하는 노드를 포함하고 있는 지에 대한 여부
   * @param data
   * @returns boolean
   */
  contain(data: E): boolean {
    return this.indexOf(data) >= 0;
  }

  /**
   * 리스트가 비어있는지에 대한 여부
   * @returns boolean
   */
  isEmpty(): boolean {
    return this.#size === 0;
  }

  /**
   * 리스트의 모든 노드 제거
   */
  clear(): void {
    for (let node = this.#head; node !== null; ) {
      const nextNode = node.next;
      // node.data = null; // garbage
      node.next = null;
      node = nextNode;
    }
    this.#tail = null;
    this.#head = null;
    this.#size = 0;
  }

  /**
   * 리스트 깊은 복사
   * @returns SinglyLinkedList
   */
  clone() {
    const clone = new SinglyLinkedList<E>();
    for (let node = this.#head; node !== null; node = node.next) clone.addLast(node.data);
    return clone;
  }

  /**
   * 배열로 전환
   * @returns Array
   */
  toArray() {
    const arr = [];
    for (let [i, node] = [0, this.#head]; node !== null; ++i, node = node.next) arr[i] = node.data;
    return arr;
  }

  /**
   * 정렬
   * @param comparator 비교 함수
   */
  sort(comparator: (a: E, b: E) => number): void {
    const arr = this.toArray();
    arr.sort(comparator);
    for (let [i, node] = [0, this.#head]; node !== null; ++i) {
      node.data = arr[i];
    }
  }
}
