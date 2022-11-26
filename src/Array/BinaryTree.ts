import ArrayList from "@/Array/List";

class ArrayBinaryTree<E = any> extends ArrayList<E> {
  /**
   * 이진 트리의 루트 요소 반환
   */
  get root(): E {
    return this[0];
  }

  /**
   * 상위 노드의 인덱스 반환
   * @param childIndex
   */
  static parentIndexOf(childIndex: number): number {
    return Math.ceil(childIndex / 2) - 1;
  }

  /**
   * 하위 노드의 왼쪽 인덱스 반환
   * @param parentIndex
   */
  static leftChildIndexOf(parentIndex: number): number {
    return parentIndex * 2 + 1;
  }

  /**
   * 하위 노드의 오른쪽 인덱스 반환
   * @param parentIndex
   */
  static rightChildIndexOf(parentIndex: number): number {
    return parentIndex * 2 + 2;
  }

  /**
   * 하위 노드의 인덱스 목록을 배열로 반환
   * @param parentIndex
   */
  static childrenIndexesOf(parentIndex: number): [number, number] {
    return [parentIndex * 2 + 1, parentIndex * 2 + 2];
  }
}

export default ArrayBinaryTree;
