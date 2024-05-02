export interface ISinglyLinkedNode<E, Container> {
  element: E;
  next: Container;
}

export interface IDoublyLinkedNode<E, Container> {
  element: E;
  prev: Container;
  next: Container;
}

export interface ILinked<Arg> {
  unlink(arg: Arg): unknown;
}

export interface IFIFO<T> {
  popFront(): T;
  pushBack(item: T): unknown;
}

export interface ILIFO<T> {
  popBack(): T;
  pushBack(item: T): unknown;
}

export interface IPopable<T> {}

export interface IPushable<T> {}

export interface IGetter<K, T> {
  get(key: K): T;
}

export interface ISetter<K, T> {
  set(key: K, item: T): unknown;
}

export interface IAccessor<K, T> {
  get(x: K): T;
  set(x: K, item: T): unknown;
}

// export interface ILinkedList<T> {
//   head: Option<IDoublyLinkedNode<T>>;
//   tail: Option<IDoublyLinkedNode<T>>;
//   length: number;

//   popFront():
// }

// interface IList<T> {
//   at(index: number): T | undefined;

//   find<S extends T>(
//     predicate: (value: T, index: number) => value is S
//   ): S | undefined;

//   findIndex<S extends T>(
//     predicate: (value: T, index: number) => value is S
//   ): number;
// }

// interface IOptionalList<T> {
//   at(index: number): Option<T>;

//   find<S extends T>(
//     predicate: (value: T, index: number) => value is S
//   ): Option<S>;

//   findIndex<S extends T>(
//     predicate: (value: T, index: number) => value is S
//   ): number;
// }
