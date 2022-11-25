import ArrayList from "./List";

export default class BinaryTree<E = any> extends ArrayList<E> {
  /**
   * 이진 트리의 루트 요소 반환
   */
  get root(): E {
    return this[1];
  }

  /**
   * 루트 인덱스 반환
   */
  static rootIndex(): 1 {
    return 1;
  }

  /**
   * 상위 노드의 인덱스 반환
   * @param childIndex
   */
  static parentIndex(childIndex: number): number {
    return childIndex >> 1;
  }

  /**
   * 하위 노드의 왼쪽 인덱스 반환
   * @param parentIndex
   */
  static leftChildIndex(parentIndex: number): number {
    return parentIndex * 2;
  }

  /**
   * 하위 노드의 오른쪽 인덱스 반환
   * @param parentIndex
   */
  static rightChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 1;
  }

  /**
   * 하위 노드의 인덱스 목록을 배열로 반환
   * @param parentIndex
   */
  static childrenIndexes(parentIndex: number): [number, number] {
    return [parentIndex * 2, parentIndex * 2 + 1];
  }
}
