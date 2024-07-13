import BTree from "@/Array/BinaryTree";
import type { IHeap } from "@/PREV/misc/interfaces";

class ArrayHeap<E = any> extends BTree<E> implements IHeap<E> {
  #compare: (a: E, b: E) => boolean;

  /**
   * @param comparator 우선 순위 비교 함수
   */
  constructor(comparator?: (a: E, b: E) => boolean) {
    super();
    this.#compare = comparator || ((a: E, b: E) => a > b);
  }

  /**
   * 부모 노드의 두 자식 노드 중 우선 순위가 되는 노드의 인덱스를 반환.
   * @param parentIndex
   */
  #getPriorChildIndex(parentIndex: number): number {
    const [leftChildIndex, rightChildIndex] =
      BTree.childrenIndexesOf(parentIndex);
    return this.has(rightChildIndex) &&
      this.#compare(this[rightChildIndex], this[leftChildIndex])
      ? rightChildIndex
      : leftChildIndex;
  }

  /**
   * 현재 노드와 부모 노드를 비교해서 우선 순위에 따라 노드 위치를 교환.
   */
  protected _heapifyUp(): void {
    for (
      let currentIndex = this.length - 1,
        parentIndex = BTree.parentIndexOf(currentIndex);
      currentIndex >= 1 && this.#compare(this[currentIndex], this[parentIndex]);
      currentIndex = parentIndex,
        parentIndex = BTree.parentIndexOf(currentIndex)
    ) {
      this.swap(currentIndex, parentIndex);
    }
  }

  /**
   * 루트 노드부터 자식 노드와 비교하여 우선 순위에 따라 정렬될 때까지 노드 위치를 지속해서 교환.
   */
  protected _heapifyDown(): void {
    for (
      let currentIndex = 0, childIndex = this.#getPriorChildIndex(currentIndex);
      this.#compare(this[childIndex], this[currentIndex]);
      currentIndex = childIndex,
        childIndex = this.#getPriorChildIndex(currentIndex)
    ) {
      this.swap(currentIndex, childIndex);
    }
  }

  /**
   * 노드 삽입 및 우선 순위로 정렬.
   * @param node 삽입할 데이터
   */
  insert(node: E): void {
    this.push(node);
    if (this.length >= 2) this._heapifyUp();
  }

  /**
   * 가장 우선 순위인 루트 노드를 추출해서 반환.
   */
  poll(): E | undefined {
    if (this.length <= 1) return this.pop();
    else {
      let tmp;
      [tmp, this[0]] = [this[0], this.pop()!];
      this._heapifyDown();
      return tmp;
    }
  }
}

export default ArrayHeap;
