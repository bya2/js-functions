import {
  MSG__INDEX_OUT,
  MSG__INVALID_LENGTH,
  MSG__INVALID_TYPE,
} from "@/misc/constants";
import { TOp, TPredicate } from "@/misc/types";

import { SLinkedNode, ILinkedList } from "./types";

class Node<T> implements SLinkedNode<T> {
  element: T;
  next?: Node<T>;

  constructor(x: T) {
    this.element = x;
  }
}

export default class SLL<T> implements ILinkedList<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;

  constructor(items: T[] = []) {
    if (!items.length) {
      this.length = 0;
      return;
    }

    if (items.length === 1) {
      this.head = this.tail = new Node(items[0]!);
      this.length = 1;
      return;
    }

    let node = new Node(items[0] as T);
    this.head = node;

    let i = 0;
    while (++i < items.length) {
      const next = new Node(items[i] as T);
      node.next = next;
      node = next;
    }

    this.tail = node;
    this.length = items.length;
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
    let node = this.head;
    let i = -1;
    while (node && ++i <= index) node = node.next;
    return node;
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

    if (this.head) {
      node.next = this.head;
    } else {
      this.tail = node;
    }

    this.head = node;

    return ++this.length;
  }

  pushBack(item: T): number {
    const node = new Node(item);

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
    const prev = this.nodeAt(index - 1)!;
    const next = prev.next;

    prev.next = node;
    node.next = next;

    return ++this.length;
  }

  //
  // 추출
  //

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

    console.assert(this.head !== undefined && this.tail !== undefined);
    console.assert(this.length >= 2, MSG__INVALID_LENGTH);

    const prev = this.nodeAt(this.length - 2)!;

    const v = prev.next!.element;

    prev.next = undefined;
    this.tail = prev;

    --this.length;

    return v;
  }

  popAt(index: number): T | undefined {
    if (index === 0) {
      return this.popFront();
    }

    if (index === this.length - 1) {
      return this.popBack();
    }

    const prev = this.nodeAt(index - 1)!;
    const node = prev.next!;

    prev.next = node.next;

    --this.length;

    return node.element;
  }

  //
  // 연결
  //

  concat(other: SLL<T>): SLL<T> {
    const lst = new SLL<T>();

    if (!this.tail) {
      console.assert(this.head === undefined);
      lst.head = other.head;
      lst.tail = other.tail;
    }

    if (!other.head) {
      lst.head = this.head;
      lst.tail = this.tail;
    }

    this.tail!.next = other.head!;

    lst.head = this.head ?? other.head;
    lst.tail = other.tail;

    // THIS OTHER
    this.head = this.tail = other.head = other.tail = undefined;
    this.length = other.length = 0;

    lst.length = this.length + other.length;

    return lst;
  }

  //
  // 매핑
  //

  map<U>(op: TOp<T, U>): SLL<U> {
    const lst = new SLL<U>();

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

  filter(predicate: TPredicate<T>): SLL<T> {
    let a = this.head;
    let b = this.head!.next;
    let i = -1;

    while (b) {
      if (!predicate(b.element, ++i)) {
        a!.next = undefined;
        --this.length;
      }

      a = b;
      b = b.next;
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
      node.next = undefined;
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
