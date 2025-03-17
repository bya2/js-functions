export interface ILinkedList<T>
  extends SLinkedList<T>,
    IAccessor<T>,
    IIndexable<T>,
    ILinked<T>,
    IPopable<T>,
    IPushable<T>,
    IFunctional<T>,
    ITransformable<T>,
    IPrintable {}

type Node<T> = {
  element: T;
  prev: Option<Node<T>>;
  next: Option<Node<T>>;
};

type SLinkedList<T> = {
  head: Option<Node<T>>;
  tail: Option<Node<T>>;
  length: number;
};

interface IAccessor<T> {
  /**
   * @return Optional node element
   */
  front(): Option<T>;

  /**
   * @return Optional node element
   */
  back(): Option<T>;

  /**
   * `index`에 위치한 노드의 내부 값을 반환합니다.
   * @param index
   */
  get(index: number): Option<T>;

  /**
   * `index`에 위치한 노드의 내부 값을 설정합니다.
   * @param index
   * @param item
   */
  set(index: number, item: T): this;
}

interface IIndexable<T> {
  /**
   * `index`에 위치한 노드를 반환합니다.
   * - O(1~n)
   * @param index
   * @returns Optional node
   */
  at(index: number): Option<Node<T>>;
}

interface ILinked<T> {
  /**
   * 노드가 다른 노드를 참조하지 않도록 합니다.
   * @param node
   */
  unlink(node: Node<T>): unknown;
}

interface IPushable<T> {
  /**
   * 내부 값이 `item`인 노드를 생성하고, 맨 앞에 노드를 추가합니다.
   * - O(1)
   * @param item
   */
  pushFront(item: T): unknown;

  /**
   * 내부 값이 `item`인 노드를 생성하고, 맨 뒤에 노드를 추가합니다.
   * - O(1)
   * @param item
   */
  pushBack(item: T): unknown;

  /**
   * 내부 값이 `item`인 노드를 생성하고, 특정 위치에 노드를 추가합니다.
   * - O(1~n)
   * @param index
   * @param item
   */
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
  /**
   * 두 링크드리스트를 앞뒤로 연결합니다.
   * @param other
   */
  concat(other: SLinkedList<T>): SLinkedList<T>;

  /**
   * 각 노드의 내부 값을 인자로 함수 `predicate`를 호출한 결과값이 모두 'Truthy'이면 `true`를 반환하고, 아니면 `false`를 반환합니다.
   * @param predicate
   */
  every(predicate: TPredicate<T>): boolean;

  /**
   * 각 노드의 내부 값을 인자로 함수 `predicate`를 호출한 결과값이 하나라도 'Truthy'이면 `true`를 반환하고, 아니면 `false`를 반환합니다.
   * @param predicate
   */
  some(predicate: TPredicate<T>): boolean;

  /**
   * 각 노드의 내부 값을 인자로 함수 `predicate`를 호출하고, 결과값이 `Falsy`라면 제거합니다.
   * @param predicate
   */
  filter(predicate: TPredicate<T>): this;

  /**
   * 함수(`predicate`)를 호출한 결과값이 'Truthy'인 노드의 내부 값을 반환합니다.
   * - O(1~n)
   * @param predicate
   */
  find(predicate: TPredicate<T>): Option<T>;

  /**
   * 함수(`predicate`)를 호출한 결과값이 'Truthy'인 노드의 위치를 반환합니다.
   * - O(1~n)
   * @param predicate
   */
  findIndex(predicate: TPredicate<T>): number;

  /**
   * 각 노드의 내부 값에 함수 `op`를 매핑하고, 새로운 `LinkedList`를 반환합니다.
   * @param op
   */
  map<U>(op: TOp<T, U>): SLinkedList<U>;

  reduce<U>(
    callbackFn: (prev: U, curr: T, currIndex: number) => U,
    initialValue?: T
  ): U;
}

interface ITransformable<T> {
  /**
   * 각 노드의 내부값으로 이루어진 배열을 반환합니다.
   */
  toArray(): T[];
}

interface IPrintable {
  /**
   * 링크드 리스트를 출력합니다.
   */
  print(): void;
}
