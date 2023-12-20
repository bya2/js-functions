interface NodeStruct<T> {
  item: T;
  next?: Node<T>;
}

interface ImplNode<T> {
  move(n: number): Node<T> | undefined;
}

class Node<T> implements NodeStruct<T>, ImplNode<T> {
  protected inner: T;
  next?: Node<T>;

  constructor(item: T) {
    this.inner = item;
  }

  get item() {
    return this.inner;
  }

  set item(value: T) {
    this.inner = value;
  }

  move(times: number): Node<T> | undefined {
    if (times < 0) throw new Error();
    if (times === 0) return this;

    let node = this.next;
    for (let i = 1; node && i <= times; ++i) {
      node = node.next;
    }
    return node;
  }
}

interface ListStruct<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;
}

interface ImplList<T> {
  at(index: number): Node<T> | undefined;

  move(node: Node<T>, from: number, to: number): Node<T> | undefined;

  get(index: number): T | undefined;

  set(index: number, value: T): Node<T>;

  addFront(node: Node<T>): void;

  unshift(...items: T[]): void;

  shift(): T | undefined;

  push(item: T): void;

  pop(): T | undefined;

  insert(index: number, item: T): void;

  extract(index: number): T | undefined;

  slice(start?: number, end?: number): LinkedList<T>;

  find<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): S | undefined;
  find(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): T | undefined;

  findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number;

  every<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;

  some(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;

  fill(value: T, start?: number, end?: number): this;

  forEach(callbackfn: (value: T, index: number, obj: this) => void, thisArg?: any): void;

  filter(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): LinkedList<T>;

  map<U = any>(callbackfn: (value: T, index: number, obj: this) => U, thisArg?: any): LinkedList<U>;

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, obj: this) => U, initialValue: U): U;

  // sort(compareFn?: (a: T, b: T) => number): this;

  includes(searchElement: T, fromIndex?: number): boolean;

  indexOf(searchElement: T, fromIndex?: number): number;

  join(separator?: string): string;

  reverse(): LinkedList<T>;

  clone(): LinkedList<T>;

  toArray(): T[];

  print(): void;
}

export const indexUtil = {
  normalize: function (index: number, length: number): number {
    return index < 0 ? (index % length) + length : ((index + 1) % length) - 1;
  },

  validate: function (index: number, length: number): void {
    if (index < 0 || index >= length) {
      throw new Error();
    }
  },
};

export default class SinglyLinkedList<T> implements ListStruct<T>, ImplList<T> {
  head?: Node<T> | undefined;
  tail?: Node<T> | undefined;
  protected len: number = 0;

  get length() {
    return this.len;
  }

  set length(value: number) {
    this.len = value;
  }

  *[Symbol.iterator]() {
    for (let node = this.head; node; node = node.next) {
      yield node.item;
    }
  }

  at(index: number): Node<T> | undefined {
    if (this.head) {
      index = indexUtil.normalize(index, this.len);
      return this.head.move(index);
    }
  }

  move(node: Node<T>, from: number, to: number): Node<T> | undefined {
    throw new Error("Method not implemented.");
  }
  get(index: number): T | undefined {
    throw new Error("Method not implemented.");
  }
  set(index: number, value: T): Node<T> {
    throw new Error("Method not implemented.");
  }
  addFront(node: Node<T>): void {
    throw new Error("Method not implemented.");
  }
  unshift(...items: T[]): void {
    throw new Error("Method not implemented.");
  }
  shift(): T | undefined {
    throw new Error("Method not implemented.");
  }
  push(item: T): void {
    throw new Error("Method not implemented.");
  }
  pop(): T | undefined {
    throw new Error("Method not implemented.");
  }
  insert(index: number, item: T): void {
    throw new Error("Method not implemented.");
  }
  extract(index: number): T | undefined {
    throw new Error("Method not implemented.");
  }
  slice(start?: number | undefined, end?: number | undefined) {
    throw new Error("Method not implemented.");
  }
  find<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): S | undefined;
  find(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): T | undefined;
  find(predicate: unknown, thisArg?: unknown): T | S | undefined {
    throw new Error("Method not implemented.");
  }
  findIndex(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any): number {
    throw new Error("Method not implemented.");
  }
  every<S extends T>(predicate: (value: T, index: number, obj: this) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean;
  every(predicate: unknown, thisArg?: unknown): boolean {
    throw new Error("Method not implemented.");
  }
  some(predicate: (value: T, index: number, obj: this) => unknown, thisArg?: any): boolean {
    throw new Error("Method not implemented.");
  }
  fill(value: T, start?: number | undefined, end?: number | undefined): this {
    throw new Error("Method not implemented.");
  }
  forEach(callbackfn: (value: T, index: number, obj: this) => void, thisArg?: any): void {
    throw new Error("Method not implemented.");
  }
  filter(predicate: (value: T, index: number, obj: LinkedList<T>) => unknown, thisArg?: any) {
    throw new Error("Method not implemented.");
  }
  map<U = any>(callbackfn: (value: T, index: number, obj: this) => U, thisArg?: any) {
    throw new Error("Method not implemented.");
  }
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T): T;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, obj: this) => T, initialValue: T): T;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, obj: this) => U, initialValue: U): U;
  reduce(callbackfn: unknown, initialValue?: unknown): T | U {
    throw new Error("Method not implemented.");
  }
  includes(searchElement: T, fromIndex?: number | undefined): boolean {
    throw new Error("Method not implemented.");
  }
  indexOf(searchElement: T, fromIndex?: number | undefined): number {
    throw new Error("Method not implemented.");
  }
  join(separator?: string | undefined): string {
    throw new Error("Method not implemented.");
  }
  reverse() {
    throw new Error("Method not implemented.");
  }
  clone() {
    throw new Error("Method not implemented.");
  }
  toArray(): T[] {
    throw new Error("Method not implemented.");
  }
  print(): void {
    throw new Error("Method not implemented.");
  }
}
