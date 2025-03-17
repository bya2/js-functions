import { TOp, TPredicate, ILogger } from "@/misc/types";

export interface SLinkedNode<T> {
  element: T;
  prev?: SLinkedNode<T>;
  next?: SLinkedNode<T>;
}

interface ILinked<T> {
  /**
   * 노드 `this`와 다른 노드의 연결 관계를 정의합니다.
   * @param prev
   * @param next
   */
  link(prev?: ILinkedNode<T>, next?: ILinkedNode<T>): void;

  /**
   * 연결 관계에 대한 참조를 제거합니다.
   */
  unlink(): void;
}

export interface ILinkedNode<T> extends SLinkedNode<T>, ILinked<T> {}

export interface ISinglyLinkedNode<T> {
  element: T;
  next?: ISinglyLinkedNode<T>;
}

export interface IDoublyLinkedNode<T> {
  element: T;
  prev?: IDoublyLinkedNode<T>;
  next?: IDoublyLinkedNode<T>;

  /**
   * 해당 노드의 연결 관계를 성립합니다. 첫번째 요소는 이전 노드가 되고, 두번째 요소는 다음 노드가 됩니다.
   * @param prev
   * @param next
   */
  link(prev?: IDoublyLinkedNode<T>, next?: IDoublyLinkedNode<T>): void;

  /**
   * 해당 노드의 연결 관계를 제거합니다.
   * - 해당 노드의 다른 노드에 대한 참조를 제거합니다.
   * - 다른 노드의 해당 노드에 대한 참조를 제거합니다.
   */
  unlink(): void;
}

interface SLinkedList<T> {
  head?: SLinkedNode<T>;
  tail?: SLinkedNode<T>;
  length: number;
}

interface IAccessor<T> {
  /**
   * 맨 앞 노드 `head`의 내부 요소를 반환합니다.
   */
  front(): T | undefined;

  /**
   * 맨 뒤 노드 `tail`의 내부 요소를 반환합니다.
   */
  back(): T | undefined;

  /**
   * 해당 위치에 있는 노드를 반환합니다.
   * @param index
   */
  nodeAt(index: number): SLinkedNode<T> | undefined;

  /**
   * 해당 위치에 있는 노드의 내부 요소를 반환합니다.
   * @param index
   */
  at(index: number): T | undefined;
}

interface IPushable<T> {
  /**
   * 맨 앞에 요소를 추가하고, 리스트의 길이를 반환합니다.
   * @param item
   */
  pushFront(item: T): number;

  /**
   * 맨 뒤에 요소를 추가하고, 리스트의 길이를 반환합니다.
   * @param item
   */
  pushBack(item: T): number;

  /**
   * 입력된 위치에 요소를 포함한 노드를 추가하고, 리스트의 길이를 반환합니다.
   * @param index
   * @param item
   */
  pushAt(index: number, item: T): number;
}

interface IPoppable<T> {
  /**
   * 맨 앞 요소를 추출하여 내부 요소를 반환합니다.
   */
  popFront(): T | undefined;

  /**
   * 맨 뒷 요소를 추출하여 내부 요소를 반환합니다.
   */
  popBack(): T | undefined;

  /**
   * 입렫뇌 위치의 노드를 추출하고, 내부 요소를 반환합니다.
   * @param index
   */
  popAt(index: number): T | undefined;
}

interface ILinkable<T> {
  /**
   * 리스트 `this`의 맨 뒷 노드와 리스트 `other`의 맨 앞 노드를 연결하여 새로운 리스트를 반환합니다.
   * @param other
   */
  concat(other: ILinkedList<T>): ILinkedList<T>;
}

interface IMappable<T> {
  /**
   *
   * @param op
   */
  map<U>(op: TOp<T, U>): ILinkedList<U>;
}

interface IPredicate<T> {
  /**
   * 지정된 조건을 충족하는 요소들만 포함한 리스트를 반환합니다.
   * @param predicate
   */
  filter(predicate: TPredicate<T>): ILinkedList<T>;

  /**
   * 모든 요소들이 지정된 조건을 충족하는지 판별합니다.
   * @param predicate
   */
  every(predicate: TPredicate<T>): boolean;

  /**
   * 요소들 중 일부가 지정된 조건을 충족하는지 판별합니다.
   * @param predicate
   */
  some(predicate: TPredicate<T>): boolean;

  /**
   * 지정된 조건을 충족하는 노드의 내부 요소를 반환하고, 없으면 `undefined`를 반환합니다.
   * @param predicate
   */
  find(predicate: TPredicate<T>): T | undefined;

  /**
   * 지정된 조건을 충족하는 노드의 위치를 반환하고, 없으면 `-1`을 반환합니다.
   * @param predicate
   */
  findIndex(predicate: TPredicate<T>): number;
}

interface ITransformable<T> {
  /**
   * 문자열로 변환하여 반환합니다.
   */
  toString(): string;

  /**
   * 배열로 변환하여 반환합니다.
   */
  values(): T[];
}

interface IClear {
  /**
   * 모든 연결 관계와 참조를 제거합니다.
   */
  clear(): void;
}

export interface ILinkedList<T>
  extends SLinkedList<T>,
    IAccessor<T>,
    IPushable<T>,
    IPoppable<T>,
    ILinkable<T>,
    IMappable<T>,
    IPredicate<T>,
    ITransformable<T>,
    IClear,
    ILogger {}
