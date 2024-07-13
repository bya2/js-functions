export interface ILinkedList<T>
  extends LinkedList<T>,
    IAccessor<T>,
    IIndexable<T>,
    ILinked<T>,
    IPopable<T>,
    IPushable<T>,
    IFunctional<T>,
    ITransformalbe<T>,
    IPrintable {}

interface Node<T> {
  element: T;
  prev: Option<Node<T>>;
  next: Option<Node<T>>;
}

interface LinkedList<T> {
  head: Option<Node<T>>;
  tail: Option<Node<T>>;
  length: number;
}

interface IAccessor<T> {
  /**
   * `index`에 해당하는 노드의 내부 요소를 반환합니다.
   * - O(1~n)
   * @param index
   */
  get(index: number): Option<T>;

  /**
   * `index`에 해당하는 노드의 내부 요소를 설정합니다.
   * @param index
   * @param item
   */
  set(index: number, item: T): this;
}

interface IIndexable<T> {
  at(index: number): Option<Node<T>>;
}

interface ILinked<T> {
  unlink(node: Node<T>): unknown;
}

interface IPushable<T> {
  pushFront(item: T): unknown;
  pushBack(item: T): unknown;
  pushAt(index: number, item: T): unknown;
}

interface IPopable<T> {
  /**
   * 맨 앞의 노드를 추출합니다.
   * - O(1)
   */
  popFrontNode(): Option<Node<T>>;

  /**
   * 맨 앞의 노드를 추출하고, 노드 내부 값을 반환합니다.
   * - O(1)
   */
  popFront(): Option<T>;

  /**
   * 맨 뒤의 노드를 추출합니다.
   * - O(1)
   */
  popBackNode(): Option<Node<T>>;

  /**
   * 맨 뒤의 노드를 추출하고, 노드 내부 값을 반환합니다.
   * - O(1)
   */
  popBack(): Option<T>;

  /**
   * 특정 위치의 노드를 추출합니다.
   * - O(1)
   * @param index
   */
  popNodeAt(index: number): Option<Node<T>>;

  /**
   * 특정 위치의 노드를 추출하고, 내부 값을 반환합니다.
   * - O(1);
   * @param index
   */
  popAt(index: number): Option<T>;
}

type TOp<T, U> = (element: T, index: number) => U;
type TPredicate<T> = (element: T, index: number) => unknown;

interface IFunctional<T> {
  every(predicate: TPredicate<T>): boolean;
  filter(predicate: TPredicate<T>): this;
  find(predicate: TPredicate<T>): Option<T>;
  findIndex(predicate: TPredicate<T>): number;
  map<U>(op: TOp<T, U>): LinkedList<T>;
}

interface ITransformalbe<T> {
  toArray(): T[];
}

interface IPrintable {
  print(): void;
}
