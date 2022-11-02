import Arr from "./Arr";

export default class BinaryTree extends Arr {
  static indexOfRoot(): 1 {
    return 1;
  }

  /**
   * @param _indexOfChild 자식 노드의 인덱스
   */
  static indexOfParent(_indexOfChild: number): number {
    return _indexOfChild >> 1;
  }

  /**
   * @param _indexOfParent 부모 노드의 인덱스
   */
  static indexOfLeftChild(_indexOfParent: number): number {
    return _indexOfParent * 2;
  }

  /**
   * @param _indexOfParent 부모 노드의 인덱스
   */
  static indexOfRightChild(_indexOfParent: number): number {
    return _indexOfParent * 2 + 1;
  }

  /**
   * @param _indexOfParent 부모 노드의 인덱스
   */
  static indexesOfChildren(_indexOfParent: number): [number, number] {
    return [_indexOfParent * 2, _indexOfParent * 2 + 1];
  }
}
