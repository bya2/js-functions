interface ILinkedList {}

// type Node<T> =

interface LinkedListStruct<N> {
  head?: N;
  tail?: N;
  length: number;
}

interface ListAccessor<T> {}

interface ListGetter<T> {
  front(): T | undefined;
  back(): T | undefined;
  get(index: number): T | undefined;
}

interface ListSetter<T> {
  set(index: number, item: T): this;
}

interface Pushable<T> {
  pushFront(item: T): unknown;
  pushBack(item: T): unknown;
  pushAt(index: number, item: T): unknown;
}

interface Popable<T> {
  popFront(): T | undefined;
  popBack(): T | undefined;
  popAt(index: number): T | undefined;
}

interface Printable {
  print(): unknown;
}
