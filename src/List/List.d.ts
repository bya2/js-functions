export = List;

interface List<T> {
  [Symbol.iterator](): IterableIterator<T>;

  length: number;

  push(item: T): void;

  pop(): T;

  unshift(item: T): void;

  shift(): T;
}
