import {
  MSG__INDEX_OUT,
  MSG__INVALID_LENGTH,
  MSG__INVALID_TYPE,
} from "@/misc/constants";
import { TOp, TPredicate } from "@/misc/types";
import { IDoublyLinkedNode, ILinkedList } from "./types";

class Node<T> implements IDoublyLinkedNode<T> {
  element: T;
  prev?: Node<T>;
  next?: Node<T>;

  constructor(x: T) {
    this.element = x;
  }

  link(prev?: Node<T>, next?: Node<T>) {
    if (prev) {
      this.prev = prev;
      prev.next = this;
    }

    if (next) {
      this.next = next;
      next.prev = this;
    }
  }

  unlink() {
    const prev = this.prev;
    const next = this.next;

    if (prev) {
      prev.next = next;
      this.prev = undefined;
    }

    if (next) {
      next.prev = prev;
      this.next = undefined;
    }
  }
}

export default class LinkedList<T> implements ILinkedList<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;

  constructor(item?: T) {
    if (typeof item === "undefined") {
      this.length = 0;
    } else {
      this.head = this.tail = new Node(item);
      this.length = 1;
    }
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node;
    }
  }

  //
  // 접근
  //

  front(): T | undefined {
    if (this.head) {
      console.assert(this.tail !== undefined && this.length >= 1);
      return this.head.element;
    }
  }

  back(): T | undefined {
    if (this.tail) {
      console.assert(this.head !== undefined && this.length >= 1);
      return this.tail.element;
    }
  }

  nodeAt(index: number): Node<T> | undefined {
    if (index < 0) {
      index += this.length;
    }

    if (index < 0 && index >= this.length) {
      console.assert(false, MSG__INDEX_OUT);
      return;
    }

    const mid = this.length >> 1;

    if (index <= mid) {
      let node = this.head;
      let i = -1;
      while (++i < mid) node = node!.next;
      return node;
    } else {
      let node = this.tail;
      let i = this.length;
      while (--i > mid) node = node!.prev;
      return node;
    }
  }

  at(index: number): T | undefined {
    const node = this.nodeAt(index);
    if (node) {
      return node.element;
    }
  }

  //
  // 추가
  //

  pushFront(item: T): number {
    const node = new Node(item);

    node.prev = undefined;
    node.next = this.head;

    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }

    return ++this.length;
  }

  pushBack(item: T): number {
    const node = new Node(item);

    node.prev = this.tail;
    node.next = undefined;

    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }

    this.tail = node;

    return ++this.length;
  }

  pushAt(index: number, item: T): number {
    if (index < 0) {
      index += this.length;
    }

    if (index < 0 && index >= this.length) {
      throw new Error(MSG__INDEX_OUT);
    }

    if (index === 0) {
      return this.pushFront(item);
    }

    if (index === this.length - 1) {
      return this.pushBack(item);
    }

    const node = new Node(item);
    const next = this.nodeAt(index)!;
    const prev = next.prev;

    node.link(prev, next);

    return ++this.length;
  }

  //
  // 추출
  //

  /**
   * 내부 노드 삭제
   * - 입력된 노드가 리스트에 연결되어 있는 지 판별 불가하므로, 생성자 내부적으로만 사용
   * @param node
   */
  #pop(node: Node<T>): T | undefined {
    node.unlink();
    --this.length;
    return node.element;
  }

  popFront(): T | undefined {
    const node = this.head;

    if (!node) {
      console.assert(this.length === 0, MSG__INVALID_LENGTH);
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
      console.assert(this.length === 0, MSG__INVALID_LENGTH);
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

  popAt(index: number): T | undefined {
    const node = this.nodeAt(index);

    if (node) {
      return this.#pop(node);
    }
  }

  //
  // 연결
  //

  concat(other: LinkedList<T>): LinkedList<T> {
    const sTail = this.tail!;
    const oHead = other.head!;

    sTail.next = oHead;
    oHead.prev = sTail;

    const lst = new LinkedList<T>();

    lst.head = this.head;
    lst.tail = other.tail;
    lst.length = this.length + other.length;

    this.head = this.tail = other.head = other.tail = undefined;
    this.length = other.length = 0;

    return lst;
  }

  //
  // 매핑
  //

  map<U>(op: TOp<T, U>): LinkedList<U> {
    const lst = new LinkedList<U>();

    let node = this.head;
    let i = -1;

    while (node) {
      lst.pushBack(op(node.element, ++i));
      node = node.next;
    }

    return lst;
  }

  //
  // 추론
  //

  filter(predicate: TPredicate<T>): LinkedList<T> {
    for (let node = this.head, i = -1; node; node = node.next) {
      if (!predicate(node.element, ++i)) {
        this.#pop(node);
      }
    }

    return this;
  }

  every(predicate: TPredicate<T>): boolean {
    for (let node = this.head, i = -1; node; node = node.next) {
      if (!predicate(node.element, ++i)) {
        return false;
      }
    }
    return true;
  }

  some(predicate: TPredicate<T>): boolean {
    for (let node = this.head, i = -1; node; node = node.next) {
      if (predicate(node.element, ++i)) {
        return true;
      }
    }
    return false;
  }

  find(predicate: TPredicate<T>): T | undefined {
    for (let node = this.head, i = -1; node; node = node.next) {
      if (predicate(node.element, ++i)) {
        return node.element;
      }
    }
  }

  findIndex(predicate: TPredicate<T>): number {
    for (let node = this.head, i = -1; node; node = node.next) {
      if (predicate(node.element, ++i)) {
        return i;
      }
    }
    return -1;
  }

  //
  // 초기화
  //

  clear() {
    let node = this.head;

    if (!node) {
      console.assert(
        this.head === undefined && this.tail === undefined,
        MSG__INVALID_TYPE
      );
      console.assert(this.length === 0, MSG__INVALID_LENGTH);
      return;
    }

    while (node) {
      const next = node.next;
      node.prev = node.next = undefined;
      node = next;
    }

    this.head = this.tail = undefined;
  }

  //
  // 변형
  //

  values(): T[] {
    const v: T[] = [];
    for (let node = this.head; node; node = node.next) v.push(node.element);
    return v;
  }

  //
  // 기록
  //
  log() {
    console.log();
  }
}
